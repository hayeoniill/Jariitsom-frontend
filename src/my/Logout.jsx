// Logout.jsx (모달 컴포넌트)
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBox = styled.div`
  width: 276px;
  height: 137px;
  border-radius: 9px;
  border: 0.5px solid #000;
  background: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  
`;
const TitleLogo = styled.img`
    width: 61px;
height: 18.311px;
margin-left:108px;
margin-top:20px;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  height:100px;
  border-bottom: 1.5px solid black;
   justify-content: center;
  align-items: center;
  display: flex;
`;

const ButtonRow = styled.div`
  display: flex;
`;

const Btn = styled.button`
  width: 50%;
  height: 42px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  border:none;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
 &:first-child {
    border-right: 1.5px solid black;
  }`;

function Logout({ onClose, onConfirm }) {
  return (
    <ModalOverlay>
      <ModalBox>
        <TitleLogo src="/images/Logo/logoText.svg" />
        <Title>로그아웃 하시겠습니까?</Title>
        <ButtonRow>
          <Btn onClick={onClose}>아니오</Btn>
          <Btn onClick={onConfirm}>예</Btn>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
}

export default Logout;
