import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

const NavLinks = ({ onNavigate }) => {
  const { pathname } = useLocation();
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/crear", label: "Crear Vaca" },
    { to: "/reportes", label: "Reportes" },
  ];
  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

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
