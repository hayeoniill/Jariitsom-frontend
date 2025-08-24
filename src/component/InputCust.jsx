import React, { useState } from "react";
import * as I from "./styledInputCust";
import axios from "axios";

function InputCust({ storeId, onClose, setInputData }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedWait, setSelectedWait] = useState(null);
  const [selectedCongestion, setSelectedCongestion] = useState(null);

  const personOptions = ["1명", "2명", "3명", "4명", "5명", "6명 이상"];
  const waitOptions = [
    "바로 입장",
    "10분 이내",
    "20분 이내",
    "30분 이내",
    "1시간 이내",
    "1시간 이상",
  ];
  const congestionOptions = [
    { label: "여유", value: "low" },
    { label: "보통", value: "medium" },
    { label: "혼잡", value: "high" },
  ];

  const handleSubmit = async () => {
    if (
      selectedPerson === null ||
      selectedWait === null ||
      selectedCongestion === null
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const visitRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/stores/${storeId}/visitlogs/`,
        {
          visit_count: selectedPerson + 1, // index 0 → 1명
          wait_time: waitOptions[selectedWait],
          congestion: congestionOptions[selectedCongestion].value,
        },
        { headers: { Authorization: `Token ${token}` } }
      );

      alert("방문 기록 등록 완료!");
      console.log("등록된 방문기록:", visitRes.data);

      // 프론트에도 반영
      setInputData((prev) => [
        ...prev,
        {
          person: personOptions[selectedPerson],
          waitTime: waitOptions[selectedWait],
          congestion: congestionOptions[selectedCongestion].label,
          createdAt: new Date(),
        },
      ]);

      onClose();
    } catch (err) {
      console.error("방문 기록 등록 실패:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <I.Container>
      <I.Box>
        <I.InputBox>
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
                  {option.label}
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
