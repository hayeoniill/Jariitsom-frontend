import React from "react";
import * as L from "./StyledLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.Kakao?.isInitialized?.()) {
      window.Kakao?.init(process.env.REACT_APP_KAKAO_JS_KEY);
    }
  }, []);

  const loginWithKakao = () => {
    window.Kakao?.Auth.authorize({
      redirectUri: "http://localhost:3000/auth/kakao/callback",
      scope: "profile_nickname profile_image",
      state: "kakao_oauth_" + Date.now(),
    });
  };

  return (
    <>
      <L.Logo src="/images/Logo/logo.svg" alt="logo" />
      <L.InputId placeholder="아이디를 입력해주세요."></L.InputId>
      <L.InputPw
        type="password"
        placeholder="비밀번호를 입력해주세요."
      ></L.InputPw>
      <L.LoginBtn>로그인</L.LoginBtn>
      <L.Bar></L.Bar>
      <L.GoKakaoBtn onClick={loginWithKakao}>
        카카오톡으로 간편 로그인
      </L.GoKakaoBtn>
      <L.GoJoinBtn onClick={() => navigate("/Join")}>회원가입 하기</L.GoJoinBtn>
    </>
  );
};
export default Login;
