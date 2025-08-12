import React from "react";
import styled from "styled-components";
import NavigationBar from "../component/NavigationBar";
import CongestionList from "../component/CongestionList";

export const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 122.222% */
  letter-spacing: -0.408px;
  position: absolute;
  top: 64px;
  left: 147px;
`;

export const Bar = styled.div`
  height: 1.5px;
  background: #f0f0f0f0;
  margin-top: 100px;
`;
const FavoriteShop = () => {
  return (
    <>
      <Title>즐겨찾기 가게</Title>
      <Bar></Bar>
      <CongestionList></CongestionList>
      페이지
      <NavigationBar />
    </>
  );
};
export default FavoriteShop;
