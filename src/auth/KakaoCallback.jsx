// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function KakaoCallback() {
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");
//     if (!code) {
//       setError("인가 코드가 없습니다.");
//       return;
//     }

//     (async () => {
//       try {
//         // 👉 인가코드를 백엔드에 넘겨줌
//         const res = await axios.post(
//           `${process.env.REACT_APP_API_URL}/authaccounts/kakao/callback/`,
//           { code }
//         );

//         const token = res.data?.token;
//         if (!token) throw new Error("토큰이 없습니다.");

//         // 로컬스토리지에 토큰 저장
//         localStorage.setItem("token", token);

//         // 메인 페이지 이동
//         navigate("/Home");
//       } catch (e) {
//         console.error(e);
//         setError("로그인 실패");
//       }
//     })();
//   }, [navigate]);

//   return <div>{error ? error : "카카오 로그인 처리 중..."}</div>;
// }
