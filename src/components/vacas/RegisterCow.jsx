import { useState } from "react";

export default function RegisterCow() {
  const [diio, setDiio] = useState(""); // EL Diio de este useState sirve para mostrar por pantalla la vaca guardada
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

  // VALIDACIONES
  const errors = {
    diio:
      values.diio.trim() === ""
        ? "El DIIO es obligatorio"
        : isNaN(values.diio) // Verificando que sea un numero
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

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el refresco de la pantalla
    setSubmitted(true);

    if (
      isValid("diio") &&
      isValid("date") &&
      isValid("genre") &&
      isValid("race") &&
      isValid("location")
    ) {
      console.log("✅ Vaca registrada:", values);
      setDiio(values.diio);
      setShowSuccess(true);
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
  };

  return (
    <main className="container py-4">
      <h1 className="mb-3">Registrando Vaca</h1>

      <form
        className="border border-1 rounded-1 shadow-sm p-5"
        onSubmit={handleSubmit}
        noValidate // Evita el required del formulario HTML
      >
        <p className="text-muted mb-4">
          <strong className="text-danger">El * significa obligatorio</strong>
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
          <small className="text-muted d-block mb-2">Máx. 150 caracteres</small>
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
          Crear vaca
        </button>
      </form>

      {/* Alerta de éxito */}
      {showSuccess && (
        <div
          className="alert alert-success d-flex justify-content-between align-items-center mt-3"
          role="alert"
        >
          <span>{`La vaca con diio '${diio}' fue registrada correctamente.`}</span>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowSuccess(false)}
          />
        </div>
      )}
    </main>
  );
}
