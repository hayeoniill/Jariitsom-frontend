import React from "react";
import * as J from "./StyledJoin1";
import { useNavigate } from "react-router-dom";

function Join1() {
    const navigate = useNavigate();
    return (
        <J.Container>
            <J.Box>
                <J.Logo src="/images/Logo/logo.svg" alt="logo" />
                <J.JoinBox>
                    <J.JoinTxt>회원가입</J.JoinTxt>
                    <J.TitleTxt>아이디</J.TitleTxt>
                    <J.InputId placeholder="아이디를 입력하세요. (숫자, 영문 조합 8자 이상)"></J.InputId>
                    <J.TitleTxt>비밀번호</J.TitleTxt>
                    <J.InputPw placeholder="비밀번호를 입력하세요. (숫자, 영문 조합 8자 이상)"></J.InputPw>
                    <J.TitleTxt>비밀번호 확인</J.TitleTxt>
                    <J.InputPwConfirm placeholder="비밀번호를 다시 입력하세요."></J.InputPwConfirm>
                    <J.TitleTxt>닉네임</J.TitleTxt>
                    <J.InputName placeholder="닉네임을 입력하세요."></J.InputName>
                    <J.TitleTxt>전화번호</J.TitleTxt>
                    <J.InputPN placeholder="전화번호를 입력하세요."></J.InputPN>
                </J.JoinBox>
                <J.NextBtn onClick={() => navigate("/Home")}>시작하기</J.NextBtn>
                <J.GoKakaoBtn> 카카오톡으로 간편 회원가입</J.GoKakaoBtn>
            </J.Box>
        </J.Container>
    );
}
export default Join1;
