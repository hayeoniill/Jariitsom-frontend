import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Box = styled.div`
  width: 345px;
  height: 80px;
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
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;

  img {
    object-fit: cover;
    display: block;
  }
`;

const RightBox = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

function FavoriteList({ limit }) {
    const [favoriteList, setFavoriteList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const API_URL = process.env.REACT_APP_API_URL;
                const res = await axios.get(`${API_URL}/bookmarks/`, {
                    headers: { Authorization: `Token ${token}` },
                });

                // API 응답에서 store 객체만 꺼내서 리스트로 변환
                const stores = res.data.map((bookmark) => bookmark.store);
                setFavoriteList(stores);
            } catch (err) {
                console.error("즐겨찾기 목록 불러오기 실패:", err);
            }
        };

        fetchBookmarks();
    }, []);

    // limit 있으면 제한, 없으면 전체
    const visibleList = limit ? favoriteList.slice(0, limit) : favoriteList;

    return (
        <div>
            {favoriteList.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
                    즐겨찾는 가게가 없습니다.
                </p>
            ) : (
                visibleList.map((store) => (
                    <Box
                        key={store.id}
                        onClick={() => navigate(`/ShopDetail/${store.id}`, { state: store })}
                    >
                        <LeftBox>
                            <Item>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/star.svg"}
                                    alt="즐겨찾기"
                                />
                            </Item>
                            <Item>{store.name}</Item>
                        </LeftBox>
                        <RightBox>
                            <Item>
                                <img
                                    src={
                                        store.ai_congestion_now === "low"
                                            ? process.env.PUBLIC_URL + "/images/Congestion/green_text.svg"
                                            : store.ai_congestion_now === "medium"
                                                ? process.env.PUBLIC_URL + "/images/Congestion/yellow_text.svg"
                                                : process.env.PUBLIC_URL + "/images/Congestion/red_text.svg"
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

export default FavoriteList;
