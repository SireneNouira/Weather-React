import React from "react";
import logo from "../assets/logo.png";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;
