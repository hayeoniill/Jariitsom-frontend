import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../component/NavigationBar"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background: #f0f0f0f0;
  position: relative;
`;

export const Box = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #fff;
  display: flex;
  flex-direction: column;
  cursor:default;
`;

export const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 122.222% */
    letter-spacing: -0.408px;
    position:absolute;
    top:64px;
    left:147px;
`
export const BackBtn = styled.img`
    width: 17px;
    height: 16.918px;
    flex-shrink: 0;
    top:70px;
    left:25px;
    position:absolute;
    cursor:pointer;
`

export const Bar = styled.div`
    height:1.5px;
  background: #f0f0f0f0;
    margin-top:100px
`
function FavoriteShop() {
    const navigate = useNavigate();
    return (
        <Container>
            <Box>
                <Title>즐겨찾기 가게</Title>
                <BackBtn src="/images/BackBtn_black.svg" alt="뒤로가기" onClick={() => navigate("/MyPage")} />
                <Bar></Bar>
                <NavigationBar />
            </Box>
        </Container >
    );
}
export default FavoriteShop;