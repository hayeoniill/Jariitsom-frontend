import React from "react";
import * as M from "./StyledMap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar"

const Map = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavigationBar />

        </>
    );
};

export default Map;
