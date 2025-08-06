import React from "react";
import * as S from "./StyledSearch";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar"

function Search() {
    const navigate = useNavigate();
    return (
        <S.Container>
            <S.Box>
                <NavigationBar />

            </S.Box>
        </S.Container>
    );
}
export default Search;
