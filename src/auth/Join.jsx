import React, { useState, useEffect } from "react";
import * as J from "./StyledJoin1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useKakaoLogin from "./KakaoLoginButton";

const Join1 = () => {
    const navigate = useNavigate();
    const { onKakaoLogin } = useKakaoLogin();

    const [form, setForm] = useState({
        username: "",
        password: "",
        password2: "",
        first_name: "", // 닉네임/이름
        phone: "",
    });

    // useEffect로 호출 트리거
    const [submitTrigger, setSubmitTrigger] = useState(false);

    // 입력 핸들러
    const onChange = (key) => (e) =>
        setForm((p) => ({ ...p, [key]: e.target.value }));

    //비밀번호확인 미일치
    const mismatch = form.password !== form.password2;
    //핸드폰번호 11자
    const phoneDigits = (form.phone || "").replace(/\D/g, "");

    const isValid =
        (form.username || "").trim().length >= 8 &&
        (form.password || "").trim().length >= 8 &&
        (form.first_name || "").trim().length > 0 &&
        phoneDigits.length === 11 &&
        !mismatch;

    const onSubmitClick = () => {
        if (!isValid) {
            return;
        } // 방어
        setSubmitTrigger(true);
    };

    // API 호출
    useEffect(() => {
        if (!submitTrigger) return;

        const run = async () => {
            try {
                const payload = {
                    username: form.username,
                    password: form.password,
                    first_name: form.first_name,
                    phone: form.phone,
                };
                const { data } = await axios.post(
                    "http://127.0.0.1:8000/user/",
                    payload
                );

                console.log("회원가입 성공:", data);
                navigate("/Home");
            } catch (err) {
                const res = err?.response;
                console.error("회원가입 실패:", res?.status, res?.data);

                if (res?.data) {
                    const d = res.data;
                    const msg =
                        (Array.isArray(d.username) && d.username[0]) ||
                        (Array.isArray(d.password) && d.password[0]) ||
                        (Array.isArray(d.first_name) && d.first_name[0]) ||
                        (Array.isArray(d.phone) && d.phone[0]) ||
                        "회원가입에 실패했습니다.";
                    alert(msg);
                } else {
                    alert("네트워크 오류 또는 서버 오류 입니다.");
                }
            } finally {
                setSubmitTrigger(false);
            }
        };

        run();
    }, [submitTrigger, form, navigate]);

    return (
        <>
            <J.Logo src="/images/Logo/logo.svg" alt="logo" />
            <J.JoinBox>
                <J.JoinTxt>회원가입</J.JoinTxt>

                <J.TitleTxt>아이디</J.TitleTxt>
                <J.InputId
                    placeholder="아이디를 입력하세요. (숫자, 영문 조합 8자 이상)"
                    value={form.username}
                    onChange={onChange("username")}
                />
                {form.username.length < 8 && (
                    <J.Caution >*8자 이상 입력해주세요.</J.Caution>
                )}
                <J.TitleTxt>비밀번호</J.TitleTxt>
                <J.InputPw
                    type="password"
                    placeholder="비밀번호를 입력하세요. (숫자, 영문 조합 8자 이상)"
                    value={form.password}
                    onChange={onChange("password")}
                />
                {form.password.length < 8 && (
                    <J.Caution >*8자 이상 입력해주세요.</J.Caution>
                )}
                <J.TitleTxt>비밀번호 확인</J.TitleTxt>
                <J.InputPwConfirm
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요."
                    value={form.password2}
                    onChange={onChange("password2")}
                />
                {mismatch && (
                    <J.Caution id="pw-caution">*비밀번호가 일치하지 않습니다.</J.Caution>
                )}
                <J.TitleTxt>닉네임</J.TitleTxt>
                <J.InputName
                    placeholder="닉네임을 입력하세요."
                    value={form.first_name}
                    onChange={onChange("first_name")}
                />

                <J.TitleTxt>전화번호</J.TitleTxt>
                <J.InputPN
                    placeholder="전화번호를 입력하세요."
                    value={form.phone}
                    onChange={onChange("phone")}
                />
            </J.JoinBox>
            <J.NextBtn
                type="button"
                disabled={!isValid}
                onClick={onSubmitClick}
            >
                시작하기
            </J.NextBtn>

            <J.GoKakaoBtn onClick={onKakaoLogin}>카카오톡으로 간편 회원가입</J.GoKakaoBtn>
        </>
    );
};

export default Join1;
