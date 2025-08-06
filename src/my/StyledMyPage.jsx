import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background: #f0f0f0f0;
  position: relative;
`;

export const Box = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #fff;
  display: flex;
  flex-direction: column;
  cursor:default;
`;

export const Title = styled.div`
  color:  #8B2842;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  margin-top:60px;
  margin-left:143px;
`;

export const profileBox = styled.div`
  margin-top:30px;  
  margin-left:135px;
  width: 120px;
  height: 120px;
  border: 1.5px solid #8B2842;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const profilePic = styled.img`
  width: 64px;
  height: 72px;
  flex-shrink: 0;
`;

export const NameTitle = styled.div`
  color:  #8B2842;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top:54px;
  margin-left:25px;
`;
export const EditBtn = styled.button`
  display: flex;
  width: 50px;
  height: 26px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 5px;
  background:  #F2F4F6;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  border:none;
  position: absolute;
  top:350px;
  right:30px;
`
export const NameBar = styled.div`
  margin-left:25px;
  margin-top:20px;
  width: 342px;
  height: 20px;
  border-bottom: 1.5px solid #8B2842;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom:10px;
  margin-bottom:60px;
`;

export const NavTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left:25px;
  margin-bottom:20px;
  cursor:pointer;
`

export const NavFavorite = NavTitle;
export const NavChange = NavTitle;
export const NavLogout = NavTitle;
export const NavLeave = NavTitle;

