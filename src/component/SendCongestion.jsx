import React, { useState } from "react";
import * as S from "./StyledSendCongestion";
import { useEffect } from "react";

function SendCongestion({ setShowModal, custInputData, managerInputData }) {
  useEffect(() => {
    if (
      custInputData.person !== null &&
      custInputData.waitTime !== null &&
      custInputData.congestion !== null
    ) {
      console.log("입력된 데이터", custInputData);
    }
  }, [custInputData]);

  return (
    <S.Container>
      <S.SendBtn onClick={() => setShowModal("cust")}>작성하기</S.SendBtn>
    </S.Container>
  );
}

export default SendCongestion;
