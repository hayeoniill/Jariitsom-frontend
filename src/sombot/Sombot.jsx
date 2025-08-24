import React, { useRef, useState, useEffect } from "react";
import * as SB from "./StyledSombot";
import NavigationBar from "../component/NavigationBar";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Sombot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const listRef = useRef(null);

  // 처음 실행 시 가이드 메시지 + 위치
  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await axios.get(`${API_URL}/recommend/guide/`);
        setMessages([
          { role: "ai", text: res.data.message },
          { role: "ai", text: `예시: ${res.data.examples}` },
        ]);
      } catch (err) {
        console.error("가이드 불러오기 실패:", err);
      }
    };

    // 위치 권한 요청
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("위치 가져오기 실패:", err);
        // 권한 거부 시 기본 좌표 (동덕여대)
        setCoords({
          lat: 37.606057124618324,
          lng: 127.0413645586438,
        });
      }
    );

    fetchGuide();
  }, []);

  // 메시지 전송
  const send = async () => {
    const text = input.trim();
    if (!text) return;

    // 유저 메시지 추가
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    try {
      const res = await axios.post(
        `${API_URL}/recommend/`,
        { message: text },
        {
          params: {
            lat: coords.lat,
            lng: coords.lng,
          },
        }
      );

      console.log("추천 API 응답:", res.data);

      // AI 메시지들 구성
      const newMessages = [{ role: "ai", text: res.data.chat_message }];

      // link_message + link_url 있으면 추가
      if (res.data.link_message && res.data.link_url) {
        newMessages.push({
          role: "ai",
          text: (
            <span>
              {res.data.link_message}{" "}
              <a
                href={res.data.link_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                바로가기
              </a>
            </span>
          ),
        });
      }

      setMessages((prev) => [...prev, ...newMessages]);
    } catch (err) {
      console.error("추천 API 호출 실패:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "추천을 불러오는 중 오류가 발생했어요." },
      ]);
    }
  };

  // 엔터 입력 처리
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // 자동 스크롤
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <SB.SombotWrapper>
        <SB.Background
          src={`${process.env.PUBLIC_URL}/images/logo/sombot_dot.svg`}
        />

        <SB.TopBox>
          <SB.MainTxt>솜봇이 추천해주겠솜!</SB.MainTxt>
        </SB.TopBox>
        <SB.Bar />

        {/* 채팅창 */}
        <SB.ChatContainer ref={listRef}>
          {messages.map((m, i) =>
            m.role === "user" ? (
              <SB.Row key={i} $side="right">
                <SB.UserBubble>{m.text}</SB.UserBubble>
              </SB.Row>
            ) : (
              <SB.Row key={i} $side="left">
                <SB.AIBubble>{m.text}</SB.AIBubble>
              </SB.Row>
            )
          )}
        </SB.ChatContainer>

        {/* 입력창 */}
        <SB.MessageInputWrapper>
          <SB.MessageBar
            placeholder="솜봇에게 물어보세요!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <SB.SendImg
            src={`${process.env.PUBLIC_URL}/images/send.svg`}
            alt="send"
            onClick={send}
          />
        </SB.MessageInputWrapper>
      </SB.SombotWrapper>

      <SB.NavigationBarWrapper>
        <NavigationBar />
      </SB.NavigationBarWrapper>
    </>
  );
};

export default Sombot;
