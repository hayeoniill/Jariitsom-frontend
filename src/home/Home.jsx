import React from "react";
import * as H from "./StyledHome";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar"
import CongestionList from "../component/CongestionList";
function Home() {
    const navigate = useNavigate();

    const goSearch = () => {
        navigate(`/Search`);
    };

    const goFavorite = () => {
        navigate(`/favoriteShop`);
    };

    return (
        <H.Container>
            <H.Box>
                <H.TopLogo src="/images/Logo/logoSom.svg" alt="logo" />
                <H.SearchBar onClick={goSearch}>
                    먹고싶은 메뉴나 가게를 찾아보세요
                    <H.SearchImg src="/images/Search.svg" alt="search" />
                </H.SearchBar>

                <H.IconBox>
                    <H.CategoryContainer style={{ marginLeft: "40px" }}>
                        <H.CategoryBox>
                            <H.CategoryImg src="/images/Category/cake.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>카페•디저트</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox>
                            <H.CategoryImg src="/images/Category/kfood.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>한식</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox style={{ paddingBottom: "10px", boxSizing: "border-box" }}>
                            <H.CategoryImg width={"40px"} src="/images/Category/cfood.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>중식</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox style={{ paddingTop: "10px", boxSizing: "border-box" }}>
                            <H.CategoryImg src="/images/Category/sushi.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>일식</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox>
                            <H.CategoryImg src="/images/Category/hamberger.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>패스트푸드</H.CategoryTxt>
                    </H.CategoryContainer>
                </H.IconBox>

                <H.IconBox>
                    <H.CategoryContainer style={{ marginLeft: "40px" }}>
                        <H.CategoryBox>
                            <H.CategoryImg src="/images/Category/bunsik.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>분식</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox>
                            <H.CategoryImg width={"40px"} src="/images/Category/salad.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>건강식</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox >
                            <H.CategoryImg src="/images/Category/pasta.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>양식</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox >
                            <H.CategoryImg src="/images/Category/beef.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>고깃집</H.CategoryTxt>
                    </H.CategoryContainer>

                    <H.CategoryContainer >
                        <H.CategoryBox>
                            <H.CategoryImg src="/images/Category/beer.svg" />
                        </H.CategoryBox>
                        <H.CategoryTxt>주점</H.CategoryTxt>
                    </H.CategoryContainer>
                </H.IconBox>

                <H.TitleBox>
                    <H.HomeTitle>즐겨찾기 가게 혼잡도</H.HomeTitle>
                    <H.plusBtn onClick={goFavorite}> 더보기 &gt; </H.plusBtn>
                </H.TitleBox>
                <CongestionList limit={2} />

                <H.TitleBox>
                    <H.placeImg src="/images/place.svg" />
                    <H.HomeTitle>지금 여유로운 곳</H.HomeTitle>
                </H.TitleBox>

                <NavigationBar />
            </H.Box>
        </H.Container >
    );
}

export default Home;
