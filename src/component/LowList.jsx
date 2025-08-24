import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// 스타일 정의
const Box = styled.div`
  width: 160px;
  height: 58px;
  border-radius: 12px;
  background: #f7f7f7;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 25px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

function LowList() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [recommended, setRecommended] = useState([]);
  //API 주소
  const API_URL = process.env.REACT_APP_API_URL;

  // 서버에서 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/stores/?limit=300`);

        const stores = res.data?.results || [];
        setDataList(stores);
      } catch (err) {
        console.error("가게 데이터 불러오기 실패:", err);
        setDataList([]); // 에러 시에도 배열 보장
      }
    };

    fetchData();
  }, []);

  // ai_congestion_now === "low" 필터 + 랜덤 뽑기
  useEffect(() => {
    if (dataList.length === 0) return;

    const lowList = dataList.filter((item) => item.ai_congestion_now === "low");

    const pickRandom = (arr, n) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a.slice(0, n);
    };

    setRecommended(pickRandom(lowList, 2)); // 최대 2개 랜덤 선택
  }, [dataList]);

  return (
    <BoxContainer>
      {recommended.map((shop) => (
        <Box
          key={shop.id}
          onClick={() => navigate(`/ShopDetail/${shop.id}`, { state: shop })}
        >
          {shop.name.length > 10 ? shop.name.slice(0, 10) + "..." : shop.name}
        </Box>
      ))}
    </BoxContainer>
  );
}

export default LowList;
