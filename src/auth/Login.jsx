import React from "react";
import * as L from "./StyledLogin";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    return (
        <L.Container>
            <L.Box>
                <L.Logo src="/images/Logo/logo.svg" alt="logo" />
                <L.InputId placeholder="아이디를 입력해주세요."></L.InputId>
                <L.InputPw type="password" placeholder="비밀번호를 입력해주세요."></L.InputPw>
                <L.LoginBtn>로그인</L.LoginBtn>
                <L.Bar></L.Bar>
                <L.GoKakaoBtn>카카오톡으로 간편 로그인</L.GoKakaoBtn>
                <L.GoJoinBtn onClick={() => navigate("/Join")}>회원가입 하기</L.GoJoinBtn>
            </L.Box>
        </L.Container>
    );
}
export default Login;
