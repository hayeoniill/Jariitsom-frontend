import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 메인화면에서 즐겨찾기 가게 혼잡도를 불러옵니다.

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
  line-height: 22px; /* 157.143% */


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
  margin-top:10px;
`;
//porps값으로 리밋값을줘서 그만큼 혼잡도를 보여줌 home에서는 2개, 즐겨찾기페이지에서는 전체
function FavoriteList({ limit }) {
    const [favoriteList, setFavoriteList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // localStorage에서 불러오기
        const stored = JSON.parse(localStorage.getItem("favoriteList") || "[]");
        setFavoriteList(stored);
    }, []);

    // ↓ limit이 있으면 잘라서, 없으면 전체
    const visibleList = limit ? favoriteList.slice(0, limit) : favoriteList;

    return (
        <div>
            {favoriteList.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
                    즐겨찾는 가게가 없습니다.
                </p>
            ) : (
                visibleList.map((item, idx) => (
                    <Box
                        key={idx}
                        onClick={() =>
                            navigate(`/ShopDetail/${item.id}`, {
                                state: { id: item.id },
                            })
                        }
                    >

                        <LeftBox>
                            <Item>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/star.svg"}
                                    alt="즐겨찾기"
                                />
                            </Item>
                            <Item>{item.name}</Item>
                        </LeftBox>
                        <RightBox>
                            <Item>
                                <img
                                    src={
                                        item.congestion === "low"
                                            ? process.env.PUBLIC_URL + "/images/Congestion/green_text.svg"
                                            : item.congestion === "medium"
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
