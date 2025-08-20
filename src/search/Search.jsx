import React, { useState, useEffect, useRef } from "react";
import * as S from "./StyledSearch";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import axios from "axios";

// ---------- 정렬 옵션 ----------
const getOrdering = (sortText) => {
  switch (sortText) {
    case "별점 높은 순":
      return "rating";
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

  // 검색창 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortText, setSortText] = useState("기본 순");

  // 카테고리 (서버 스펙 맞춤)
  const location = useLocation();
  const [mainCategory, setMainCategory] = useState(
    location.state?.category || "home"
  );


  const navigate = useNavigate();

  // 검색 기능
  const [search, setSearch] = useState("");
  const onChange = (e) => setSearch(e.target.value);

  // 카테고리 버튼 클릭
  const handleCategoryClick = (category) => {
    setMainCategory(category);
  };

  // 즐겨찾기 버튼
  const on_Click = () => {
    setIsActive((prev) => !prev);
  };

  const handleSelect = (text) => {
    setSortText(text);
    setIsModalOpen(false);
  };
  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }
      const API_URL = "http://localhost:8000";

      let url = `${API_URL}/stores/?`;

      // 카테고리
      if (mainCategory !== "home") {
        url += `category=${mainCategory}&`;
      }

      // 즐겨찾기
      if (isActive) {
        url += `bookmarked=true&`;
      }

      // 정렬
      const ordering = getOrdering(sortText);
      if (ordering === "distance") {
        url += `ordering=distance&user_lat=37.606&user_lng=127.042&limit=300&`;
      } else if (ordering) {
        url += `ordering=${ordering}&limit=300&`;
      }

      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Token ${token}` },
        });
        setDataList(res.data);
      } catch (err) {
        console.error("가게 데이터 불러오기 실패:", err);
        setError("데이터를 불러오지 못했습니다.");
      }
    };

    fetchData();
  }, [mainCategory, isActive, sortText]);



  // 스크롤 맨 위로
  const topBoxRef = useRef(null);
  useEffect(() => {
    if (topBoxRef.current)
      topBoxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // 검색 필터링 (이름만 적용)
  const filteredData = dataList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
        <S.SearchBtn src="/images/Search.svg" alt="Search" />
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
              src={`${process.env.PUBLIC_URL}/images/Category/KFood.svg`}
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
            <S.ModalItem onClick={() => handleSelect("기본 순")}>기본 순</S.ModalItem>
            <S.ModalItem onClick={() => handleSelect("가까운 순")}>가까운 순</S.ModalItem>
            <S.ModalItem onClick={() => handleSelect("여유로운 순")}>여유로운 순</S.ModalItem>
            <S.ModalItem onClick={() => handleSelect("별점 높은 순")}>별점 높은 순</S.ModalItem>
          </S.ModalBox>
        </>
      )}

      {/* 즐겨찾기 버튼 */}
      <S.Favorite isActive={isActive} onClick={on_Click}>
        <img
          src={`${process.env.PUBLIC_URL}/images/Filter/${isActive ? "heart_red.svg" : "heart_gray.svg"}`}
          alt="Favorite"
          width="14px"
          style={{ marginRight: "4px" }}
        />
        즐겨찾기 가게
      </S.Favorite>

      {/* 가게 리스트 */}
      <S.ShopWrapper>
        {filteredData.map((e) => (
          <S.ShopInform
            key={e.id}
            onClick={() => navigate(`/ShopDetail/${e.id}`, { state: e })}
          >
            <S.LeftBox>
              <S.ShopImg
                src={e.photo || "/images/default.png"}
                width="55px"
                alt={e.name}
                style={{ marginRight: "16px" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <S.ShopName>{e.name}</S.ShopName>
                <S.ReviewText>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/star_yellow.svg`}
                    alt="Star"
                    width="18px"
                  />{" "}
                  {e.rating}/5.0
                </S.ReviewText>
              </div>
            </S.LeftBox>

            <S.CongestionImg>
              <img
                src={
                  //ai_congestion_now 라서 congestion과는 다른 이미지 뜸 
                  e.ai_congestion_now === 'low'
                    ? "/images/Congestion/green_text.svg"
                    : e.ai_congestion_now === 'medium'
                      ? "/images/Congestion/yellow_text.svg"
                      : "/images/Congestion/red_text.svg"
                }
                alt="CongestionImg"
                width="42px"
              />
            </S.CongestionImg>
          </S.ShopInform>
        ))}
      </S.ShopWrapper>

      <NavigationBar />
    </>
  );
};

export default Search;
