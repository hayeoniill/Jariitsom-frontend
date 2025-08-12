import styled from "styled-components";

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 305px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1.5px solid #8b2842;
  background: #fff;
  margin-left:25px;
`;

export const Input = styled.input`
  width: 270px;
  height: 30px;
  color: #000;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  &:focus {
    outline: none;
  }
`;
export const SearchBtn = styled.img`
  cursor: pointer;
`;

export const LocationText = styled.div`
  position: absolute;
  top: 115px;
  left: 40px;
  color: #606060;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const LocationImg = styled.div`
  position: absolute;
  top: 115px;
  left: 20px;
  width: 18px;
  height: 18px;
`;

export const IconBox = styled.div`
  margin-right: 10px;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.2s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &.active {
    border-bottom: 1.5px solid #8b2842;
  }
`;
export const TopIcon = styled.button`
  width: 50px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const TopIconText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 4px;
`;

export const TopBox = styled.div`
  position: absolute;
  top: 140px;
  left: 25px;
  display: flex;
  gap: 12px;
  width: calc(100% - 30px);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  scroll-snap-type: x proximity;
  z-index: 5;
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 엣지 */
  }
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none;
`;

// 정렬 모달창
export const BasicLayer = styled.div`
  position: absolute;
  top: 220px;
  left: 22px;
  width: 85px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 1.5px solid #8b2842;
  align-items: center;
  color: #8b2842;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
`;
export const ModalBox = styled.div`
  position: absolute;
  width: 117px;
  height: 130px;
  background: white;
  border-radius: 8.357px;
  border: 1px solid #f7f7f7;
  background: #fff;
  z-index: 10;
  top: 265px; /* 버튼 아래쪽에 나오도록 조정 */
  right: 230px; /* 필요에 따라 위치 조정 */
  padding-top: 10px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
`;

export const ModalItem = styled.div`
  padding: 8px;
  cursor: pointer;
  color: #000;
  font-family: Roboto;
  font-size: 11.7px;
  font-style: normal;
  font-weight: 500;
  line-height: 12.536px; /* 107.143% */
  &:hover {
    color: #fff;
    font-family: Roboto;
    font-size: 11.7px;
    font-style: normal;
    font-weight: 600;
    line-height: 12.536px; /* 107.143% */
    width: 80px;
    height: 13px;
    text-align: center;
    flex-shrink: 0;
    border-radius: 8.357px;
    background: var(--Main, #8b2842);
  }
`;

export const Favorite = styled.div`
  position: absolute;
  top: 220px;
  left: 116px;
  width: 108px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 1.5px solid ${(props) => (props.isActive ? "#8B2842" : "#D9D9D9")};
  color: ${(props) => (props.isActive ? "#8B2842" : "#D9D9D9")};
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const ShopImage = styled.div`
  width: 55px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #f2f2f2;
`;
export const ShopWrapper = styled.div`
  position: absolute;
  top: 269px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 512px;
  overflow-y: auto;
  margin-left:15px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ShopInform = styled.div`
  width: 326px;
  height: 65px;
  flex-shrink: 0;
  border: none;
  background: #fff;
  color: #000;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  border-bottom: 0.7px solid #d9d9d9;
  cursor: pointer;
`;
export const LeftBox = styled.div`
  display: flex;
`;

export const CongestionImg = styled.div`
  display: flex;
`;
export const ShopImg = styled.img`
  width: 55px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #f2f2f2;
  color: #000;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* ← 여백 줘서 위로 쏠림 방지 */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* 세로 정렬이므로 column으로! */
  margin-top: 5px;
`;

export const ShopName = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  margin-bottom: 5px;
`;

export const ReviewText = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  margin-bottom: 5px;
  gap: 5px;
`;
export const DistanceText = styled.div`
  display: flex; // 가로 정렬!
  align-items: center; // 세로  정렬
  color: #424242;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Minute = styled.div`
  color: #424242;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const BottomBar = styled.div`
  position: absolute;
  top: 780px;
  width: 393px;
  height: 70px;
  flex-shrink: 0;
  border: 1.5px solid #f4f5f7;
  background: #fff;
`;
export const BottomImg = styled.div`
  position: absolute;
  top: 14px;
  width: 98px;
  height: 42.06px;

  &.HomeBottom {
    left: 50px;
  }

  &.SearchBottom {
    left: 133px;
  }

  &.FavoriteBottom {
    width: 35.018px;
    height: 41.09px;
    left: 217px;
  }

  &.ProfileBottom {
    width: 35.018px;
    height: 41.09px;
    left: 314px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;
