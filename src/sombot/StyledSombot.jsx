import styled from "styled-components";


export const TopBox = styled.div`
 display: flex;
  align-items: center;
  margin-top:54px;
  margin-left:26px;
`
export const BackBtn = styled.img`
  width: 21px;
  height: 16px;
`;

export const MainTxt = styled.div`
  color: #8B2842;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  margin-left:65px;
`;

export const Bar = styled.div`
  margin-top:18px;  
  background: #f0f0f0f0;
  height:5px;

`;
export const Background = styled.img`
  position: absolute;  
  top: 180px;
  left: 93px;
  width: 205px;
  height: 250px;
  z-index: 0;          
  pointer-events: none; 
`;
export const SombotWrapper = styled.div`
  position: relative;  
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

export const ChatContainer = styled.div`
  overflow-y: auto;
  padding: 0 16px;
  height:650px;
  box-sizing: border-box;
  border:1px solid black;
  height: calc(100vh - 230px); /* 전체 화면에서 고정 요소 높이 빼기 */

`;
export const MessageInputWrapper = styled.div`
  position:absolute;
  bottom: 85px;
  left:25px;
  width: 100%;
  max-width: 342px;
  height: 45px;
  background: white;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1.5px solid var(--Main, #8B2842);
  background: #FFF;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;

`;
export const MessageBar = styled.input`
  flex: 1;
  height: 100%;
  outline: none;
  border:none;
  background: transparent;
  font-size: 14px;
`;

export const SendImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`; 