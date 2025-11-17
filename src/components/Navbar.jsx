import { Link, useLocation, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const NavLinks = ({ onNavigate }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: "/inicio", label: "Inicio" },
    { to: "/crear", label: "Crear Vaca" },
    { to: "/reportes", label: "Reportes" },
  ];

  const isActive = (to) =>
    to === "/inicio" ? pathname === "/inicio" : pathname.startsWith(to);

  const handleLogout = () => {
    // Limpiar autenticación
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");

    // Cerrar offcanvas si viene de mobile
    onNavigate && onNavigate();

    // Navegar al login
    navigate("/login", { replace: true });
  };

  return (
    <ul className="navbar-nav ms-lg-auto gap-3">
      {links.map(({ to, label }) => (
        <li className="nav-item" key={to}>
          <Link
            to={to}
            className={`nav-link ${isActive(to) ? "active fw-semibold" : ""}`}
            onClick={onNavigate} // cierra el offcanvas
          >
            {label}
          </Link>
        </li>
      ))}

      {/* Cerrar sesión */}
      <li className="nav-item">
        <button
          type="button"
          className="nav-link btn btn-link px-0"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </li>
    </ul>
  );
};

export default function Navbar() {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);
  const open = () => setShow(true);

  return (
    <nav className="navbar navbar-expand-lg">
      {/* Desktop */}
      <div className="collapse navbar-collapse d-none d-lg-flex">
        <NavLinks onNavigate={() => {}} />
      </div>

      {/* Botón hamburguesa < lg */}
      <Button
        variant="outline-secondary"
        className="d-lg-none navbar-toggler p-2"
        onClick={open}
        aria-controls="offcanvasNav"
        aria-label="Open navigation"
      >
        <span className="navbar-toggler-icon" />
      </Button>

      {/* Offcanvas controlado por estado */}
      <Offcanvas placement="end" show={show} onHide={close} id="offcanvasNav">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLinks onNavigate={close} />
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
}
