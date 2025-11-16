import { useState, useEffect } from "react";
import CowCard from "./CowCard";

function Cows() {
  const [cowData, setCowData] = useState([]);
  const [loadingCow, setLoadingCow] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  const [filterData, setFilterData] = useState({
    diio: "",
    genre: "",
    cowState: true,
  });
  const [searchButton, setSearchButton] = useState(0);
  // Estado para mostrar el estado de la vaca (activa/eliminada)
  const [viewCowState, setViewCowState] = useState(true);

  const handleRetry = () => {
    setError(null);
    setRetry((prev) => prev + 1);
  };

  // DELETE vaca
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta vaca?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/vacas/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al eliminar la vaca");
      }
      alert("Vaca eliminada correctamente");
      setRetry((prev) => prev + 1);
    } catch (err) {
      console.error("Error al eliminar la vaca:", err);
      alert("No se pudo eliminar la vaca: " + err.message);
    }
  };

  // GET vacas (con filtros)
  useEffect(() => {
    const fetchCowData = async () => {
      try {
        setLoadingCow(true);
        setError(null);

        let url = filterData.cowState
          ? "http://localhost:3000/vacas"
          : "http://localhost:3000/vacas/desactivadas";

        const params = new URLSearchParams();

        if (filterData.diio.trim() !== "") {
          params.append("diio", filterData.diio.trim());
        }
        if (filterData.genre !== "") {
          params.append("genre", filterData.genre);
        }

        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Error al obtener las vacas");
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setCowData(data);
        } else {
          setCowData([]);
        }
      } catch (error) {
        setCowData([]); // vacío si hay error
        setError(error.message);
        console.error("Error en obtener los datos de la vaca: ", error);
      } finally {
        setLoadingCow(false);
      }
    };

    fetchCowData();
  }, [retry, searchButton]);

  console.log(filterData);

  const handleSearchClick = () => {
    setViewCowState(filterData.cowState);
    setSearchButton((prev) => prev + 1);
  };

  const handleClearFilters = () => {
    setFilterData({ diio: "", genre: "", cowState: true });
    setSearchButton((prev) => prev + 1);
  };

  return (
    <div className="mt-3 containerFilterAndCows">
      {/* FILTRO */}
      <div className="containerFilter">
        <h5 className="fw-bold mb-2">Filtrar Vaca</h5>
        {/* DIIO */}
        <div className="w-100">
          <label htmlFor="diio" className="form-label fw-bold">
            DIIO
          </label>
          <input
            id="diio"
            className="w-100"
            value={filterData.diio}
            type="text"
            placeholder="Buscar por DIIO"
            onChange={(e) =>
              setFilterData((prev) => ({ ...prev, diio: e.target.value }))
            }
            disabled={loadingCow}
          />
        </div>
        {/* Genero  */}
        <div className="w-100">
          <label htmlFor="genre" className="form-label fw-bold">
            Género
          </label>
          <select
            id="genre"
            className="w-100"
            value={filterData.genre}
            onChange={(e) =>
              setFilterData((prev) => ({ ...prev, genre: e.target.value }))
            }
            disabled={loadingCow}
          >
            <option value="">Seleccionar Género</option>
            <option value="M">Macho</option>
            <option value="F">Hembra</option>
          </select>
        </div>
        {/* Activos */}
        <div className="w-100">
          <label htmlFor="cowState" className="form-label fw-bold">
            Estado de la Vaca
          </label>
          <select
            id="cowState"
            className="w-100"
            value={String(filterData.cowState)} // "true" o "false"
            onChange={(e) =>
              setFilterData((prev) => ({
                ...prev,
                cowState: e.target.value === "true", // lo vuelve boolean
              }))
            }
          >
            <option value={true}>Activos</option>
            <option value={false}>Eliminados</option>
          </select>
        </div>

        <div className="d-flex gap-2 mt-2 w-100 justify-content-end">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleClearFilters}
            disabled={loadingCow}
          >
            Limpiar
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearchClick}
            disabled={loadingCow}
          >
            Buscar
          </button>
        </div>

        {/* Botón reintentar solo si hubo error de servidor */}
        {error && (
          <button
            className="btn btn-link mt-2 p-0"
            type="button"
            onClick={handleRetry}
          >
            Reintentar carga
          </button>
        )}
      </div>

      {/* LISTADO / MENSAJES A LA DERECHA */}
      <div className="contenedorVacas">
        {loadingCow && (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <p className="h1 mt-5 mb-0">Cargando datos de las vacas...</p>
          </div>
        )}

        {!loadingCow && error && (
          <div className="alert alert-warning w-100 text-center">{error}</div>
        )}

        {!loadingCow && !error && cowData.length === 0 && (
          <div className="alert alert-info w-100 text-center">
            No hay vacas registradas.
          </div>
        )}

        {!loadingCow && !error && cowData.length > 0 && (
          <div className="w-100 d-flex flex-column align-items-center gap-2">
            <h3>{viewCowState ? "Vacas activas" : "Vacas eliminadas"}</h3>
            <h5>Vacas: {cowData.length}</h5>
            {cowData.map((cow) => (
              <div
                key={cow._id}
                className="w-100 d-flex justify-content-center"
              >
                <CowCard cowDetail={cow} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cows;
