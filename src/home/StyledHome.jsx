import styled from "styled-components";

export const TopLogo = styled.img`
width: 50px;
height: 56px;
margin-left:170px;
margin-top:60px;
margin-bottom:10px;
`;

export const SearchBar = styled.div`
width:85%;
height:5%;
border-radius: 15px;
background: #F7F7F7;
margin-left:24px;
margin-top:15px;
color: #A5A5A5;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
padding-left:16px;
align-items: center;
display: flex;
box-sizing: border-box;
margin-bottom:15px;

`;
export const SearchImg = styled.img`
width: 18.534px;
height: 22px;
flex-shrink: 0;
margin-left:60px;
`;
export const IconBox = styled.div`
margin-top:15px;
flex-direction: row;
display:flex
`
export const CategoryContainer = styled.div`
margin-right:15px;
 &:hover {
    opacity: 60%;
  }
`;
export const CategoryBox = styled.div`
width: 50px;
height: 50px;
flex-shrink: 0;
border-radius: 15px;
background: #F7F7F7;
justify-content: center;
align-items: center;
display: flex;
margin-bottom:5px;
cursor:pointer;
`;
export const CategoryImg = styled.img``
export const CategoryTxt = styled.div`
color: #000;
font-family: Pretendard;
font-size: 11px;
font-style: normal;
font-weight: 400;
justify-content: center;
align-items: center;
display: flex;
`;

export const HomeTitle = styled.div`
color: #8B2842;
font-family: Pretendard;
font-size: 16px;
font-weight: 600;
margin-left:5px;
`;
export const FavoriteShopTitle = styled.div`
color: #8B2842;
font-family: Pretendard;
font-size: 16px;
font-weight: 600;
margin-left:25px;
margin-top:10px;
`;
export const plusBtn = styled.div`
color:  #8B2842;
font-family: Pretendard;
font-size: 13px;
font-weight: 600;
margin-left:140px;
cursor:pointer;
&:hover{
    opacity: 60%;
}
`;
export const TitleContainer = styled.div`
display: flex;
align-items: center;
height:30;
margin-top:30px;
`;
export const TitleBox = styled.div`
display: flex;
align-items: center;
height:30;
margin-top:20px;
`;
export const placeImg = styled.img`
width: 16px;
margin-left:25px;
`;
export const RecommendBox = styled.div`
  align-items: center;
display: flex;
margin-left:34px;
margin-top:10px;
`;
export const RecommendImg = styled.img`
width: 44.643px;
height: 50px;
margin-right: 10px;
`;

export const RecommendChat = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 14px 14px 14px 4px;
  background: #fff;
  border: 1.5px solid #8b2842;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(139, 40, 66, 0.08);
`