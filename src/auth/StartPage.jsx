import React, { useEffect } from "react";
import * as SP from "./StyledStartPage";
import { useNavigate } from "react-router-dom";

function StartPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <SP.Container>
            <SP.Box>
                <SP.LogoImg src="/images/Logo/logoSom.svg" alt="logo" />
                <SP.LogoTxt src="/images/Logo/logoText.svg" alt="logo" />
            </SP.Box>
        </SP.Container>
    );
}
export default StartPage;
