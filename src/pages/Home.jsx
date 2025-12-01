import React, { useEffect } from "react";
import "./pages.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cows from "../components/vacas/Cows";
import "../components/vacas/vacas.css";

function Home() {
  return (
    <div id="container" className="container-xll">
      <Header />
      <main
        className="container-sm my-5 text-center"
        style={{ height: "60vh" }}
      >
        <h1>
          Bienvenido <strong>administrador</strong>!
        </h1>
        <div>
          <Cows />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
