import { React, useState } from "react";
import * as MP from "./StyledMyPage";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import Logout from "./Logout";
import Leave from "./Leave";

const MyPage = () => {
  const navigate = useNavigate();

  const [Logoutopen, setLogoutOpen] = useState(false);
  const [LeaveOpen, setLeaveOpen] = useState(false);

  return (
    <>
      <MP.Title>마이페이지</MP.Title>
      <MP.profileBox>
        <MP.profilePic src="/images/Logo/logoSom.svg" />
      </MP.profileBox>
      <MP.NameTitle>닉네임</MP.NameTitle>
      <MP.NameBar>솜사탕</MP.NameBar>
      <MP.EditBtn>수정</MP.EditBtn>
      <MP.NavFavorite onClick={() => navigate("/favoriteShop")}>
        즐겨찾기 가게
      </MP.NavFavorite>
      <MP.NavChange onClick={() => navigate("/Change")}>
        아이디/비밀번호 변경
      </MP.NavChange>
      <MP.NavLogout onClick={() => setLogoutOpen(true)}>로그아웃</MP.NavLogout>
      <MP.NavLeave onClick={() => setLeaveOpen(true)}>회원탈퇴</MP.NavLeave>
      <NavigationBar />
      {Logoutopen && (
        <Logout
          onClose={() => setLogoutOpen(false)}
          onConfirm={() => navigate("/Login")}
        />
      )}

      {LeaveOpen && (
        <Leave
          onClose={() => setLeaveOpen(false)}
          onConfirm={() => navigate("/Login")}
        />
      )}
    </>
  );
};
export default MyPage;
