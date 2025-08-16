import React, { useState } from "react";
import * as J from "./StyledJoin1";
import { useNavigate } from "react-router-dom";

const Join1 = () => {
    const navigate = useNavigate();

    //아이디값
    const [id, setId] = useState('');
    const idChange = (e) => {
        setId(e.target.value);
    };

    //비밀번호값 
    const [pwvalue, setpwvalue] = useState('');
    const pwChange = (e) => {
        setpwvalue(e.target.value);
    };

    //비밀번호 확인 값
    const [conPw, setConPw] = useState('');
    const conPwChange = (e) => {
        setConPw(e.target.value);
    };

    //비밀번호 일치 확인
    const mismatch = pwvalue.length > 0 && conPw.length > 0 && pwvalue !== conPw;

    //닉네임
    const [name, setName] = useState('');
    const nameChange = (e) => {
        setName(e.target.value);
    };
    //전화번호 값
    const [phone, setPhone] = useState('');
    const phoneChange = (e) => {
        setPhone(e.target.value);
    };

    const goNext = id.length > 0 && name.length > 0 && phone.length === 11 && !mismatch;

    return (
        <>
            <J.Logo src="/images/Logo/logo.svg" alt="logo" />
            <J.JoinBox>
                <J.JoinTxt>회원가입</J.JoinTxt>
                <J.TitleTxt>아이디</J.TitleTxt>
                <J.InputId value={id} onChange={idChange} placeholder="아이디를 입력하세요. (숫자, 영문 조합 8자 이상)"></J.InputId>
                <J.TitleTxt>비밀번호</J.TitleTxt>
                <J.InputPw type="password" value={pwvalue} onChange={pwChange} placeholder="비밀번호를 입력하세요. (숫자, 영문 조합 8자 이상)"></J.InputPw>
                <J.TitleTxt>비밀번호 확인</J.TitleTxt>
                <J.InputPwConfirm type="password" value={conPw} onChange={conPwChange} placeholder="비밀번호를 다시 입력하세요."></J.InputPwConfirm>
                {mismatch && (
                    <J.Caution id="pw-caution">*비밀번호가 일치하지 않습니다.</J.Caution>
                )}
                <J.TitleTxt>닉네임</J.TitleTxt>
                <J.InputName value={name} onChange={nameChange} placeholder="닉네임을 입력하세요."></J.InputName>
                <J.TitleTxt>전화번호</J.TitleTxt>
                <J.InputPN value={phone} onChange={phoneChange} placeholder="전화번호를 입력하세요."></J.InputPN>
            </J.JoinBox>
            <J.NextBtn disabled={!goNext} onClick={() => {
                if (goNext) {
                    navigate("/Home");

                }
            }}>시작하기</J.NextBtn>
            <J.GoKakaoBtn> 카카오톡으로 간편 회원가입</J.GoKakaoBtn>
        </>
    );
}
export default Join1;
