import React, { useState, useEffect } from "react";
import * as S from "./StyledSearch";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import { useLocation } from "react-router-dom";
// import axios from "axios";

// ---------- 시간 유틸 ----------
const toToday = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

const getCurrentPeriod = (now, periods) =>
  periods.find((p) => toToday(p.start) <= now && now < toToday(p.end));

const getNextPeriod = (now, periods) =>
  periods.find((p) => now < toToday(p.start));

const formatRange = (p) => `${p.start}~${p.end}`;

const formatRemain = (end, now) => {
  const min = Math.max(0, Math.round((toToday(end) - now) / 60000));
  if (min >= 60) {
    const h = Math.ceil(min / 60);
    return `${h}시간`;
  }
  return `${min}분`;
};

// Search 리스트용: "영업중 11:30~15:30" / "영업준비중 11:30 오픈" / "영업종료"
const buildSearchStatus = (periods, now = new Date()) => {
  const cur = getCurrentPeriod(now, periods);
  if (cur) return `영업중 ${formatRange(cur)}`;
  const next = getNextPeriod(now, periods);
  if (next) return `영업준비중 ${next.start} 오픈`;
  return "영업종료";
};

// 상세용: "영업중 브레이크 타임 X 1시간 뒤 영업종료"
const buildDetailStatus = (periods, now = new Date()) => {
  const hasBreak = periods.length > 1 ? "O" : "X";
  const cur = getCurrentPeriod(now, periods);
  if (cur) {
    const remain = formatRemain(cur.end, now);
    return `영업중 브레이크 타임 ${hasBreak} ${remain} 뒤 영업종료`;
  }
  const next = getNextPeriod(now, periods);
  if (next) return `영업준비중 브레이크 타임 ${hasBreak} ${next.start} 오픈`;
  return `영업종료 브레이크 타임 ${hasBreak}`;
};

