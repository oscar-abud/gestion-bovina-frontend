import React from "react";
import logo from "../assets/logo-footer.png";

function Footer() {
  return (
    <footer
      className="bg-success text-white w-100 d-flex justify-content-center align-items-center"
      style={{ minHeight: "30vh" }}
      id="footer"
    >
      <div className="container">
        <div className="row g-3 justify-content-evenly align-items-center text-center text-md-start">
          <div className="col-12 col-md-auto">
            <img
              src={logo}
              alt="imagen-footer"
              className="img-fluid"
              style={{ maxHeight: 280 }}
            />
          </div>
          <div className="col-12 col-md-auto">
            <h1
              className="fw-bold fs-2 m-0"
              style={{ textShadow: "0px 2px 5px rgba(255,255,255,0.8)" }}
            >
              Toda la magia del sur
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
