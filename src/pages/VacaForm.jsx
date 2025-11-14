import React from "react";
import "./pages.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterCow from "../components/vacas/RegisterCow";

function VacaForm() {
  return (
    <div id="container" className="container-xll">
      <Header />
      <main className="container-sm my-5">
        <RegisterCow />
      </main>
      <Footer />
    </div>
  );
}

export default VacaForm;
