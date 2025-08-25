import React, { useEffect, useMemo, useRef, useState } from "react";
import * as M from "./StyledMap";
import NavigationBar from "../component/NavigationBar";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";

const FILTERS = ["전체", "음식점", "카페"];

const CONGESTION_ICON = {
  low: `${process.env.PUBLIC_URL}/images/Congestion/greenSom.svg`,
  medium: `${process.env.PUBLIC_URL}/images/Congestion/yellowSom.svg`,
  high: `${process.env.PUBLIC_URL}/images/Congestion/redSom.svg`,
};

const API = process.env.REACT_APP_API_URL;

const MapPage = () => {
  const [activeFilter, setActiveFilter] = useState("전체");
  // const [myPos, setMyPos] = useState(null); 실시간 내위치 받아오기

  // 기본 좌표: 동덕여대
  const [myPos, setMyPos] = useState({ lat: 37.605873, lng: 127.041239 });

  // 가게 데이터
  const [stores, setStores] = useState([]);
  const [statusById, setStatusById] = useState({});
  const [bounds, setBounds] = useState(null);
  const startedRef = useRef(false);
  const navigate = useNavigate();

  // // 1) 현위치 추적 (실시간 위치정보 가져오기 주석처리)
  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     alert("위치 정보를 지원하지 않는 브라우저입니다.");
  //     return;
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const { latitude, longitude } = pos.coords;
  //       setMyPos({ lat: latitude, lng: longitude });
  //     },
  //     (err) => {
  //       console.error(err);
  //       // 기본 좌표 (동덕여대)
  //       setMyPos({ lat: 37.605873, lng: 127.041239 });
  //     }
  //   );
  // }, []);

  // 1) 내 위치 + 필터로 가게 마커 불러오기
  useEffect(() => {
    if (!myPos) return;
    const fetchMarkers = async () => {
      try {
        const qs = new URLSearchParams({
          lat: myPos.lat,
          lng: myPos.lng,
          radius: 1200,
        });

        if (activeFilter === "카페") {
          qs.append("category", "cafe");
        } else if (activeFilter === "음식점") {
          qs.append("exclude_category", "cafe");
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

  // // 2) 혼잡도 상태 주기적으로 갱신
  // useEffect(() => {
  //   if (startedRef.current) return;
  //   startedRef.current = true;

  //   let timer;
  //   const fetchStatus = async () => {
  //     try {
  //       const res = await fetch(`${API}/api/stores/status`);
  //       if (!res.ok) throw new Error("GET /api/stores/status failed");
  //       const list = await res.json();
  //       setStatusById((prev) => {
  //         const next = { ...prev };
  //         list.forEach(({ id, congestion }) => {
  //           const color = congestion;
  //           next[id] = color in CONGESTION_ICON ? color : "green";
  //         });
  //         return next;
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchStatus();
  //   timer = setInterval(fetchStatus, 10000);
  //   return () => clearInterval(timer);
  // }, []);

  // 필터링된 가게 목록
  // const filteredStores = useMemo(() => {
  //   if (activeFilter === "전체") return stores;
  //   return stores.filter((s) => s.category === CATEGORY_MAP[activeFilter]);
  // }, [stores, activeFilter]);

  const filteredStores = useMemo(() => stores, [stores]);

  // 3) 지도 idle 이벤트에서 bounds 업데이트
  const handleIdle = (map) => {
    const b = map.getBounds();
    setBounds({
      swLat: b.getSouthWest().getLat(),
      swLng: b.getSouthWest().getLng(),
      neLat: b.getNorthEast().getLat(),
      neLng: b.getNorthEast().getLng(),
    });
  };

  // 4) 지도 클릭 시 내 위치 옮기기
  const handleMapClick = (_t, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setMyPos({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  useEffect(() => {
    const qs = new URLSearchParams({
      lat: 37.605873,
      lng: 127.041239,
      radius: 1200,
    });
    console.log("요청 URL:", `${API}/stores/markers/?${qs.toString()}`);
  }, []);

  return (
    <M.Container>
      <M.MapContainer>
        <KakaoMap
          center={myPos}
          level={5}
          style={{ width: "100%", height: "100%" }}
          onIdle={handleIdle}
          onClick={handleMapClick}
        >
          {/* 내 위치 표시 */}
          {myPos && (
            <MapMarker
              position={myPos}
              zIndex={1}
              image={{
                src: `${process.env.PUBLIC_URL}/images/Map/mypos.svg`,
                size: { width: 35, height: 35 },
                options: { offset: { x: 10, y: 10 } },
              }}
              onClick={() => navigate(`/ShopDetail/${s.id}`, { state: s })}
            />
          )}
          {/* 가게 마커 */}
          {stores.map((s) => {
            const congestion = s.congestion || "green"; // 응답에 포함된 congestion 사용
            const iconSrc = CONGESTION_ICON[congestion];

            return (
              <MapMarker
                key={s.id}
                position={{ lat: s.latitude, lng: s.longitude }} // lat/lng 필드명 맞춤
                image={{
                  src: iconSrc,
                  size: { width: 25, height: 25 },
                  options: { offset: { x: 20, y: 40 } },
                }}
              />
            );
          })}
        </KakaoMap>

        <M.Wrap>
          {/* <M.SearchBox> 
            <M.Input type="text" placeholder="가게 검색" />
            <M.SearchBtn src="/images/Search.svg" alt="Search" />
          </M.SearchBox> */}

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
