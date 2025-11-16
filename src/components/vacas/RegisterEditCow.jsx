import { useState, useEffect } from "react";

export default function RegisterCow({ cowId }) {
  // si hay cowId, estamos editando
  const isEditMode = Boolean(cowId);

  const [diio, setDiio] = useState(""); // Para mostrar en el mensaje de éxito

  const [values, setValues] = useState({
    diio: "",
    date: "",
    genre: "",
    race: "",
    location: "",
    enfermedades: "",
  });

  const [touched, setTouched] = useState({
    diio: false,
    date: false,
    genre: false,
    race: false,
    location: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false); // cargar datos al editar
  const [submitError, setSubmitError] = useState(null);

  // VALIDACIONES
  const errors = {
    diio:
      values.diio.trim() === ""
        ? "El DIIO es obligatorio"
        : isNaN(values.diio)
        ? "El DIIO debe contener solo números"
        : "",
    date: values.date.trim() === "" ? "La fecha es obligatoria" : "",
    genre: values.genre.trim() === "" ? "Debe seleccionar un género" : "",
    race: values.race.trim() === "" ? "La raza es obligatoria" : "",
    location:
      values.location.trim() === "" ? "La ubicación es obligatoria" : "",
  };

  const isValid = (field) => !errors[field];

  const fieldClass = (field) => {
    const show = touched[field] || submitted;
    if (!show) return "form-control";
    return isValid(field) ? "form-control is-valid" : "form-control is-invalid";
  };

  // Cargar datos de la vaca si estamos en modo edición
  useEffect(() => {
    const fetchCow = async () => {
      if (!isEditMode) return;

      try {
        setLoadingInitial(true);
        setSubmitError(null);

        const res = await fetch(`http://localhost:3000/vacas/${cowId}`);

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Error al obtener la vaca");
        }

        const cow = await res.json();

        setValues({
          diio: String(cow.diio ?? ""),
          date: cow.dateBirthday ? cow.dateBirthday.slice(0, 10) : "", // yyyy-mm-dd
          genre: cow.genre ?? "",
          race: cow.race ?? "",
          location: cow.location ?? "",
          enfermedades: cow.sick ?? "",
        });

        setDiio(String(cow.diio ?? ""));
      } catch (err) {
        console.error("Error al cargar la vaca:", err);
        setSubmitError(err.message);
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchCow();
  }, [cowId, isEditMode]);

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitError(null);

    if (
      !isValid("diio") ||
      !isValid("date") ||
      !isValid("genre") ||
      !isValid("race") ||
      !isValid("location")
    ) {
      return;
    }

    // armamos el payload como lo espera tu backend
    const payload = {
      diio: Number(values.diio),
      dateBirthday: values.date,
      genre: values.genre,
      race: values.race,
      location: values.location,
      sick: values.enfermedades || null,
    };

    try {
      const url = isEditMode
        ? `http://localhost:3000/vacas/${cowId}`
        : "http://localhost:3000/vacas";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al guardar la vaca");
      }

      console.log(
        isEditMode ? "✅ Vaca actualizada:" : "✅ Vaca registrada:",
        payload
      );

      setDiio(values.diio);
      setShowSuccess(true);

      if (!isEditMode) {
        // Solo limpiamos el formulario en modo crear
        setValues({
          diio: "",
          date: "",
          genre: "",
          race: "",
          location: "",
          enfermedades: "",
        });
        setTouched({
          diio: false,
          date: false,
          genre: false,
          race: false,
          location: false,
        });
        setSubmitted(false);
      }
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setSubmitError(err.message);
    }
  };

  return (
    <main className="container py-4">
      <h1 className="mb-3">
        {isEditMode ? "Editando Vaca" : "Registrando Vaca"}
      </h1>

      {loadingInitial ? (
        <p>Cargando datos de la vaca...</p>
      ) : (
        <>
          {submitError && (
            <div className="alert alert-danger" role="alert">
              {submitError}
            </div>
          )}

          <form
            className="border border-1 rounded-1 shadow-sm p-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <p className="text-muted mb-4">
              <strong className="text-danger">
                El * significa obligatorio
              </strong>
            </p>

            {/* DIIO */}
            <div className="mb-3">
              <label htmlFor="diio" className="form-label">
                * DIIO:
              </label>
              <input
                type="text"
                id="diio"
                name="diio"
                placeholder="Solo números"
                className={fieldClass("diio")}
                value={values.diio}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isEditMode}
              />
              {(touched.diio || submitted) && errors.diio && (
                <div className="invalid-feedback">{errors.diio}</div>
              )}
            </div>

            {/* Fecha */}
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                * Fecha de Nacimiento:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className={fieldClass("date")}
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {(touched.date || submitted) && errors.date && (
                <div className="invalid-feedback">{errors.date}</div>
              )}
            </div>

            {/* Género */}
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                * Género:
              </label>
              <select
                id="genre"
                name="genre"
                className={fieldClass("genre")}
                value={values.genre}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccione género</option>
                <option value="M">Macho</option>
                <option value="F">Hembra</option>
              </select>
              {(touched.genre || submitted) && errors.genre && (
                <div className="invalid-feedback">{errors.genre}</div>
              )}
            </div>

            {/* Raza */}
            <div className="mb-3">
              <label htmlFor="race" className="form-label">
                * Raza:
              </label>
              <input
                type="text"
                id="race"
                name="race"
                placeholder="Ingrese la raza de la vaca"
                className={fieldClass("race")}
                value={values.race}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {(touched.race || submitted) && errors.race && (
                <div className="invalid-feedback">{errors.race}</div>
              )}
            </div>

            {/* Ubicación */}
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                * Ubicación:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Ingrese ubicación de la vaca"
                className={fieldClass("location")}
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {(touched.location || submitted) && errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>

            {/* Enfermedades */}
            <div className="mb-3">
              <label htmlFor="enfermedades" className="form-label">
                Enfermedades:
              </label>
              <small className="text-muted d-block mb-2">
                Máx. 150 caracteres
              </small>
              <textarea
                id="enfermedades"
                name="enfermedades"
                maxLength={150}
                className="form-control"
                rows={3}
                value={values.enfermedades}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-success">
              {isEditMode ? "Actualizar vaca" : "Crear vaca"}
            </button>
          </form>

          {/* Alerta de éxito */}
          {showSuccess && (
            <div
              className="alert alert-success d-flex justify-content-between align-items-center mt-3"
              role="alert"
            >
              <span>
                {isEditMode
                  ? `La vaca con diio '${diio}' fue actualizada correctamente.`
                  : `La vaca con diio '${diio}' fue registrada correctamente.`}
              </span>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowSuccess(false)}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
