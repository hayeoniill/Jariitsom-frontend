import React from "react";
import * as M from "./StyledMap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";

const MapPage = () => {
  const navigate = useNavigate();
  return (
    <M.Container>
      <M.MapContainer>
        <KakaoMap
          center={{ lat: 37.5665, lng: 126.978 }}
          style={{ width: "100%", height: "766px" }}
        >
          <MapMarker position={{ lat: 37.5665, lng: 126.978 }}></MapMarker>
        </KakaoMap>

        <M.Warp>
          <M.BackBtn src="/images/backBtn.svg" />
          <M.SearchBox>
            <M.Input type="text" placeholder="장소 검색" />
            <M.SearchBtn src="/images/Search.svg" alt="Search" />
          </M.SearchBox>
        </M.Warp>
      </M.MapContainer>

      <NavigationBar />
    </M.Container>
  );
};

export default MapPage;
