import React from "react";
import logo from "../assets/logo-header.png";
import Navbar from "./Navbar";

function Header() {
  return (
    <div className="bg-light border-bottom">
      <header className="container-sm d-flex align-items-center justify-content-between aling-items-center p-4 flex-wrap gap-3">
        <img
          src={logo}
          alt="logo"
          width={120}
          className="img-fluid flex-shrink-0"
        />
        <div className="ms-auto flex-grow-0">
          <Navbar />
        </div>
      </header>
    </div>
  );
}

export default Header;
