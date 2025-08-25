import React from "react";
import * as H from "./StyledHome";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import CongestionList from "../component/CongestionList";
import LowList from "../component/LowList";

const Home = () => {
  const navigate = useNavigate();

  // 카테고리 클릭 시 Search로 이동 (Search에서 쓰는 이름과 동일하게 넘김)
  const goSearchWith = (category) => {
    navigate("/Search", {
      state: { category }, // Search에서 location.state.category 로 읽음
    });
  };

  const goSearch = () => {
    navigate(`/Search`);
  };

  const goFavorite = () => {
    navigate(`/favoriteShop`);
  };

  return (
    <>
      <H.TopLogo
        src={`${process.env.PUBLIC_URL}/images/Logo/logoSom.svg`}
        alt="logo"
      />

      <H.SearchBar onClick={goSearch}>
        먹고싶은 메뉴나 가게를 찾아보세요
        <H.SearchImg
          src={`${process.env.PUBLIC_URL}/images/Search.svg`}
          alt="search"
        />
      </H.SearchBar>
      <H.IconBox>
        {/*카페 디저트*/}
        <H.CategoryContainer
          style={{ marginLeft: "40px" }}
          onClick={() => goSearchWith("cafe")}
        >
          <H.CategoryBox>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/cake.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>카페/디저트</H.CategoryTxt>
        </H.CategoryContainer>

        {/*한식*/}
        <H.CategoryContainer onClick={() => goSearchWith("korean")}>
          <H.CategoryBox>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/kfood.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>한식</H.CategoryTxt>
        </H.CategoryContainer>

        {/*중식*/}
        <H.CategoryContainer onClick={() => goSearchWith("chinese")}>
          <H.CategoryBox style={{ paddingBottom: "10px" }}>
            <H.CategoryImg
              width={"40px"}
              src={`${process.env.PUBLIC_URL}/images/Category/cfood.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>중식</H.CategoryTxt>
        </H.CategoryContainer>
        {/*일식*/}
        <H.CategoryContainer onClick={() => goSearchWith("japanese")}>
          <H.CategoryBox style={{ paddingTop: "10px" }}>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/sushi.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>일식</H.CategoryTxt>
        </H.CategoryContainer>

        {/*패스트푸드*/}
        <H.CategoryContainer onClick={() => goSearchWith("fastfood")}>
          <H.CategoryBox>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/hamberger.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>패스트푸드</H.CategoryTxt>
        </H.CategoryContainer>
      </H.IconBox>

      <H.IconBox>
        {/*분식*/}
        <H.CategoryContainer
          style={{ marginLeft: "40px" }}
          onClick={() => goSearchWith("bunsik")}
        >
          <H.CategoryBox>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/bunsik.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>분식</H.CategoryTxt>
        </H.CategoryContainer>

        {/*건강식*/}
        <H.CategoryContainer onClick={() => goSearchWith("healthy")}>
          <H.CategoryBox>
            <H.CategoryImg
              width={"40px"}
              src={`${process.env.PUBLIC_URL}/images/Category/salad.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>건강식</H.CategoryTxt>
        </H.CategoryContainer>

        {/*양식*/}
        <H.CategoryContainer onClick={() => goSearchWith("western")}>
          <H.CategoryBox>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/pasta.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>양식</H.CategoryTxt>
        </H.CategoryContainer>

        {/*고깃집*/}
        <H.CategoryContainer onClick={() => goSearchWith("bbq")}>
          <H.CategoryBox>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/beef.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>고깃집</H.CategoryTxt>
        </H.CategoryContainer>

        {/*주점*/}
        <H.CategoryContainer onClick={() => goSearchWith("bar")}>
          <H.CategoryBox>
            <H.CategoryImg
              src={`${process.env.PUBLIC_URL}/images/Category/beer.svg`}
            />
          </H.CategoryBox>
          <H.CategoryTxt>주점</H.CategoryTxt>
        </H.CategoryContainer>
      </H.IconBox>

      <H.MainWrap>
        <H.TitleContainer>
          <H.FavoriteShopTitle>즐겨찾기 가게 혼잡도</H.FavoriteShopTitle>
          <H.plusBtn onClick={goFavorite}> 더보기 &gt; </H.plusBtn>
        </H.TitleContainer>
        <CongestionList />

        <H.TitleBox>
          <H.placeImg src={`${process.env.PUBLIC_URL}/images/place.svg`} />
          <H.HomeTitle>지금 여유로운 곳 추천</H.HomeTitle>
        </H.TitleBox>
        <LowList />
      </H.MainWrap>
      {/*
            <H.TitleBox>
                <H.placeImg src="/images/place.svg" />
                <H.HomeTitle>잇솜이의 추천 메뉴</H.HomeTitle>
            </H.TitleBox>
            <H.RecommendBox>
                <H.RecommendImg src="/images/Logo/logoSom.svg" />
                <H.RecommendChat>
                    아무거나 먹어
                </H.RecommendChat>
            </H.RecommendBox>
            */}
      <NavigationBar />
    </>
  );
};

export default Home;