const Search = () => {
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);

  // 검색창 모달로 띄우기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortText, setSortText] = useState("기본 순");

  // 버튼 값 가져오기
  const location = useLocation();
  const [mainCategory] = useState(location.state?.category || "restaurant");
  const [subCategory, setSubCategory] = useState(
    location.state?.subCategory || "전체"
  );
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getOrdering = () => {
    switch (sortText) {
      case "별점 높은 순":
        return "-rating";
      case "여유로운 순":
        return "population_ratio";
      case "가까운 순":
        return "distance";
      default:
        return ""; //기본 순
    }
  };

  const on_Click = () => {
    setIsActive((prev) => !prev);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/main`);
  };

  const handleSelect = (text) => {
    setSortText(text);
    setIsModalOpen(false);
  };

  //검색 기능
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  //카테고리 필터링
  const filteredData = dataList.filter((item) => {
    const matchTitle = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      subCategory === "전체" || item.subcategory === subCategory;
    return matchTitle && matchCategory;
  });

  const handleCategoryClick = (category) => {
    setSubCategory(category);
  };

  // 더미데이터
  useEffect(() => {
    // TODO: 백엔드 붙으면 이 블록 삭제하고 fetch/axios 해제
    const mock = [
      {
        id: 1,
        name: "슬기카페",
        subcategory: "cake",
        distanceText: "도보 3분",
        rating: 4.6,
        bookmarked: true,
        congestion: "low",
        address: "서울 성북구 화랑로13길 60",
        periods: [{ start: "10:00", end: "22:00" }], // 브레이크 X
        businessHours: [
          "일요일: 휴무",
          "월요일: 10:00 ~ 22:00",
          "화요일: 10:00 ~ 22:00",
          "수요일: 10:00 ~ 22:00",
          "목요일: 10:00 ~ 22:00",
          "금요일: 10:00 ~ 22:00",
          "토요일: 11:00 ~ 20:00",
        ],
        breakTime: null,
        link: "https://map.naver.com/v5/search/슬기카페",
      },
      {
        id: 2,
        name: "하월곡 분식",
        subcategory: "snack",
        distanceText: "도보 3분",
        rating: 4.2,
        bookmarked: false,
        congestion: "medium",
        address: "서울 성북구 장위로 45",
        periods: [{ start: "11:00", end: "21:00" }],
        businessHours: [
          "월~금 10:00 - 22:00",
          "토요일 10:00 - 20:00",
          "일요일 휴무",
        ],
        breakTime: null,
        link: "https://map.naver.com/v5/search/하월곡분식",
      },
      {
        id: 3,
        name: "도쿄라멘",
        subcategory: "japanese",
        distanceText: "도보 3분",
        rating: 4.9,
        bookmarked: true,
        congestion: "high",
        address: "서울 성북구 화랑로 110",
        periods: [
          { start: "11:30", end: "15:30" },
          { start: "17:00", end: "21:00" }, // 브레이크 O
        ],
        businessHours: [
          "월~금 10:00 - 22:00",
          "토요일 10:00 - 20:00",
          "일요일 휴무",
        ],
        breakTime: "15:30 ~ 17:00",
        link: "https://map.naver.com/v5/search/도쿄라멘",
      },
      {
        id: 4,
        name: "행복은 간장밥 동덕여대점",
        subcategory: "snack",
        distanceText: "도보 5분",
        rating: 5.0,
        bookmarked: true,
        congestion: "high",
        address: "서울 성북구 동소문동 3길 21",
        periods: [{ start: "11:30", end: "15:30" }], // 요청사항: 점심만
        businessHours: [
          "월~금 10:00 - 22:00",
          "토요일 10:00 - 20:00",
          "일요일 휴무",
        ],
        breakTime: null,
        link: "https://map.naver.com/v5/search/행복은간장밥",
      },
    ];
    setDataList(mock);
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const token = localStorage.getItem("token");

  //       //음식점별 조회 api
  //       let url = `http://localhost:8000/stores/?category=${mainCategory}`;
  //       // 음식 카테고리별 조회
  //       if (mainCategory === "restaurant" && subCategory !== "전체") {
  //         url += `&subcategory=${subCategory}`;
  //       }
  //       // 즐겨찾기한 가게만 필터링
  //       if (isActive) {
  //         url += `&bookmarked=true`;
  //       }

  //       // 정렬
  //       const ordering = getOrdering();
  //       if (ordering) {
  //         url += `&ordering=${ordering}`;
  //       }

  //       try {
  //         const res = await axios.get(url, {
  //           headers: { Authorization: `Token ${token}` },
  //         });
  //         //가까운순
  //         let fetchedData = res.data;

  //         const ordering = getOrdering();
  //         if (ordering === "distance") {
  //           fetchedData = [...fetchedData].sort(
  //             (a, b) => a.latitude - b.latitude
  //           ); // 가까운순
  //         }

  //         setDataList(fetchedData);
  //       } catch (err) {
  //         console.error("가게 데이터 불러오기 실패:", err);
  //         setError("데이터를 불러오지 못했습니다.");
  //       }
  //     };

  //     fetchData();
  //   }, [mainCategory, subCategory, isActive, sortText]);
  const topBoxRef = useRef(null);
  useEffect(() => {
    if (topBoxRef.current)
      topBoxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
    <>
      <S.SearchBox>
        <S.Input
          type="text"
          placeholder="가게 검색"
          value={search}
          onChange={onChange}
        />

        <S.SearchBtn src="/images/Search.svg" alt="Search" />
      </S.SearchBox>
      <S.LocationImg>
        <img
          src={`${process.env.PUBLIC_URL}/images/mapLocation.svg`}
          alt="location"
          width="18px"
        />
      </S.LocationImg>
      <S.LocationText>성북구 하월곡동</S.LocationText>
      <S.TopBox ref={topBoxRef}>
        {" "}
        <S.IconBox
          onClick={() => handleCategoryClick("전체")}
          className={subCategory === "전체" ? "active" : ""}
        >
          <S.TopIcon className="Home">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/House.svg`}
              alt="Home"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="HomeTxt"> 홈 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("cake")}
          className={subCategory === "cake" ? "active" : ""}
        >
          <S.TopIcon className="cake">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/cake.svg`}
              alt="cake"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="cakeText"> 카페/디저트 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("korean")}
          className={subCategory === "korean" ? "active" : ""}
        >
          <S.TopIcon className="Kfood">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/KFood.svg`}
              alt="Kfood"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="KFoodTxt"> 한식 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("chinese")}
          className={subCategory === "chinese" ? "active" : ""}
        >
          <S.TopIcon className="cfood">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/cfood.svg`}
              alt="cfood"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="cfoodText"> 중식 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("japanese")}
          className={subCategory === "japanese" ? "active" : ""}
        >
          <S.TopIcon className="JFood">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/sushi.svg`}
              alt="JFood"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="JFoodTxt"> 일식 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("fastfood")}
          className={subCategory === "fastfood" ? "active" : ""}
        >
          <S.TopIcon className="FastFood">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/hamberger.svg`}
              alt="FastFood"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="FastFoodTxt"> 패스트푸드 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("snack")}
          className={subCategory === "snack" ? "active" : ""}
        >
          <S.TopIcon className="SnackFood">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/bunsik.svg`}
              alt="SnackFood"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="SnackFoodTxt"> 분식 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("salad")}
          className={subCategory === "salad" ? "active" : ""}
        >
          <S.TopIcon className="Salad">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/salad.svg`}
              alt="Salad"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="SaladTxt"> 건강식 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("pasta")}
          className={subCategory === "pasta" ? "active" : ""}
        >
          <S.TopIcon className="pasta">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/pasta.svg`}
              alt="pasta"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="pastaTxt"> 양식 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("beef")}
          className={subCategory === "beef" ? "active" : ""}
        >
          <S.TopIcon className="beef">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/beef.svg`}
              alt="beef"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="beefTxt"> 고깃집 </S.TopIconText>
        </S.IconBox>
        <S.IconBox
          onClick={() => setSubCategory("beer")}
          className={subCategory === "beer" ? "active" : ""}
        >
          <S.TopIcon className="beer">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/images/Category/beer.svg`}
              alt="beer"
              width="40px"
            />
          </S.TopIcon>
          <S.TopIconText className="beerTxt"> 주점 </S.TopIconText>
        </S.IconBox>
      </S.TopBox>

      {/* 모달창으로 변경함 */}
      <S.BasicLayer onClick={toggleModal}>
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
          <S.ModalOverlay onClick={toggleModal} />

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

      {/* 버튼 누르면 색 변경 */}
      <S.Favorite isActive={isActive} onClick={on_Click}>
        <img
          src={`${process.env.PUBLIC_URL}/images/Filter/${
            isActive ? "heart_red.svg" : "heart_gray.svg"
          }`}
          alt="Favorite"
          width="14px"
          style={{ marginRight: "4px" }}
        />
        즐겨찾기 가게
      </S.Favorite>
      {/* 가게정보 보여주기 */}
      <S.ShopWrapper>
        {filteredData.map((e) => {
          const searchStatus = buildSearchStatus(e.periods);
          const detailStatus = buildDetailStatus(e.periods);

          const payload = { ...e, statusText: detailStatus }; // 상세에서 쓸 문구 포함
          // 새로고침 대비 (선택)
          // sessionStorage.setItem("lastShop", JSON.stringify(payload));

          return (
            <S.ShopInform
              key={e.id}
              onClick={() =>
                navigate(`/ShopDetail/${e.id}`, { state: payload })
              }
            >
              <S.LeftBox>
                <S.ShopImg
                  src={`/images/TestImg/${e.name}.png`}
                  width="55px"
                  alt={e.name}
                  style={{ marginRight: "16px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <S.ShopName>{e.name}</S.ShopName>

                  <S.ReviewText>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/star_yellow.svg`}
                      alt="Star"
                      width="18px"
                    />{" "}
                    {e.rating}/5.0
                  </S.ReviewText>

                  <S.DistanceText>{searchStatus}</S.DistanceText>
                </div>
              </S.LeftBox>

              <S.CongestionImg>
                <img
                  src={
                    e.congestion === "low"
                      ? "/images/Congestion/green_text.svg"
                      : e.congestion === "medium"
                      ? "/images/Congestion/yellow_text.svg"
                      : "/images/Congestion/red_text.svg"
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
