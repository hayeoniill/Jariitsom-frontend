import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40vh;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Topbox = styled.div`
  margin-top: 50px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;

  display: flex;
  justify-content: space-between;
  padding: 0 22px;
  margin-bottom: 13px;
  height: 56px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const IconButton = styled.button`
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  flex-shrink: 0;
`;
export const ShopinfoWrap = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 50px;
`;
export const ShopTopInfoWrap = styled.div``;

export const ShopImage = styled.div`
  width: 390px;
  height: 221px;
  flex-shrink: 0;

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

export const ShopInfo = styled.div`
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
`;
export const ShopName = styled.h1`
  color: #000;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  margin: 0;
`;
export const ShopState = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const ShopWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ShopStar = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  img {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const ShopDistance = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  img {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const ShopBodyInfo = styled.div``;
export const SubWrap = styled.div``;
export const SubTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Subtitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
  margin: 0;
`;
export const Rsub = styled.div`
  color: #3a3a3a;
  text-align: right;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 220% */
`;
// 현재 예상 혼잡도
export const CongestionBox = styled.div`
  display: flex;
  align-items: center;
  width: 139px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 15px;
  padding: 0 20px;
  margin-top: 8px;
  margin-bottom: 25px;
  ${({ $level }) => {
    switch ($level) {
      case "low":
        return css`
          background: #e8fcd9; /* 여유 */
        `;
      case "medium":
        return css`
          background: #fff9c9; /* 보통 */
        `;
      case "high":
        return css`
          background: #ffe2e2; /* 혼잡 */
        `;
      default:
        return css`
          background: #555;
        `;
    }
  }}
`;
export const CongestionImg = styled.div`
  width: 43px;
  height: 42px;
  flex-shrink: 0;
  aspect-ratio: 43/42;
  margin-right: 11px;
`;
export const text = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
  margin: 0 5px;
`;
export const Ctext = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
  ${({ $level }) => {
    switch ($level) {
      case "low":
        return css`
          color: #4dc794; /* 여유 */
        `;
      case "medium":
        return css`
          color: #ffa62a; /* 보통 */
        `;
      case "high":
        return css`
          color: #ff572a; /* 혼잡 */
        `;
      default:
        return css`
          color: #555;
        `;
    }
  }}
`;

// 미래 예상 혼잡도
export const FutureBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 76px;
  height: 109px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #f7f7f7;
  margin-top: 8px;
  margin-bottom: 25px;
`;
export const Ftext = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 169.231% */
  padding: 10px 17px;
`;
export const FutureCImg = styled.div``;

// 실시간 방문 후기
export const PlusBtn = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  img {
    margin-left: 6px;
  }
  cursor: pointer;
`;
export const realtimeBox = styled.div`
  margin: 10px 0;
  width: 322px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid var(--Main, #8b2842);
  background: #fff;
  display: flex;
  gap: 10px;
  display: flex;
  align-items: center;
  padding-left: 20px;

  p {
    margin: 4px 5px;
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  img {
    width: 5px;
  }
`;

export const realText = styled.div`
  color: #f24253;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-left: 40px;
`;
export const rightBtn = styled.div`
  width: 342px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid var(--Main, #8b2842);
  background: var(--Main, #8b2842);
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;

export const InfroBox = styled.div``;
export const Menu = styled.div``;

export const TabBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 0 16px;
`;
export const Panel = styled.div`
  padding: 16px;
`;

export const TabButton = styled.button`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  background: none;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  border-bottom: 3px solid transparent;

  &[aria-selected="true"] {
    border-color: #8b2842;
    color: var(--Main, #8b2842);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

// 가게정보
export const InforWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 15px;
  justify-content: center;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const adress = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  .newline {
    flex-basis: 100%;
    margin-top: -15px;
    margin-left: 16px;
  }
`;

export const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .status-wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .hours-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-left: 5px;
  }

  p {
    margin: 0;
  }
`;

export const Link = styled.div`
  display: flex;
  gap: 7px;
`;
export const LinkButton = styled.a`
  display: flex;
  width: 70px;
  height: 28px;
  padding: 1px 5px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: var(--Gray-Default, #f2f4f6);
  color: var(--Gray-Dark2, #535965);
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: none;
`;
export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top:15px;
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f9f9f9;
  font-family: Pretendard;

  .name {
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }

  .price {
    font-size: 15px;
    font-weight: 600;
    color: #8b2842;
  }
`;

