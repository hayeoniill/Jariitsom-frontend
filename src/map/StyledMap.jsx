import styled from "styled-components";
export const Container = styled.div`
  --nav-h: 75px;
  height: 100%; /* min-height 말고 height */
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const MapContainer = styled.div`
  position: relative;
  flex: 0 0 auto;
  height: calc(100% - var(--nav-h)); /* 핵심 */
  min-height: 0;
  z-index: 0;
`;

export const Wrap = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1000;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 60px;
  gap: 5px;
`;

export const SearchBox = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1000;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 20px;
  gap: 5px;

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

export const FilterWrap = styled.div`
  display: flex;
  gap: 24px;
  position: absolute;
  top: 80px;
`;
export const FilterBtn = styled.div`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0.3px 0.3px 3px 0 rgba(0, 0, 0, 0.25) inset;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: 1.5px solid #f2f2f2;
  color: #606060;

  &.active {
    border: 1.5px solid var(--Main, #8b2842);
    color: var(--Main, #8b2842);
  }

  cursor: pointer;
`;
