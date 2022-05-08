import './App.css';
import Footer from "./components/fragments/Footer";
import Navigation from "./components/fragments/Navigation";
import MainPage from "./components/other/MainPage";
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import React from "react";
import Kontakt from "./components/other/Kontakt";
import Login from "./components/other/Login";
import Register from "./components/other/Register";

function App() {
  return (
      <BrowserRouter>

              <Navigation/>
              <Routes>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/kontakt" element={<Kontakt/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
              </Routes>
              <Footer/>

      </BrowserRouter>
  );
}

export default App;
