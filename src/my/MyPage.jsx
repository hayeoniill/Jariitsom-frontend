import React, { useState, useEffect } from "react";
import * as MP from "./StyledMyPage";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import Logout from "./Logout";
import Leave from "./Leave";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();

  //api주소
  const API_URL = process.env.REACT_APP_API_URL;

  const [Logoutopen, setLogoutOpen] = useState(false);
  const [LeaveOpen, setLeaveOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // 닉네임 수정
  const [editing, setEditing] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get(`${API_URL}/rest-auth/user/`, {
          headers: { Authorization: `Token ${token}` },
        });

        setUserInfo(res.data);
        setNewNickname(res.data.first_name); // 기존 닉네임
      } catch (err) {
        console.error("마이페이지 불러오기 실패:", err);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // 닉네임 저장 요청
  const handleSaveNickname = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_URL}/rest-auth/user/`,
        { first_name: newNickname },
        { headers: { Authorization: `Token ${token}` } }
      );

      setUserInfo(res.data); // 성공 시 업데이트
      setEditing(false); // 수정 모드 종료
      alert("닉네임이 변경되었습니다!");
    } catch (err) {
      console.error("닉네임 변경 실패:", err.response?.data);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  // 로그인 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_URL}/rest-auth/user/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error(
          "마이페이지 불러오기 실패:",
          error.response?.data || error
        );
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <>
      <MP.Title>마이페이지</MP.Title>
      <MP.profileBox>
        <MP.profilePic src={`${process.env.PUBLIC_URL}/images/Logo/logoSom.svg`} />
      </MP.profileBox>

      <MP.NameTitle>닉네임</MP.NameTitle>
      {editing ? (
        <>
          <MP.NameInput
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <MP.EditBtn onClick={handleSaveNickname}>완료</MP.EditBtn>
        </>
      ) : (
        <>
          <MP.NameBar>{userInfo?.first_name || ""}</MP.NameBar>
          <MP.EditBtn onClick={() => setEditing(true)}>수정</MP.EditBtn>
        </>
      )}

      <MP.NavFavorite onClick={() => navigate("/favoriteShop")}>
        즐겨찾기 가게
      </MP.NavFavorite>

      {/* 카카오 유저면 변경 버튼 숨김 */}
      {!userInfo?.is_kakao && (
        <MP.NavChange onClick={() => navigate("/Change")}>
          아이디/비밀번호 변경
        </MP.NavChange>
      )}

      <MP.NavLogout onClick={() => setLogoutOpen(true)}>로그아웃</MP.NavLogout>
      <MP.NavLeave onClick={() => setLeaveOpen(true)}>회원탈퇴</MP.NavLeave>

      <NavigationBar />

      {Logoutopen && (
        <Logout
          onClose={() => setLogoutOpen(false)}
          onConfirm={async () => {
            try {
              const token = localStorage.getItem("token");
              if (token) {
                await axios.post(`${API_URL}/rest-auth/logout/`, {
                  headers: { Authorization: `Token ${token}` },
                });
              }
              localStorage.removeItem("token");
              navigate("/Login");
            } catch (err) {
              console.error("로그아웃 실패:", err.response?.data || err);

              localStorage.removeItem("token");
              navigate("/Login");
            }
          }}
        />
      )}

      {LeaveOpen && (
        <Leave
          onClose={() => setLeaveOpen(false)}
          onConfirm={async () => {
            try {
              const token = localStorage.getItem("token");
              if (token) {
                await axios.delete(`${API_URL}/account/`, {
                  headers: { Authorization: `Token ${token}` },
                });
              }
              alert("회원탈퇴가 완료되었습니다.");
            } catch (err) {
              console.error("회원탈퇴 실패:", err.response?.data || err);
              alert("회원탈퇴 중 오류가 발생했습니다.");
            } finally {
              localStorage.removeItem("token");
              navigate("/Login");
            }
          }}
        />
      )}
    </>
  );
};

export default MyPage;
