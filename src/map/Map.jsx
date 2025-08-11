import React, { useState } from "react";
import * as M from "./StyledMap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
const FILTERS = ["전체", "음식점", "카페"];

const MapPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("전체");
  return (
    <M.Container>
      <M.MapContainer>
        <KakaoMap
          center={{ lat: 37.5665, lng: 126.978 }}
          style={{ width: "100%", height: "766px" }}
        >
          <MapMarker position={{ lat: 37.5665, lng: 126.978 }}></MapMarker>
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
