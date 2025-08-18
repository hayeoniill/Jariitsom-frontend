import React, { useRef } from "react";
import * as L from "./StyledLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();

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

  const handleLogin = async () => {
    const username = idRef.current.value;
    const password = pwRef.current.value;

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해줘.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/rest-auth/login/", {
        username,
        password,
      });

      const token = res.data?.key;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/mypage");
      } else {
        alert("토큰이 반환되지 않았습니다.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.non_field_errors?.[0] ||
        "로그인 실패. 아이디/비밀번호를 확인해줘.";
      alert(msg);
      console.error(err.response?.data);
    }
  };

  return (
    <>
      <L.Logo src="/images/Logo/logo.svg" alt="logo" />
      <L.InputId ref={idRef} placeholder="아이디를 입력해주세요." />
      <L.InputPw
        ref={pwRef}
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <L.LoginBtn onClick={handleLogin}>로그인</L.LoginBtn>
      <L.Bar />
      {/*  <L.GoKakaoBtn onClick={loginWithKakao}>
        카카오톡으로 간편 로그인
      </L.GoKakaoBtn> */}
      <L.GoJoinBtn onClick={() => navigate("/Join")}>회원가입 하기</L.GoJoinBtn>
    </>
  );
};

export default Login;
