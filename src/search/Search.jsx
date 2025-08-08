import React from "react";
import * as S from "./StyledSearch";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar"

const Search = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavigationBar />

        </>
    );
}
export default Search;
