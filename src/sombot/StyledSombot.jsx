import styled from "styled-components";

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
`;
export const Background = styled.img`
  width: 205px;
  height: 250px;
  position:absolute;
  bottom:318px;
  left:93px;
`
export const BackBtn = styled.img`
  width: 21px;
  height: 16px;
  position:absolute;
  top:54px;
  left:26px;
`;

export const MainTxt = styled.div`
  color: #8B2842;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position:absolute;
  left:112px;
  top:48px;
`;

export const Bar = styled.div`
  background: #f0f0f0f0;
  margin-top:90px;
  height:5px;
`;

export const MessageBar = styled.input`
  width: 340px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1.5px solid #8B2842;
  background: #FFF;
  padding-left:24px;
  box-sizing: border-box;
  outline:none;
  position:absolute;
  left:24px;
  top:700px;
`;

export const SendImg = styled.img`
  width: 20px;
  height: 20px;
  position:absolute;
  top:712px;
  left:326px;
`;