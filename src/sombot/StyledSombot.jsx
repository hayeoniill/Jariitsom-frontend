import styled, { css } from "styled-components";

export const SombotWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 80vh;
  overflow: hidden;
`;

export const Background = styled.img`
  position: absolute;
  top: 250px;
  left: 93px;
  width: 205px;
  height: 250px;
  z-index: 0;
  pointer-events: none;
`;

export const TopBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 54px;
  margin-left: 26px;
`;

export const MainTxt = styled.div`
  color: #8b2842;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-left: 65px;
`;

export const Bar = styled.div`
  margin-top: 18px;
  background: #f0f0f0f0;
  height: 5px;
`;

export const ChatContainer = styled.div`
  position: relative;
  z-index: 1;
  overflow-y: auto;
  padding: 16px;
  height: calc(80vh - 140px);
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Row = styled.div`
  display: flex;
  margin: 8px 0;
  ${(p) =>
    p.$side === "right"
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: flex-start;
        `}
`;

/* 유저 말풍선*/
export const UserBubble = styled.div`
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 14px 14px 4px 14px;
  background: #8b2842;
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(139, 40, 66, 0.2);
`;

/* AI 말풍선*/
export const AIBubble = styled.div`
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 14px 14px 14px 4px;
  background: #fff;
  color: #8b2842;
  border: 1.5px solid #8b2842;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(139, 40, 66, 0.08);
`;

export const MessageInputWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 25px;
  width: calc(100% - 50px);
  max-width: 342px;
  height: 45px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1.5px solid #8b2842;
  background: #fff;
  justify-content: space-between;
  padding: 0 12px 0 16px;
  box-sizing: border-box;
  gap: 10px;
  z-index: 1;
`;

export const MessageBar = styled.input`
  flex: 1;
  height: 100%;
  outline: none;
  border: none;
  background: transparent;
  font-size: 14px;
`;

export const SendImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
`;
