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
  padding: 16px 0px 0px 0px;
  `;

const TitleLogo = styled.img`
width: 61px;
height: 18.311px;
margin-left:108px;
margin-top:10px;
margin-bottom:10px;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  height:100px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ButtonRow = styled.div`
  display: flex;
  border-top: 1.5px solid black;
  margin-top:10px;
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
  border-radius: 9px;

 &:first-child {
   border-radius: 0px 0px 0px 9px;
    border-right: 1.5px solid black;
  }`;
function Leave({ onClose, onConfirm }) {
  return (
    <ModalOverlay>
      <ModalBox>
        <TitleLogo src="/images/Logo/logoText.svg" />
        <Title>회원 탈퇴를 진행하시겠습니까?</Title>
        <div style={{ marginLeft: "40px" }}>이 작업은 돌이킬 수 없습니다.</div>
        <ButtonRow>
          <Btn onClick={onClose}>아니오</Btn>
          <Btn onClick={onConfirm}>예</Btn>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
}

export default Leave;
