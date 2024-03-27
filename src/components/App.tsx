import React from 'react';
import '../assets/scss/app.scss';
import {Header} from "./Header";
import {Home} from "../pages/Home";
import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "../pages/not-found-page/NotFoundPage";
import {Cart} from "../pages/Cart";

export const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
