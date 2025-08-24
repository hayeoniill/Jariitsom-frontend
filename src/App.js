// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./auth/StartPage";
import Login from "./auth/Login";
import Join1 from "./auth/Join";
import Home from "./home/Home";
import Search from "./search/Search";
import Sombot from "./sombot/Sombot";
import Map from "./map/Map";
import MyPage from "./my/MyPage";
import FavoriteShop from "./my/FavoriteShop";
import Leave from "./my/Leave";
import Layout from "./component/Layout";
import Change from "./my/Change";
import KakaoCallback from "./auth/KakaoCallback";
import ShopDetail from "./search/ShopDetail";
import SendCongestion from "./component/SendCongestion";
import InputCust from "./component/InputCust";
import KakaoLoginButton from "./auth/KakaoLoginButton";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Sombot" element={<Sombot />} />
          <Route path="/MapPage" element={<Map />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/FavoriteShop" element={<FavoriteShop />} />
          <Route path="/Leave" element={<Leave />} />
          <Route path="/" element={<StartPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/Join" element={<Join1 />} />
          <Route path="/Change" element={<Change />} />
          <Route path="/ShopDetail/:id" element={<ShopDetail />} />
          <Route path="/SendCongestion" element={<SendCongestion />} />
          <Route path="/InputCust" element={<InputCust />} />
          <Route path="/KakaoLoginButton" element={<KakaoLoginButton />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
