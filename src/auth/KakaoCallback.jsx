import { useEffect, useState } from "react";

export default function KakaoCallback() {
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      setError("인가 코드가 없습니다.");
      return;
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_KEY,
      redirect_uri: "http://localhost:3000/auth/kakao/callback",
      code,
    });

    (async () => {
      try {
        // 1) 토큰 요청 - 백에서 해야함
        const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
        const token = await tokenRes.json();
        if (!token.access_token) throw new Error(JSON.stringify(token));

        // 2) 사용자 정보 요청
        const meRes = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: { Authorization: `Bearer ${token.access_token}` },
        });
        const profile = await meRes.json();

        // 3) 로컬에 저장(임시)
        localStorage.setItem("kakao_access_token", token.access_token);
        localStorage.setItem("kakao_profile", JSON.stringify(profile));

        // 4) 메인 페이지로 이동
        window.location.replace("/Home");
      } catch (e) {
        setError("로그인 실패: " + e.message);
      }
    })();
  }, []);

  return <div>{error ? error : "카카오 로그인 처리 중..."}</div>;
}
