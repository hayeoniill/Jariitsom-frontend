// import { useEffect } from "react";

// export default function useKakaoLogin() {
//   useEffect(() => {
//     if (window.Kakao) return;
//     const s = document.createElement("script");
//     s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
//     s.async = true;
//     s.onload = () => {
//       if (window.Kakao && !window.Kakao.isInitialized()) {
//         window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
//       }
//     };
//     document.body.appendChild(s);
//   }, []);

//   const onKakaoLogin = () => {
//     if (!window.Kakao) return alert("Kakao SDK 로딩 중이야. 잠시만!");
//     window.Kakao.Auth.authorize({
//       redirectUri: "http://localhost:8000/auth/kakao/callback/",
//       scope: "profile_nickname,account_email",
//       state: "from=signup",
//     });
//   };

//   return { onKakaoLogin };
// }
