import { React, useState } from "react";
import * as MP from "./StyledMyPage";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar"
import LogoutModal from "./Logout";
function MyPage() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    return (
        <MP.Container>
            <MP.Box>
                <MP.Title>마이페이지</MP.Title>
                <MP.profileBox>
                    <MP.profilePic src="/images/Logo/logoSom.svg" />
                </MP.profileBox>
                <MP.NameTitle>닉네임</MP.NameTitle>
                <MP.NameBar>솜사탕</MP.NameBar>
                <MP.EditBtn>수정</MP.EditBtn>
                <MP.NavFavorite onClick={() => navigate("/favoriteShop")}>즐겨찾기 가게</MP.NavFavorite>
                <MP.NavChange>아이디/비밀번호 변경</MP.NavChange>
                <MP.NavLogout onClick={() => setOpen(true)} >로그아웃</MP.NavLogout>
                <MP.NavLeave onClick={() => navigate("/Leave")}>회원탈퇴</MP.NavLeave>
                <NavigationBar />
                {open && (
                    <LogoutModal onClose={() => setOpen(false)} onConfirm={() => navigate("/Login")} />
                )}
            </MP.Box>
        </MP.Container >
    );
}
export default MyPage;