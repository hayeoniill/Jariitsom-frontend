import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "./StyledChange";
import axios from "axios";

// 아이디 비밀번호 변경

const Change = () => {
  const [mode, setMode] = useState("id");
  //아이디
  const [newId, setNewId] = useState("");
  const [me, setMe] = useState(null);

  // 비밀번호 입력값
  const [currPw, setCurrPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const navigate = useNavigate();

  //api 주소
  const API_URL = process.env.REACT_APP_API_URL;

  // 내 정보 조회 (pk 얻기 위해)
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    axios
      .get(`${API_URL}/rest-auth/user/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setMe(res.data);
        setNewId(res.data?.username || "");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  // 아이디 변경: PATCH /user/<pk>/
  const submitIdChange = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      if (!me) {
        alert("다시 시도해주세요.");
        return;
      }
      const v = (newId || "").trim();
      if (!v || v === me.username) {
        alert("변경할 필드가 없습니다.");
        return;
      }
      if (me.is_kakao) {
        alert("카카오 사용자는 아이디 변경이 허용되지 않습니다.");
        return;
      }
      await axios.patch(
        `${API_URL}/rest-auth/user/`,
        { username: v },
        { headers: { Authorization: `Token ${token}` } }
      );

      alert("아이디가 변경되었습니다.");
      navigate("/MyPage");
    } catch (err) {
      const data = err?.response?.data;
      if (data?.detail) {
        // 예: "변경할 필드가 없습니다."
        alert(data.detail);
      } else if (data?.username?.[0]) {
        // 예: "이미 사용 중인 아이디입니다."
        alert(data.username[0]);
      } else if (err?.response?.status === 403) {
        alert("카카오 사용자는 아이디 변경이 허용되지 않습니다.");
      } else {
        alert("아이디 변경에 실패했습니다.");
      }
    }
  };

  // 비밀번호 변경: POST /account/password/
  const submitPwChange = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      if (!me) {
        alert("다시 시도해주세요.");
        return;
      }
      if (me.is_kakao) {
        alert("카카오 사용자는 비밀번호 변경이 허용되지 않습니다.");
        return;
      }
      const payload = {
        old_password: currPw || "",
        current_password: currPw || "",
        new_password1: newPw || "",
        new_password2: checkPw || "",
      };
      // 필수 입력 체크 (서버도 검사하지만, 동일 메시지로 사전 컷)
      if (!payload.current_password) {
        alert("현재 비밀번호를 입력하세요.");
        return;
      }
      if (!payload.new_password1 || !payload.new_password2) {
        alert("새 비밀번호와 확인을 모두 입력하세요.");
        return;
      }
      await axios.post(`${API_URL}/rest-auth/password/change/`, payload, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("비밀번호가 변경되었습니다.");
      navigate("/MyPage");
    } catch (err) {
      const data = err?.response?.data;
      // 서버 스펙 매핑 그대로
      if (err?.response?.status === 403 && data?.detail) {
        alert(data.detail); // "카카오 사용자는 비밀번호 변경이 허용되지 않습니다."
      } else if (data?.old_password?.[0]) {
        alert(data.old_password[0]); // 어떤 구현은 old_password 키 사용
      } else if (data?.new_password1?.[0]) {
        alert(data.new_password1[0]); // 규칙 불일치
      } else if (data?.new_password2?.[0]) {
        alert(data.new_password2[0]); // 불일치
      } else if (data?.new_password?.[0]) {
        alert(data.new_password[0]); // 혹시 커스텀 키
      } else if (data?.new_password_confirm?.[0]) {
        alert(data.new_password_confirm[0]);
      } else if (data?.detail) {
        alert(data.detail);
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    }
  };

  return (
    <C.Container>
      <C.Header>
        <C.BackBtn
          src={`${process.env.PUBLIC_URL}/images/BackBtn_black.svg`}
          alt="BackBtn"
          onClick={() => navigate("/MyPage")}
        />

        <C.TopMent>아이디/비밀번호 변경</C.TopMent>
      </C.Header>
      <C.Body>
        <C.ChoiceMenu>
          <C.CWrap>
            <C.ChoiceId
              type="button"
              $active={mode === "id"}
              onClick={() => setMode("id")}
            >
              아이디
            </C.ChoiceId>
            <C.Line $active={mode === "id"} />
          </C.CWrap>
          <C.CWrap>
            <C.ChoicePw
              type="button"
              $active={mode === "pw"}
              onClick={() => setMode("pw")}
            >
              비밀번호
            </C.ChoicePw>
            <C.Line $active={mode === "pw"} />
          </C.CWrap>
        </C.ChoiceMenu>

        {mode === "id" ? (
          <C.Form
            onSubmit={(e) => {
              e.preventDefault();
              submitIdChange();
            }}
          >
            <C.Label htmlFor="newId">새 아이디 입력</C.Label>
            <C.Input
              id="newId"
              placeholder={newId}
              onChange={(e) => setNewId(e.target.value)}
              disabled={!!me?.is_kakao}
            />
            <C.ChangeBtn type="submit" disabled={!!me?.is_kakao}>
              변경하기
            </C.ChangeBtn>
          </C.Form>
        ) : (
          <C.Form
            onSubmit={(e) => {
              e.preventDefault();
              submitPwChange();
            }}
          >
            <C.Label htmlFor="currPw">현재 비밀번호</C.Label>
            <C.Input
              id="currPw"
              type="password"
              placeholder="기존 비밀번호를 입력해주세요."
              value={currPw}
              onChange={(e) => setCurrPw(e.target.value)}
              disabled={!!me?.is_kakao}
            />
            <C.Label htmlFor="newPw">새 비밀번호</C.Label>
            <C.Input
              id="newPw"
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              disabled={!!me?.is_kakao}
            />
            <C.Label htmlFor="checkPw">새 비밀번호 확인</C.Label>
            <C.Input
              id="checkPw"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={checkPw}
              onChange={(e) => setCheckPw(e.target.value)}
              disabled={!!me?.is_kakao}
            />

            <C.ChangeBtn type="submit" disabled={!!me?.is_kakao}>
              변경하기
            </C.ChangeBtn>
          </C.Form>
        )}
      </C.Body>
    </C.Container>
  );
};
export default Change;
