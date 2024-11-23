import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PLaceOrder from "./pages/PLaceOrder/PLaceOrder";
import Footer from "./components/Footer/Footer";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import LoginPopup from "./components/LoginPopup/LoginPopup";
const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  return (
    <>
    {
      showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>
    }
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PLaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
      
    </div>
    <Footer/>
    </>
  );
};

export default App;
