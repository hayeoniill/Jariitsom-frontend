import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";


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
    left:164px;
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
export const CautionTxt = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top:160px;
    margin-left:25px;
`
export const DefaultTxt = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top:20px;
    margin-left:25px;
`

export const InputPw = styled.input`
    width: 342px;
    height: 44px;
    border-radius: 10px;
    background: #F7F7F7;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding-left: 20px;
    margin-left: 25px;
    margin-top:10px;

`

export const ConfirmBtn = styled.button`
 margin-top:40px;
    border:none;
    width: 342px;
    height: 50px;
    border-radius: 25px;
    background: #8B2842;
    box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.25);
    color: #FFF;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-left:25px;
    margin-top:310px;
`
const Leave = () => {
    const navigate = useNavigate();
    return (
        <>
            <Title>회원탈퇴</Title>
            <BackBtn src="/images/BackBtn_black.svg" alt="뒤로가기" onClick={() => navigate("/MyPage")} />
            <CautionTxt>정말 회원탈퇴 하시겠습니까?</CautionTxt>
            <DefaultTxt>비밀번호를 입력하시면 탈퇴가 완료됩니다.<br />이 작업은 취소할 수 없습니다.</DefaultTxt>
            <DefaultTxt style={{ marginTop: "50px" }}>비밀번호 확인 </DefaultTxt>
            <InputPw placeholder="비밀번호를 입력해주세요." />
            <ConfirmBtn>탈퇴하기</ConfirmBtn>
        </>
    );
}
export default Leave;