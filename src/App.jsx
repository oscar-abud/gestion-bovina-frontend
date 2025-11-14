import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VacaForm from "./pages/VacaForm";
import NotFound from "./pages/NotFound";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<VacaForm />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
