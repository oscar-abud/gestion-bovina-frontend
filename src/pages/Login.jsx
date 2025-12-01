import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const res = await fetch("https://api-gestion-bovina.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        let msg = "Error al iniciar sesión";
        try {
          const data = await res.json();
          msg = data.message || msg;
        } catch {}
        setError(msg);
        return;
      }

      const data = await res.json();
      const token = data.token;

      // Guardamos token en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");

      // Navegar al inicio protegido
      navigate("/inicio");
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div id="container-login" className="container-xll">
      <div className="container mt-5" style={{ maxWidth: "480px" }}>
        <h3 className="text-center mb-4 mt-5">Iniciar sesión</h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo: </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese el correo"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña: </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese la contraseña"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
