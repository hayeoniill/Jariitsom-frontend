import { useEffect } from "react";

export default function useKakaoLogin() {
  useEffect(() => {
    if (window.Kakao) return;
    const s = document.createElement("script");
    s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    s.async = true;
    s.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
      }
    };
    document.body.appendChild(s);
  }, []);

  const onKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/authaccounts/kakao/login/`;
  };

  return { onKakaoLogin };
}
