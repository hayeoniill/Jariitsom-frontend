import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "./StyledChange";

// 아이디 비밀번호 변경

const Change = () => {
  const [mode, setMode] = useState("id");
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.Header>
        <C.BackBtn
          src="/images/BackBtn_black.svg"
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
          <C.Form onSubmit={(e) => e.preventDefault()}>
            <C.Label htmlFor="newId">새 아이디 입력</C.Label>
            <C.Input id="newId" placeholder="새 아이디를 입력해주세요." />
            <C.ChangeBtn type="submit" onClick={() => navigate("/MyPage")}>
              변경하기
            </C.ChangeBtn>
          </C.Form>
        ) : (
          <C.Form onSubmit={(e) => e.preventDefault()}>
            <C.Label htmlFor="currPw">현재 비밀번호</C.Label>
            <C.Input id="currPw" placeholder="기존 비밀번호를 입력해주세요." />
            <C.Label htmlFor="newPw">새 비밀번호</C.Label>
            <C.Input id="newPw" placeholder="새 비밀번호를 입력해주세요." />
            <C.Label htmlFor="checkPw">새 비밀번호 확인</C.Label>
            <C.Input id="checkPw" placeholder="비밀번호를 다시 입력해주세요." />

            <C.ChangeBtn type="submit" onClick={() => navigate("/MyPage")}>
              변경하기
            </C.ChangeBtn>
          </C.Form>
        )}
      </C.Body>
    </C.Container>
  );
};
export default Change;

// 임시 api 테스트
export const changeId = async ({ newId }) => {
  await new Promise((r) => setTimeout(r, 500)); // 지연 시뮬
  if (!newId) throw new Error("아이디를 입력하세요.");
  return { ok: true };
};

export const changePassword = async ({ current, next, confirm }) => {
  await new Promise((r) => setTimeout(r, 500));
  if (!current || !next || !confirm) throw new Error("모든 칸을 입력하세요.");
  if (next !== confirm) throw new Error("새 비밀번호가 일치하지 않습니다.");
  return { ok: true };
};
