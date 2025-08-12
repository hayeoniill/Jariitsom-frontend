import React, { useRef, useState, useEffect } from "react";
import * as SB from "./StyledSombot";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";

const Sombot = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "ai", text: "안녕하세요! 솜봇이에요. 무엇을 도와드릴까요?" },
    ]);

    const listRef = useRef(null);

    const send = () => {
        const text = input.trim();
        if (!text) return;

        // 1) 유저 메시지 추가
        setMessages((prev) => [...prev, { role: "user", text }]);
        setInput("");

        // 2) AI 답장 (임시)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: `“${text}” 라는 질문 잘 받았어요! (임시 응답)`,
                },
            ]);
        }, 450);
    };

    // 앤터 전송
    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault?.();
            send();
        }
    };

    // 자동스크롤
    useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages]);

    return (
        <>
            <SB.SombotWrapper>
                <SB.Background src="/images/logo/sombot_dot.svg" />

                <SB.TopBox>
                    <SB.MainTxt>솜봇이 추천해주겠솜!</SB.MainTxt>
                </SB.TopBox>

                <SB.Bar />

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

                <SB.MessageInputWrapper>
                    <SB.MessageBar
                        placeholder="솜봇에게 물어보세요!"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                    <SB.SendImg
                        src="/images/send.svg"
                        alt="send"
                        onClick={send}
                        aria-label="send"
                    />
                </SB.MessageInputWrapper>
            </SB.SombotWrapper>

            <NavigationBar />
        </>
    );
};

export default Sombot;
