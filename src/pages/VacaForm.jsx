import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./pages.css";
import RegisterCow from "../components/vacas/RegisterEditCow";

function VacaForm() {
  const { id } = useParams(); // undefined si es /crear
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const handleBack = () => {
    //volver a la página anterior
    navigate(-1);
  };

  return (
    <div id="container" className="container-xll">
      <main className="container-sm my-5">
        {/* Cabecera con flecha/X */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            type="button"
            className="btn btn-link text-decoration-none p-0"
            onClick={handleBack}
          >
            <span
              aria-hidden="true"
              style={{ fontSize: "3rem", fontWeight: "bold" }}
            >
              ←
            </span>
          </button>

          <h2 className="mb-0">
            {isEditMode ? "Editar vaca" : "Registrar vaca"}
          </h2>
        </div>

        <RegisterCow cowId={id} />
      </main>
    </div>
  );
}

export default VacaForm;
