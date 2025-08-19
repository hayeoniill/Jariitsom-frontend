// src/component/FavoriteList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ListContainer = styled.div`
  padding: 20px;
`;

const ShopCard = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const ShopName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const ShopInfo = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: #555;
`;

const FavoriteList = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // 로그인 후 저장해둔 토큰
    axios.get("http://127.0.0.1:8000/bookmarks/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setBookmarks(res.data);
      })
      .catch((err) => {
        console.error("즐겨찾기 불러오기 실패:", err);
      });
  }, []);

  if (bookmarks.length === 0) {
    return <ListContainer>즐겨찾기한 가게가 없습니다.</ListContainer>;
  }

  return (
    <ListContainer>
      {bookmarks.map((bm) => (
        <ShopCard key={bm.id}>
          <ShopName>{bm.store.name}</ShopName>
          <ShopInfo>현재 혼잡도: {bm.store.ai_congestion_now}</ShopInfo>
          <ShopInfo>
            카카오맵:{" "}
            <a href={bm.store.kakao_url} target="_blank" rel="noreferrer">
              보러가기
            </a>
          </ShopInfo>
        </ShopCard>
      ))}
    </ListContainer>
  );
};

export default FavoriteList;
