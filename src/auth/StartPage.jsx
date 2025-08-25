import React, { useEffect } from "react";
import * as SP from "./StyledStartPage";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <SP.Container>
      <SP.LogoImg
        src={`${process.env.PUBLIC_URL}/images/Logo/logoSom.svg`}
        alt="logo"
      />
      <SP.LogoTxt
        src={`${process.env.PUBLIC_URL}/images/Logo/logoText.svg`}
        alt="logo"
      />

      <SP.GoJoin onClick={() => navigate("/Join")}> 회원가입 </SP.GoJoin>
      <SP.GoMain onClick={() => navigate("/Home")}>
        {" "}
        비회원으로 시작하기{" "}
      </SP.GoMain>
      <SP.GoLogin onClick={() => navigate("/Login")}>
        {" "}
        이미 회원이신가요? <SP.LogLink>로그인하기</SP.LogLink>{" "}
      </SP.GoLogin>
    </SP.Container>
  );
};
export default StartPage;
