import React, { useEffect, useMemo, useRef, useState } from "react";
import * as M from "./StyledMap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";

const FILTERS = ["전체", "음식점", "카페"];
const CONGESTION_ICON = {
  green: "/images/Congestion/greenSom.svg", // 여유
  yellow: "/images/Congestion/yellowSom.svg", // 보통
  red: "/images/Congestion/redSom.svg", // 혼잡
};

const API = process.env.REACT_APP_API_URL;

const MapPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("전체");
  const [myPos, setMyPos] = useState(null);

  // 1) 현위치 추적
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("위치 정보를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMyPos({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error(err);
        // 기본 좌표 (서울시청)
        setMyPos({ lat: 37.5665, lng: 126.978 });
      }
    );
  }, []);

  // 2) 내 위치 + 반경으로 가게 마커 불러오기
  useEffect(() => {
    if (!myPos) return;
    const fetchMarkers = async () => {
      try {
        const qs = new URLSearchParams({
          lat: myPos.lat,
          lng: myPos.lng,
          radius: 1200,
        });
        if (activeFilter !== "전체") {
          qs.append("category", activeFilter);
        }
        const res = await fetch(`${API}/stores/markers/?${qs.toString()}`);
        if (!res.ok) throw new Error("GET /stores/markers failed");
        const data = await res.json();
        setStores(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchMarkers();
  }, [myPos, activeFilter]);

  // 가게 기본 메타: [{id, name, lat, lng, category}]
  const [stores, setStores] = useState([]);
  // 혼잡도 상태만 따로 보관: { [id]: 'green'|'yellow'|'red' }
  const [statusById, setStatusById] = useState({});
  // 현재 지도 bounds (선택)
  const [bounds, setBounds] = useState(null);

  // StrictMode 중복 인터벌 방지
  const startedRef = useRef(false);

  // 1) 초기 가게 목록 로드
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/stores`);
        if (!res.ok) throw new Error("GET /api/stores failed");
        const data = await res.json();
        if (!ignore) setStores(data);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  // 2) 혼잡도 주기 갱신 (10초) — bounds를 쿼리에 넣고 싶으면 주석 해제
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let timer;
    const fetchStatus = async () => {
      try {
        // const qs = bounds ? `?swLat=${bounds.swLat}&swLng=${bounds.swLng}&neLat=${bounds.neLat}&neLng=${bounds.neLng}` : "";
        // const res = await fetch(`${API}/api/stores/status${qs}`);
        const res = await fetch(`${API}/api/stores/status`);
        if (!res.ok) throw new Error("GET /api/stores/status failed");
        // 예: [{id: 1, congestion: "yellow"}, {id: 2, congestion: "red"}]
        const list = await res.json();
        setStatusById((prev) => {
          const next = { ...prev };
          list.forEach(({ id, congestion }) => {
            // 백엔드가 low/mid/high로 준다면 여기서 green/yellow/red로 매핑해도 됨
            const color = congestion; // 이미 green|yellow|red 가정
            next[id] = color in CONGESTION_ICON ? color : "green";
          });
          return next;
        });
      } catch (e) {
        console.error(e);
      }
    };

    fetchStatus();
    timer = setInterval(fetchStatus, 10000);
    return () => clearInterval(timer);
  }, [bounds]);

  // 3) 필터링된 가게 목록
  const filteredStores = useMemo(() => {
    if (activeFilter === "전체") return stores;
    return stores.filter((s) => s.category === activeFilter);
  }, [stores, activeFilter]);

  // 4) 지도 idle 이벤트에서 bounds 업데이트(선택)
  const handleIdle = (map) => {
    const b = map.getBounds();
    setBounds({
      swLat: b.getSouthWest().getLat(),
      swLng: b.getSouthWest().getLng(),
      neLat: b.getNorthEast().getLat(),
      neLng: b.getNorthEast().getLng(),
    });
  };

  return (
    <M.Container>
      <M.MapContainer>
        <KakaoMap
          center={myPos || { lat: 37.5665, lng: 126.978 }}
          level={5}
          style={{ width: "100%", height: "100%" }}
          onIdle={handleIdle}
        >
          {/* 내 위치 표시 */}
          {myPos && (
            <MapMarker
              position={myPos}
              image={{
                src: "/images/Map/mypos.svg",
                size: { width: 35, height: 35 },
                options: { offset: { x: 10, y: 10 } },
              }}
            />
          )}
          {/* 가게 마커들 */}
          {filteredStores.map((s) => {
            const congestion = statusById[s.id] || "green";
            const iconSrc = CONGESTION_ICON[congestion];
            return (
              <MapMarker
                key={s.id}
                position={{ lat: s.lat, lng: s.lng }}
                image={{
                  src: iconSrc,
                  size: { width: 40, height: 40 },
                  options: { offset: { x: 20, y: 40 } },
                }}
                onClick={() => alert(`${s.name} (${congestion})`)}
              />
            );
          })}
        </KakaoMap>

        <M.Wrap>
          <M.SearchBox>
            <M.Input type="text" placeholder="가게 검색" />
            <M.SearchBtn src="/images/Search.svg" alt="Search" />
          </M.SearchBox>

          <M.FilterWrap>
            {FILTERS.map((f) => (
              <M.FilterBtn
                key={f}
                className={f === activeFilter ? "active" : ""}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </M.FilterBtn>
            ))}
          </M.FilterWrap>
        </M.Wrap>
      </M.MapContainer>

      <NavigationBar />
    </M.Container>
  );
};

export default MapPage;
