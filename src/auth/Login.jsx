import React, { useRef } from "react";
import * as L from "./StyledLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();
  //api
  const API_URL = process.env.REACT_APP_API_URL;

  /* useEffect(() => {
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
   };*/

  const handleKakaoLogin = () => {
    window.location.href = "http://127.0.0.1:8000/authaccounts/kakao/login/";
  };

  const handleLogin = async () => {
    const username = idRef.current.value;
    const password = pwRef.current.value;

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.PUBLIC_URL}/rest-auth/login/`,
        {
          username,
          password,
        }
      );

      const token = res.data?.key;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        alert("토큰이 반환되지 않았습니다.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.non_field_errors?.[0] ||
        "아이디/비밀번호를 확인해주세요.";
      alert(msg);
      console.error(err.response?.data);
    }
  };

  return (
    <>
      <L.Logo
        src=`${process.env.PUBLIC_URL}/images/Logo/logo.svg`
        alt="logo"
        onClick={() => navigate("/")}
      />
      <L.InputId ref={idRef} placeholder="아이디를 입력해주세요." />
      <L.InputPw
        ref={pwRef}
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <L.LoginBtn onClick={handleLogin}>로그인</L.LoginBtn>
      <L.Bar />
      <L.GoKakaoBtn onClick={handleKakaoLogin}>
        카카오톡으로 간편 로그인
      </L.GoKakaoBtn>
      <L.GoJoinBtn onClick={() => navigate("/Join")}>회원가입 하기</L.GoJoinBtn>
      <L.GoMain onClick={() => navigate("/Home")}>
        {" "}
        비회원으로 시작하기{" "}
      </L.GoMain>
    </>
  );
};

export default Login;
