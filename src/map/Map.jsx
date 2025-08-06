import React from "react";
import * as M from "./StyledMap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar"

function Map() {
    const navigate = useNavigate();
    return (
        <M.Container>
            <M.Box>
                <NavigationBar />

            </M.Box>
        </M.Container>
    );
}
export default Map;
