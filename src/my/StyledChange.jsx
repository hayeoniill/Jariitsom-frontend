import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0 23px;
  display: flex;
  align-item: center;
  flex-direction: column;
  color: #000;
  font-family: Pretendard;
`;
export const Header = styled.div`
  display: flex;
  align-item: center;
  margin-top: 64px;
  gap: 82px;
  margin-bottom: 25px;
`;
export const BackBtn = styled.img`
  cursor: pointer;
`;
export const TopMent = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 122.222% */
  letter-spacing: -0.408px;
`;
export const Body = styled.div``;
export const ChoiceMenu = styled.div`
  display: flex;
  text-direction: row;
  text-align: center;
`;
export const CWrap = styled.div`
  width: 171px;
  height: 38px;
  flex-shrink: 0;
  position: relative;
`;

const tabBase = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

export const ChoiceId = styled.button`
  ${tabBase}
  color: ${({ $active }) => ($active ? "#000" : "#606060")};
`;
export const ChoicePw = styled.button`
  ${tabBase}
  color: ${({ $active }) => ($active ? "#000" : "#606060")};
`;
export const Line = styled.div`
  border: 5px solid ${({ $active }) => ($active ? "#8b2842" : "#F0F0F0")};
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  width: 171px;
`;

export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  justify-content: left;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  height: 500px;
`;
export const Label = styled.label`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 146.667% */
  letter-spacing: -0.408px;
  margin-bottom: 10px;
`;
export const Input = styled.input`
  margin-bottom: 20px;
  width: 342px;
  height: 44px;
  border-radius: 10px;
  background: #f7f7f7;
  border: none;
  padding: 11px 18px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;
export const ChangeBtn = styled.button`
  position: absolute;
  bottom: 0px;
  width: 342px;
  height: 50px;
  border-radius: 25px;
  background: var(--Main, #8b2842);
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`;
