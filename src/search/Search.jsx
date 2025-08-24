import React, { useState, useEffect, useRef, useCallback } from "react";
import * as S from "./StyledSearch";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import axios from "axios";

const getOrdering = (sortText) => {
  switch (sortText) {
    case "별점 높은 순":
      return "-rating";
    case "여유로운 순":
      return "relaxed";
    case "가까운 순":
      return "distance";
    default:
      return "";
  }
};

const Search = () => {
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortText, setSortText] = useState("기본 순");
  const location = useLocation();
  const [mainCategory, setMainCategory] = useState(
    location.state?.category || "home"
  );
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const onChange = (e) => setSearch(e.target.value);

  const topBoxRef = useRef(null);

  const handleCategoryClick = (category) => setMainCategory(category);
  const on_Click = () => setIsActive((prev) => !prev);
  const handleSelect = (text) => {
    setSortText(text);
    setIsModalOpen(false);
  };

  // 페이지 상태 
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef(null);

  // 데이터 불러오기
  const fetchData = useCallback(async () => {
    if (!hasNext) return;
    const API_URL = process.env.REACT_APP_API_URL;
    let url = `${API_URL}/stores/?page=${page}`;

    if (mainCategory !== "home") url += `&category=${mainCategory}`;
    if (isActive) url += `&bookmarked=true`;

    const ordering = getOrdering(sortText);
    if (ordering === "distance") {
      url += `&ordering=distance&user_lat=37.606&user_lng=127.042`;
    } else if (ordering) {
      url += `&ordering=${ordering}`;
    }

    try {
      const res = await axios.get(url);
      const results = Array.isArray(res.data?.results)
        ? res.data.results
        : res.data;

      setDataList((prev) => [...prev, ...results]);
      if (!res.data.next) setHasNext(false);
    } catch (err) {
      console.error("가게 데이터 불러오기 실패:", err);
      setError("데이터를 불러오지 못했습니다.");
      setHasNext(false);
    }
  }, [page, mainCategory, isActive, sortText, hasNext]);

  useEffect(() => {
    setDataList([]);
    setPage(1);
    setHasNext(true);
  }, [mainCategory, isActive, sortText]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  // IntersectionObserver로 마지막 요소 감지
  const lastItemRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPage((prev) => prev + 1); // 페이지 증가
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [hasNext]
  );

  const filteredData = (Array.isArray(dataList) ? dataList : []).filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* 검색창 */}
      <S.SearchBox>
        <S.Input
          type="text"
          placeholder="가게 검색"
          value={search}
          onChange={onChange}
        />
        <S.SearchBtn
          src={`${process.env.PUBLIC_URL}/images/Search.svg`}
          alt="Search"
        />
      </S.SearchBox>

      {/* 위치 텍스트 */}
      <S.LocationImg>
        <img
          src={`${process.env.PUBLIC_URL}/images/mapLocation.svg`}
          alt="location"
          width="18px"
        />
      </S.LocationImg>
      <S.LocationText>성북구 하월곡동</S.LocationText>

      {/* 카테고리 아이콘 */}
      <S.TopBox ref={topBoxRef}>
        <S.IconBox
          onClick={() => handleCategoryClick("home")}
          className={mainCategory === "home" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/House.svg`}
              alt="Home"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>홈</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("cafe")}
          className={mainCategory === "cafe" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/cake.svg`}
              alt="cafe"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>카페/디저트</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("korean")}
          className={mainCategory === "korean" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/kfood.svg`}
              alt="korean"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>한식</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("japanese")}
          className={mainCategory === "japanese" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/sushi.svg`}
              alt="japanese"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>일식</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("chinese")}
          className={mainCategory === "chinese" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/cfood.svg`}
              alt="chinese"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>중식</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("fastfood")}
          className={mainCategory === "fastfood" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/hamberger.svg`}
              alt="fastfood"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>패스트푸드</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("bunsik")}
          className={mainCategory === "bunsik" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/bunsik.svg`}
              alt="bunsik"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>분식</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("healthy")}
          className={mainCategory === "healthy" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/salad.svg`}
              alt="healthy"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>건강식</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("western")}
          className={mainCategory === "western" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/pasta.svg`}
              alt="western"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>양식</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("bbq")}
          className={mainCategory === "bbq" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/beef.svg`}
              alt="bbq"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>고깃집</S.TopIconText>
        </S.IconBox>

        <S.IconBox
          onClick={() => handleCategoryClick("bar")}
          className={mainCategory === "bar" ? "active" : ""}
        >
          <S.TopIcon>
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/beer.svg`}
              alt="bar"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText>주점</S.TopIconText>
        </S.IconBox>
      </S.TopBox>

      {/* 정렬 모달 */}
      <S.BasicLayer onClick={() => setIsModalOpen((prev) => !prev)}>
        <img
          src={`${process.env.PUBLIC_URL}/images/Filter/arrow.svg`}
          alt="Arrow"
          width="14px"
          style={{ marginRight: "4px" }}
        />
        {sortText}
      </S.BasicLayer>

      {isModalOpen && (
        <>
          <S.ModalOverlay onClick={() => setIsModalOpen(false)} />
          <S.ModalBox>
            <S.ModalItem onClick={() => handleSelect("기본 순")}>
              기본 순
            </S.ModalItem>
            <S.ModalItem onClick={() => handleSelect("가까운 순")}>
              가까운 순
            </S.ModalItem>
            <S.ModalItem onClick={() => handleSelect("여유로운 순")}>
              여유로운 순
            </S.ModalItem>
            <S.ModalItem onClick={() => handleSelect("별점 높은 순")}>
              별점 높은 순
            </S.ModalItem>
          </S.ModalBox>
        </>
      )}

      {/* 즐겨찾기 버튼 */}
      <S.Favorite isActive={isActive} onClick={on_Click}>
        <img
          src={`${process.env.PUBLIC_URL}/images/Filter/${isActive ? "heart_red.svg" : "heart_gray.svg"
            }`}
          alt="Favorite"
          width="14px"
          style={{ marginRight: "4px" }}
        />
        즐겨찾기 가게
      </S.Favorite>

      {/* 가게 리스트 */}
      <S.ShopWrapper>
        {filteredData.map((e, idx) => {
          const daysKor = ["일", "월", "화", "수", "목", "금", "토"];
          const todayKey = daysKor[new Date().getDay()];
          const todayHours =
            e.business_hours?.[todayKey]?.open_close || "영업시간 정보 없음";

          // 마지막 아이템이면 ref 붙임
          const isLast = idx === filteredData.length - 1;

          return (
            <S.ShopInform
              ref={isLast ? lastItemRef : null}
              key={e.id}
              onClick={() => navigate(`/ShopDetail/${e.id}`, { state: e })}
            >
              <S.LeftBox>
                <S.ShopImg
                  src={
                    e.photo || `${process.env.PUBLIC_URL}/images/default.png`
                  }
                  width="55px"
                  alt={e.name}
                  style={{ marginRight: "16px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <S.ShopName>{e.name}</S.ShopName>

                  {/*별점*/}
                  <S.ReviewText>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/star_yellow.svg`}
                      alt="Star"
                      width="18px"
                    />{" "}
                    {e.rating}/5.0
                  </S.ReviewText>

                  {/*영업 여부 */}
                  <S.ReviewText>
                    {e.open_status || "영업 상태 정보 없음"}
                    <div>•</div>
                    {todayHours}
                  </S.ReviewText>
                </div>
              </S.LeftBox>

              <S.CongestionImg>
                <img
                  src={
                    e.ai_congestion_now === "low"
                      ? `${process.env.PUBLIC_URL}/images/Congestion/green_text.svg`
                      : e.ai_congestion_now === "medium"
                        ? `${process.env.PUBLIC_URL}/images/Congestion/yellow_text.svg`
                        : `${process.env.PUBLIC_URL}/images/Congestion/red_text.svg`
                  }
                  alt="CongestionImg"
                  width="42px"
                />
              </S.CongestionImg>
            </S.ShopInform>
          );
        })}
      </S.ShopWrapper>

      <NavigationBar />
    </>
  );
};

export default Search;