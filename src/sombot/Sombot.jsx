import React from "react";
import * as SB from "./StyledSombot";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar"

const Sombot = () => {
    const navigate = useNavigate();
    return (
        <>
            <SB.Background src="/images/logo/sombot_dot.svg" />
            <SB.BackBtn src="/images/backBtn.svg" alt="뒤로가기" />
            <SB.MainTxt>솜봇이 추천해주겠솜!</SB.MainTxt>
            <SB.Bar></SB.Bar>
            <SB.MessageBar placeholder="솜봇에게 물어보세요!" />
            <SB.SendImg src="/images/send.svg" />
            <NavigationBar />
        </>
    );
}
export default Sombot;
