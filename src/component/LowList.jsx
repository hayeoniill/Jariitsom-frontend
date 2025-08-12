import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

//홈에서 여유로운 가게를 랜덤으로 보여줍니다. 
const Box = styled.div`
width: 160px;
height: 48px;
border-radius: 12px;
background: #F7F7F7;
color: #000;
font-family: Pretendard;
font-size: 15px;
font-weight: 500;
display:flex;
align-items:center;
justify-content: center;
`;

const BoxContainer = styled.div`
 display: flex;
  gap: 20px; 
  margin-left: 25px;
  margin-top: 10px;
`
function LowList() {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [recommended, setRecommended] = useState([]); //랜덤덤
    //더미데이터
    useEffect(() => {
        const mock = [
            {
                id: 1,
                name: "슬기카페",
                subcategory: "cake",
                lat: 37.5655,
                lng: 126.9785,
                rating: 4.6,
                bookmarked: true,
                congestion: "low", // low|medium|high
            },
            {
                id: 2,
                name: "하월곡 분식",
                subcategory: "snack",
                lat: 37.568,
                lng: 126.981,
                rating: 4.2,
                bookmarked: false,
                congestion: "low",
            },
            {
                id: 3,
                name: "도쿄라멘",
                subcategory: "japanese",
                lat: 37.5672,
                lng: 126.976,
                rating: 4.9,
                bookmarked: true,
                congestion: "low",
            },
            {
                id: 4,
                name: "도쿄라멘",
                subcategory: "japanese",
                lat: 37.5672,
                lng: 126.976,
                rating: 4.9,
                bookmarked: true,
                congestion: "low",
            },
            {
                id: 5,
                name: "도쿄라멘",
                subcategory: "japanese",
                lat: 37.5672,
                lng: 126.976,
                rating: 4.9,
                bookmarked: true,
                congestion: "low",
            },
            {
                id: 6,
                name: "도쿄라멘",
                subcategory: "japanese",
                lat: 37.5672,
                lng: 126.976,
                rating: 4.9,
                bookmarked: true,
                congestion: "low",
            },
            {
                id: 7,
                name: "도쿄라멘",
                subcategory: "japanese",
                lat: 37.5672,
                lng: 126.976,
                rating: 4.9,
                bookmarked: true,
                congestion: "low",
            },
        ];
        setDataList(mock);
    }, []);

    useEffect(() => {
        const lowList = dataList.filter((item) => item.congestion === "low");

        const pickRandom = (arr, n) => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a.slice(0, n);
        };

        setRecommended(pickRandom(lowList, 2)); // low가 2개보다 적으면 있는 만큼만
    }, [dataList]);

    return (
        <BoxContainer>
            {recommended.map((shop) => (
                <Box key={shop.id} onClick={() => navigate(`/ClickedSearch/${shop.id}`, {
                    state: { shop }
                })}>{shop.name}</Box>
            ))}
        </BoxContainer>

    );
}

export default LowList;