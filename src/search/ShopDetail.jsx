import React, { useEffect, useState } from "react";
import NavigationBar from "../component/NavigationBar";
import * as S from "./StyledShopDetail";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SendCongestion from "../component/SendCongestion";
import InputCust from "../component/InputCust";
import axios from "axios";

const TABS = { CONGESTION: "congestion", INFO: "info", MENU: "menu" };

const ShopDetail = () => {
  const [activeTab, setActiveTab] = useState(TABS.CONGESTION);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(null);
  const [custInputList, setCustInputList] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  // 거리 시간
  const [shop, setShop] = useState(() => {
    if (location.state) {
      const s = location.state;
      return {
        ...s,
        businessHours: s.business_hours || [],
        walking_time: {
          front_gate: s.main_gate_walk_minutes
            ? `${s.main_gate_walk_minutes}분`
            : "정보 없음",
          back_gate: s.back_gate_walk_minutes
            ? `${s.back_gate_walk_minutes}분`
            : "정보 없음",
        },
      };
    }
    return null;
  });

  const [showAll, setShowAll] = useState(false);
  // 영업중 표시
  const [showAllHours, setShowAllHours] = useState(false);
  const today = new Date().getDay();

  // 영업시간
  const daysKor = ["일", "월", "화", "수", "목", "금", "토"];
  const todayKey = daysKor[new Date().getDay()];

  // 실시간 방문 현황 시간 계산하기
  const getTimeDiffText = (createdAt) => {
    const now = new Date();
    const date = new Date(createdAt);
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    // 하루 이상이면 날짜 표시
    if (diffHours >= 24) {
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeek = days[date.getDay()];
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}(${dayOfWeek})`;
    }

    // 하루 이내 → 상대 시간
    if (diffMinutes < 1) return "방금 전";
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    return `${diffHours}시간 전`;
  };

  const [forecast, setForecast] = useState([]);

  // 혼잡도 예측 가져오기
  useEffect(() => {
    if (!shop || !shop.id) return;

    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/stores/${shop.id}/forecast/?minutes=0,10,20,30,60`
        );
        if (res.data && res.data.items) {
          setForecast(res.data.items);
        }
      } catch (err) {
        console.error("혼잡도 예측 불러오기 실패:", err);
      }
    };

    fetchForecast();
  }, [shop]);

  //방문기록 조회
  useEffect(() => {
    if (!shop || !shop.id) return;

    const fetchVisitLogs = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/stores/${shop.id}/visitlogs/list/?expand=${showAll}&days=7`
        );

        if (res.data && res.data.groups) {
          // groups 안의 items를 flat하게 뽑아서 state에 저장
          const merged = res.data.groups.flatMap((group) =>
            group.items.map((item) => ({
              person: `${item.visit_count}명`,
              waitTime: item.wait_time,
              congestion:
                item.congestion === "low"
                  ? "여유"
                  : item.congestion === "medium"
                  ? "보통"
                  : "혼잡",
              createdAt: item.created_at,
              when: item.when, // API에서 내려준 '방금 전 / n분 전 / 날짜'
              dayLabel: item.day_label,
            }))
          );

          setCustInputList(merged);
        }
      } catch (err) {
        console.error("방문 기록 불러오기 실패:", err);
      }
    };

    fetchVisitLogs();
  }, [shop, showAll]); // shop 로드되거나 더보기 눌렀을 때

  // 즐겨찾기 상태
  const [isActive, setIsActive] = useState(false);

  // 현재 가게가 즐겨찾기인지 초기화
  useEffect(() => {
    if (!shop) return;

    const checkBookmark = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/stores/?bookmarked=true`, {
          headers: { Authorization: `Token ${token}` },
        });
        setIsActive(res.data.some((item) => item.id === shop.id));
      } catch (err) {
        console.error("즐겨찾기 상태 확인 실패:", err);
      }
    };

    checkBookmark();
  }, [shop]);

  const on_Click = async () => {
    if (!shop || !shop.id) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/stores/${shop.id}/bookmark/`,
        {},

        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (res.status === 201) setIsActive(true);
      else if (res.status === 200) setIsActive(false);
    } catch (err) {
      console.error("즐겨찾기 토글 실패:", err);
    }
  };

  // 새로고침 폴백
  useEffect(() => {
    if (!shop) {
      const saved = sessionStorage.getItem("lastShop");
      if (saved) setShop(JSON.parse(saved));
    }
  }, [shop]);

  // 특정가게 상세페이지 조화
  useEffect(() => {
    // 1) location.state로 넘어온 shop이 없을 경우 → API 호출
    if (!shop && id) {
      const fetchShop = async () => {
        try {
          {
            /*  const token = localStorage.getItem("token");*/
          }
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/stores/${id}/`,
            {
              /**  {
              headers: { Authorization: `Token ${token}` },
            } */
            }
          );

          // 서버 응답(JSON)
          const s = res.data;
          const mappedShop = {
            ...s,
            businessHours: s.business_hours || [],
            walking_time: {
              front_gate: s.main_gate_walk_minutes
                ? `${s.main_gate_walk_minutes}분`
                : "정보 없음",
              back_gate: s.back_gate_walk_minutes
                ? `${s.back_gate_walk_minutes}분`
                : "정보 없음",
            },
            link: s.kakao_url || null,
            statusText: s.is_open ? "영업중" : "영업종료",
            distanceText: s.user_distance
              ? `${s.user_distance}m`
              : "거리 정보 없음",
          };

          setShop(mappedShop);

          // 새로고침 대비
          sessionStorage.setItem("lastShop", JSON.stringify(mappedShop));
        } catch (err) {
          console.error("가게 상세 불러오기 실패:", err);
        }
      };
      fetchShop();
    }
  }, [id, shop]);

  const handleBack = () => navigate(-1);

  if (!shop) return null;

  const cLevel = shop?.congestion ?? "medium"; // low | medium | high
  const cLabel =
    cLevel === "low" ? "여유" : cLevel === "medium" ? "보통" : "혼잡";

  return (
    <S.Container>
      <S.Topbox>
        <S.IconButton type="button" onClick={handleBack} aria-label="뒤로가기">
          <img src={`${process.env.PUBLIC_URL}/images/backBtn.svg`} alt="" />
        </S.IconButton>

        <img src="/images/Logo/logoSom.svg" alt="서비스 로고" width="34" />

        <S.IconButton type="button" aria-label="즐겨찾기" onClick={on_Click}>
          <img
            src={isActive ? "/images/star.svg" : "/images/empty_star.svg"}
            alt="Favorite"
          />
        </S.IconButton>
      </S.Topbox>
      <S.ShopinfoWrap>
        <S.ShopTopInfoWrap>
          <S.ShopImage>
            <img
              src={
                shop.photo ||
                `${process.env.PUBLIC_URL}/images/TestImg/${shop.name}.png`
              }
              alt={`${shop.name} 대표 이미지`}
            />
          </S.ShopImage>

          <S.ShopInfo>
            <S.ShopName id="shop-heading">{shop.name}</S.ShopName>

            {shop.statusText && <S.ShopState>{shop.statusText}</S.ShopState>}

            <S.ShopWrap>
              <S.ShopStar aria-label={`별점 ${shop.rating}점 만점 5점`}>
                <img src="/images/star_yellow.svg" alt="" />
                {shop.rating}/5.0
              </S.ShopStar>

              {shop.distanceText && (
                <S.ShopDistance>
                  <img src="/images/mapIcon.svg" alt="" /> {shop.distanceText}
                </S.ShopDistance>
              )}
            </S.ShopWrap>
          </S.ShopInfo>
        </S.ShopTopInfoWrap>

        <S.ShopBodyInfo>
          <S.TabBtnWrap role="tablist" aria-label="가게 상세 탭">
            <S.TabButton
              role="tab"
              aria-selected={activeTab === TABS.CONGESTION}
              aria-controls="panel-congestion"
              onClick={() => setActiveTab(TABS.CONGESTION)}
            >
              혼잡도
            </S.TabButton>
            <S.TabButton
              role="tab"
              aria-selected={activeTab === TABS.INFO}
              aria-controls="panel-info"
              onClick={() => setActiveTab(TABS.INFO)}
            >
              가게 정보
            </S.TabButton>
            <S.TabButton
              role="tab"
              aria-selected={activeTab === TABS.MENU}
              aria-controls="panel-menu"
              onClick={() => setActiveTab(TABS.MENU)}
            >
              메뉴
            </S.TabButton>
          </S.TabBtnWrap>
          {/* 탭 패널들 */}
          {activeTab === TABS.CONGESTION && (
            <S.Panel id="panel-congestion" role="tabpanel">
              <S.SubWrap>
                <S.Subtitle>현재 예상 혼잡도</S.Subtitle>
                <S.CongestionBox $level={cLevel}>
                  <S.CongestionImg>
                    <img
                      src={
                        cLevel === "low"
                          ? "/images/Congestion/greenSom.svg"
                          : cLevel === "medium"
                          ? "/images/Congestion/yellowSom.svg"
                          : "/images/Congestion/redSom.svg"
                      }
                      alt="CongestionImg"
                      width="42px"
                    />
                  </S.CongestionImg>
                  <S.text>혼잡도</S.text>
                  <S.Ctext $level={cLevel}>{cLabel}</S.Ctext>
                </S.CongestionBox>
              </S.SubWrap>

              <S.SubWrap>
                <S.SubTitleWrap>
                  <S.Subtitle>미래 예상 혼잡도</S.Subtitle>
                  <S.Rsub>
                    ※ AI가 요일·시간대 기반으로 예측한 결과입니다.
                  </S.Rsub>
                </S.SubTitleWrap>
                <div
                  style={{ display: "flex", gap: "12px", marginTop: "10px" }}
                >
                  {forecast.length > 0 ? (
                    forecast
                      .filter((f) => f.minutes_ahead > 0) // 0분(현재)은 제외
                      .map((f, idx) => {
                        const label =
                          f.minutes_ahead === 10
                            ? "10분 후"
                            : f.minutes_ahead === 20
                            ? "20분 후"
                            : f.minutes_ahead === 30
                            ? "30분 후"
                            : f.minutes_ahead === 60
                            ? "1시간 후"
                            : `${f.minutes_ahead}분 후`;

                        return (
                          <S.FutureBox key={idx} $level={f.ai_level}>
                            <S.Ftext>{label}</S.Ftext>
                            <S.FutureCImg>
                              <img
                                src={
                                  f.ai_level === "low"
                                    ? "/images/Congestion/green_text.svg"
                                    : f.ai_level === "medium"
                                    ? "/images/Congestion/yellow_text.svg"
                                    : "/images/Congestion/red_text.svg"
                                }
                                alt="예상 혼잡도"
                                width="42px"
                              />
                            </S.FutureCImg>
                          </S.FutureBox>
                        );
                      })
                  ) : (
                    <p style={{ color: "#888" }}>
                      예측 데이터를 불러오지 못했습니다.
                    </p>
                  )}
                </div>
              </S.SubWrap>

              <S.SubWrap>
                <S.SubTitleWrap>
                  <S.Subtitle>실시간 방문 후기</S.Subtitle>
                  <S.PlusBtn onClick={() => setShowAll((prev) => !prev)}>
                    {showAll ? "X" : "더보기"}
                    {!showAll && <img src="/images/rightArrow.svg" alt="" />}
                  </S.PlusBtn>
                </S.SubTitleWrap>
                {/* 입력된 데이터 표시 */}
                {custInputList.length > 0 ? (
                  (showAll ? custInputList : custInputList.slice(0, 4)).map(
                    (data, index) => (
                      <S.realtimeBox key={index}>
                        <img
                          src="/images/people.svg"
                          style={{ width: "22.5px" }}
                          alt=""
                        />
                        <p>{data.person} 방문</p>{" "}
                        <img src="/images/dot.svg" alt="" />
                        <p>{data.waitTime}</p>{" "}
                        <img src="/images/dot.svg" alt="" />
                        <p>{data.congestion}</p>
                        <S.realText>
                          {getTimeDiffText(data.createdAt)}
                        </S.realText>
                      </S.realtimeBox>
                    )
                  )
                ) : (
                  <S.realtimeBox>아직 작성된 후기가 없습니다.</S.realtimeBox>
                )}

                {/* 작성하기 버튼 */}
                <SendCongestion
                  setShowModal={setShowModal}
                  custInputData={custInputList}
                />
              </S.SubWrap>
            </S.Panel>
          )}

          {/* 가게정보 */}
          {activeTab === TABS.INFO && (
            <S.Panel id="panel-info" role="tabpanel">
              <S.InforWrap>
                <S.adress>
                  <img src="/images/storeInfo/location_led.svg" alt="" />
                  <p>{shop.address}</p>
                  {/* 한줄띄어서 아래에 표시하기 */}
                  <p className="newline">
                    동덕여대 정문에서 {shop.walking_time?.front_gate}{" "}
                  </p>
                  <p className="newline">
                    동덕여대 후문에서 {shop.walking_time?.back_gate}
                  </p>
                </S.adress>
                <S.Time>
                  <img src="/images/storeInfo/time.svg" alt="" />

                  {!showAllHours ? (
                    <div className="status-wrap">
                      <p>
                        {shop?.businessHours?.[todayKey]?.open_close ??
                          "영업시간 정보 없음"}
                      </p>
                      {shop?.businessHours?.[todayKey]?.breaktime && (
                        <p>
                          브레이크타임: {shop.businessHours[todayKey].breaktime}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="hours-list">
                      {Object.entries(shop.businessHours).map(
                        ([day, time], idx) => (
                          <p key={idx}>
                            {day}: {time?.open_close ?? "정보 없음"}
                            {time?.breaktime &&
                              ` (브레이크타임: ${time.breaktime})`}
                          </p>
                        )
                      )}
                    </div>
                  )}

                  <img src="/images/storeInfo/drop_btn.svg" alt="" />
                </S.Time>

                <S.Link>
                  <img src="/images/storeInfo/link.svg" alt="link" />
                  <p>
                    더 궁금하다면? <br /> 여기서 찾아보세요
                  </p>
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "10px" }}
                  >
                    {shop.kakao_url && (
                      <S.LinkButton href={shop.kakao_url} target="_blank">
                        카카오맵
                      </S.LinkButton>
                    )}
                    {shop.google_url && (
                      <S.LinkButton href={shop.google_url} target="_blank">
                        구글맵
                      </S.LinkButton>
                    )}
                  </div>
                </S.Link>
              </S.InforWrap>
            </S.Panel>
          )}
          {/* 메뉴 */}
          {activeTab === TABS.MENU && (
            <S.Panel id="panel-menu" role="tabpanel">
              {shop.menus && shop.menus.length > 0 ? (
                <S.MenuList>
                  {shop.menus.map((menu, idx) => (
                    <S.MenuItem key={idx}>
                      <span className="name">{menu.name}</span>
                      <span className="price">{menu.price}</span>
                    </S.MenuItem>
                  ))}
                </S.MenuList>
              ) : (
                <p style={{ color: "#888", marginTop: "10px" }}>
                  메뉴 정보가 없습니다.
                </p>
              )}
            </S.Panel>
          )}
        </S.ShopBodyInfo>
      </S.ShopinfoWrap>
      {showModal === null && <NavigationBar />}
      {showModal === "cust" && (
        <InputCust
          storeId={shop.id}
          onClose={() => setShowModal(null)}
          setInputData={setCustInputList}
        />
      )}
    </S.Container>
  );
};

export default ShopDetail;
