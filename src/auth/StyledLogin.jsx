import styled from "styled-components";

export const Logo = styled.img`
    margin-left:163px;
    margin-top:137px;
    width: 65px;
`

export const InputId = styled.input`
    box-sizing: border-box;
    margin-top:38px;
    width: 342px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 25px;
    border: 1.5px solid  #8B2842;
    background: #FFF;
    color: #8B2842;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-left:20px;
    outline: none;
    margin-left:24px;

    &::placeholder {
    color: #8B2842;
    opacity: 1.5; 
    }
`

export const InputPw = styled.input`
    box-sizing: border-box;
    margin-top:20px;
    width: 342px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 25px;
    border: 1.5px solid  #8B2842;
    background: #FFF;
    color: #8B2842;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-left:20px;
    outline: none;
    margin-left:24px;

    &::placeholder {
    color: #8B2842;
    opacity: 1.5; 
    }
`
export const LoginBtn = styled.button`
    margin-top:25px;
    border:none;
    width: 342px;
    height: 50px;
    border-radius: 25px;
    background:#8B2842;
    box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.25);
    color: #FFF;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-left:24px;
      &:hover {
    opacity: 80%;
  }
`
export const Bar = styled.div`
    width: 342px;
    height: 1.5px;
    background:#8B2842;
    margin-top:55px;
    margin-left:24px;

`

export const GoKakaoBtn = styled.button`
    margin-top:55px;
    width: 342px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 25px;
    border: 1.5px solid  #8B2842;
    background: #FFF;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.25);
    color: var(--Main, #8B2842);
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-left:24px;
  &:hover {
    opacity: 80%;
  }
`
export const GoJoinBtn = styled.button`
    margin-top:20px;
    width: 342px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 25px;
    border: 1.5px solid  #8B2842;
    background: #FFF;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.25);
    color: var(--Main, #8B2842);
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-left:24px;
  &:hover {
    opacity: 80%;
  }
`