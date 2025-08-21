import React, { useState } from "react";
import * as I from "./styledInputCust";
// import axios from "axios";

function InputCust({ onClose, setInputData }) {
  const [storeName, setStoreName] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedWait, setSelectedWait] = useState(null);
  const [selectedCongestion, setSelectedCongestion] = useState(null);

  const personOptions = ["1명", "2명", "3명", "4명", "5명", "6명 이상"];
  const waitOptions = [
    "바로 입장",
    "10분 이내",
    "20분 이내",
    "30분 이내",
    "1시간 이상",
  ];
  const congestionOptions = ["여유", "보통", "혼잡"];

  const handleSubmit = () => {
    // if (
    //   !storeName ||
    //   selectedPerson === null ||
    //   selectedWait === null ||
    //   selectedCongestion === null
    // ) {
    //   alert("모든 항목을 입력해주세요.");
    //   return;
    // }

    // 👉 axios 로직은 잠시 주석 처리 (백엔드 연결 전)
    /*
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8000/stores/?name=${encodeURIComponent(storeName)}`,
        { headers: { Authorization: `Token ${token}` } }
      );

      const matchedStore = res.data.find((store) => store.name === storeName);
      if (!matchedStore) {
        alert("일치하는 가게가 없습니다.");
        return;
      }

      const storeId = matchedStore.id;

      await axios.post(
        `http://localhost:8000/stores/${storeId}/visit/`,
        {
          visit_count: selectedPerson + 1,
          wait_time: waitOptions[selectedWait],
          congestion: congestionOptions[selectedCongestion],
        },
        { headers: { Authorization: `Token ${token}` } }
      );

      alert("방문 기록 등록 완료!");
    } catch (err) {
      console.error("방문 기록 등록 실패:", err.response);
      alert("서버 오류가 발생했습니다.");
    }
    */

    // 프론트 테스트용 mock 데이터 저장
    setInputData((prev) => [
      ...prev,
      {
        name: storeName,
        person: personOptions[selectedPerson],
        waitTime: waitOptions[selectedWait],
        congestion: congestionOptions[selectedCongestion],
        createdAt: new Date(),
      },
    ]);

    onClose();
  };

  return (
    <I.Container>
      <I.Box>
        <I.InputBox>
          {/* <I.Title>
            <img
              src={`${process.env.PUBLIC_URL}/images/SendCongetion/customer.svg`}
              alt="customer"
            />
            <span>손님께서 직접 입력해주세요</span>
          </I.Title> */}
          {/* <I.InputName>
            <I.Lable>가게이름</I.Lable>
            <input
              type="text"
              placeholder="가게를 입력해주세요"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </I.InputName> */}
          <I.BoxTitle>
            <I.Lable>방문자 수</I.Lable>
            <I.Lable>대기 시간</I.Lable>
            <I.Lable>혼잡도 정보</I.Lable>
          </I.BoxTitle>
          <I.ChoiceGruop>
            <I.BoxGroup>
              {personOptions.map((option, index) => (
                <I.ChoiceBox
                  key={index}
                  className={selectedPerson === index ? "selected" : ""}
                  onClick={() => setSelectedPerson(index)}
                >
                  {option}
                </I.ChoiceBox>
              ))}
            </I.BoxGroup>
            <I.BoxGroup>
              {waitOptions.map((option, index) => (
                <I.ChoiceBox
                  key={index}
                  className={selectedWait === index ? "selected" : ""}
                  onClick={() => setSelectedWait(index)}
                >
                  {option}
                </I.ChoiceBox>
              ))}
            </I.BoxGroup>
            <I.BoxGroup>
              {congestionOptions.map((option, index) => (
                <I.ChoiceBox
                  key={index}
                  className={selectedCongestion === index ? "selected" : ""}
                  onClick={() => setSelectedCongestion(index)}
                >
                  {option}
                </I.ChoiceBox>
              ))}
            </I.BoxGroup>
          </I.ChoiceGruop>
          <I.EndBtn onClick={handleSubmit}>완료</I.EndBtn>
        </I.InputBox>
      </I.Box>
    </I.Container>
  );
}

export default InputCust;
