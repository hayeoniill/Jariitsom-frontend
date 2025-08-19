import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
//네비게이션바
const Bar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #fff;
  box-sizing: border-box;
  padding-left: 50px;
  padding-bottom: 8px;
`;
const Item = styled.div`
  margin-top: 15px;
  width: 78px;
  height: 65px;
  flex-shrink: 0;
  cursor: pointer;
`;

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname || "";

  const itemClick = (home) => {
    navigate(`/${home}`);
  };

  return (
    <Bar>
      <Item onClick={() => itemClick("home")}>
        <img
          src={
            path === "/home"
              ? `${process.env.PUBLIC_URL}/images/Nav/home_on.svg`
              : `${process.env.PUBLIC_URL}/images/Nav/home_off.svg`
          }
          alt="홈"
        />
      </Item>
      <Item onClick={() => itemClick("Search")} style={{ marginTop: "25px" }}>
        <img
          src={
            path.startsWith("/Search")
              ? `${process.env.PUBLIC_URL}/images/Nav/search_on.svg`
              : `${process.env.PUBLIC_URL}/images/Nav/search_off.svg`
          }
          alt="검색"
        />
      </Item>
      <Item onClick={() => itemClick("Sombot")}>
        <img
          src={
            path === "/Sombot"
              ? `${process.env.PUBLIC_URL}/images/Nav/sombot_on.svg`
              : `${process.env.PUBLIC_URL}/images/Nav/sombot_off.svg`
          }
          alt="솜봇"
        />
      </Item>
      <Item onClick={() => itemClick("MapPage")} style={{ marginTop: "25px" }}>
        <img
          src={
            path === "/MapPage"
              ? `${process.env.PUBLIC_URL}/images/Nav/map_on.svg`
              : `${process.env.PUBLIC_URL}/images/Nav/map_off.svg`
          }
          alt="지도"
        />
      </Item>
      <Item onClick={() => itemClick("MyPage")} style={{ marginTop: "25px" }}>
        <img
          src={
            path === "/MyPage" || path === "/favoriteShop"
              ? `${process.env.PUBLIC_URL}/images/Nav/mypage_on.svg`
              : `${process.env.PUBLIC_URL}/images/Nav/mypage_off.svg`
          }
          alt="마이페이지"
        />
      </Item>
    </Bar>
  );
}

export default NavigationBar;
