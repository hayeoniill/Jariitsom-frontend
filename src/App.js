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
import FavoriteShop from "./my/favoriteShop";
import Leave from "./my/Leave";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join1 />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Sombot" element={<Sombot />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/FavoriteShop" element={<FavoriteShop />} />
        <Route path="/Leave" element={<Leave />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
