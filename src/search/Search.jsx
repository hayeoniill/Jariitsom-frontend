import React, { useState, useEffect } from "react";
import * as S from "./StyledSearch";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import { useLocation } from "react-router-dom";
// import axios from "axios";

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
  const [subCategory, setSubCategory] = useState(location.state?.subCategory || "전체");
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

  //더미데이터
  useEffect(() => {
    // TODO: 백엔드 붙으면 이 블록 삭제하고 fetch/axios 해제
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
        congestion: "medium",
      },
      {
        id: 3,
        name: "도쿄라멘",
        subcategory: "japanese",
        lat: 37.5672,
        lng: 126.976,
        rating: 4.9,
        bookmarked: true,
        congestion: "high",
      },
      {
        id: 4,
        name: "도쿄라멘",
        subcategory: "japanese",
        lat: 37.5672,
        lng: 126.976,
        rating: 4.9,
        bookmarked: true,
        congestion: "high",
      },
      {
        id: 5,
        name: "도쿄라멘",
        subcategory: "japanese",
        lat: 37.5672,
        lng: 126.976,
        rating: 4.9,
        bookmarked: true,
        congestion: "high",
      },
      {
        id: 6,
        name: "도쿄라멘",
        subcategory: "japanese",
        lat: 37.5672,
        lng: 126.976,
        rating: 4.9,
        bookmarked: true,
        congestion: "high",
      },
      {
        id: 7,
        name: "도쿄라멘",
        subcategory: "japanese",
        lat: 37.5672,
        lng: 126.976,
        rating: 4.9,
        bookmarked: true,
        congestion: "high",
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
    if (topBoxRef.current) topBoxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <S.TopBox ref={topBoxRef}>        <S.IconBox
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
          src={`${process.env.PUBLIC_URL}/images/Filter/${isActive ? "heart_red.svg" : "heart_gray.svg"
            }`}
          alt="Favorite"
          width="14px"
          style={{ marginRight: "4px" }}
        />
        즐겨찾기 가게
      </S.Favorite>
      {/* 가게정보 보여주기 */}
      <S.ShopWrapper>
        {filteredData.map(
          (e) => (
            console.log("shop정보:", e),
            (
              <S.ShopInform
                key={e.id}
                onClick={() =>
                  navigate(`/ShopDetail/${e.id}`, { state: { shop: e } })
                }
              >
                <S.LeftBox>
                  <S.ShopImg
                    src={`http://localhost:8000/store_photo/${e.name}.png`}
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
                    <S.DistanceText>
                      {/* <img
                          style={{ paddingRight: "2px" }}
                          src={`${process.env.PUBLIC_URL}/images/Distance.svg`}
                          alt="Distance"
                          width="13px"
                        /> */}
                      {e.latitude}오늘 휴무 •{" "}
                      <S.Minute>도보{e.longitude}분</S.Minute>
                    </S.DistanceText>
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
            )
          )
        )}
      </S.ShopWrapper>
      <NavigationBar />

    </>

  );
};

export default Search;
