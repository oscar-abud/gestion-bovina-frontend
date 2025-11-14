import React from "react";
import "./pages.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <div id="container" className="container-xll">
      <Header />
      <main
        className="container-sm text-center d-grid align-items-center"
        style={{ height: "75vh" }}
      >
        <h1 className="text-primary display-1">
          <strong>404 - Página no encontrada</strong>
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
