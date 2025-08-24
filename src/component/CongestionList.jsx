import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Box = styled.div`
  width: 345px;
  height: 55px;
  border-radius: 12px;
  background: #f4f5f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 13px auto;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-left: 15px;
`;

const Item = styled.span`
  display: inline-block;
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;

  img {
    width: 27px;
    height: 27px;
    object-fit: cover;
    display: block;
  }
`;

const RightBox = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CongestionList() {
  const [favoriteList, setFavoriteList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const API_URL = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${API_URL}/stores/?bookmarked=true`, {
          headers: { Authorization: `Token ${token}` },
        });

        // 랜덤 2개만 뽑기
        const shuffled = [...res.data].sort(() => Math.random() - 0.5);
        setFavoriteList(shuffled.slice(0, 2));
      } catch (err) {
        console.error("즐겨찾기 목록 불러오기 실패:", err);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div>
      {favoriteList.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
          즐겨찾는 가게가 없습니다.
        </p>
      ) : (
        favoriteList.map((item) => (
          <Box
            key={item.id}
            onClick={() => navigate(`/ShopDetail/${item.id}`, { state: item })}
          >
            <LeftBox>
              <Item>
                <img
                  src={`${process.env.PUBLIC_URL}/images/star.svg`}
                  alt="즐겨찾기"
                />
              </Item>
              <Item>{item.name}</Item>
            </LeftBox>
            <RightBox>
              <Item>
                <img
                  src={
                    item.ai_congestion_now === "low"
                      ? `${process.env.PUBLIC_URL}/images/Congestion/greenSom.svg`
                      : item.ai_congestion_now === "medium"
                      ? `${process.env.PUBLIC_URL}/images/Congestion/yellowSom.svg`
                      : `${process.env.PUBLIC_URL}/images/Congestion/redSom.svg`
                  }
                  alt="혼잡도"
                />
              </Item>
            </RightBox>
          </Box>
        ))
      )}
    </div>
  );
}

export default CongestionList;
