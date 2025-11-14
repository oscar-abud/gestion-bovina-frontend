import React from "react";
import vacaImagen from "../../../public/cow-svgrepo-com.svg";
import "./vacas.css";

function CowCard({ cowDetail, onDelete }) {
  const imgStyle = {
    maxWidth: "120px",
    borderRadius: "50%",
    border: "2px solid #d61719",
    padding: "5px",
  };

  const handleDeleteClick = () => {
    onDelete && onDelete(cowDetail._id);
  };

  return (
    <div className="card my-3 shadow-sm p-3 bg-body rounded cow-card">
      <div className="card-body d-flex flex-column flex-md-row align-items-center cow-card-container">
        {/* Imagen */}
        <div className="mb-3 mb-md-0 me-md-3 text-center text-md-start">
          <img src={vacaImagen} alt="vaca" style={imgStyle} />
        </div>

        {/* Contenido */}
        <div className="text-md-start w-100">
          <h5 className="card-title fw-bold">DIIO: {cowDetail.diio}</h5>
          <p className="card-text mb-1">
            <span className="fw-bold">Fecha: </span>
            {cowDetail.dateBirthday.slice(0, 10)}
          </p>
          <p className="card-text mb-1">
            <span className="fw-bold">Género: </span>
            {cowDetail.genre === "M" ? "Macho" : "Hembra"}
          </p>
          <p className="card-text mb-1">
            <span className="fw-bold">Raza: </span> {cowDetail.race}
          </p>
          <p className="card-text mb-1">
            <span className="fw-bold">Ubicación: </span> {cowDetail.location}
          </p>
          {cowDetail.sick && (
            <p className="card-text text-danger">
              <span className="fw-bold">Enfermedad: </span>
              {cowDetail.sick}
            </p>
          )}
        </div>
      </div>
      {/* Botones */}
      <div className="d-flex flex-column flex-md-row gap-2 mt-3 mt-md-0 ms-md-auto">
        <button className="btn btn-primary">Actualizar</button>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CowCard;
