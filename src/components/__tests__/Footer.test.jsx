import { render, screen } from "@testing-library/react";
import Footer from "../Footer.jsx";

describe("Componente Footer", () => {
  it("debe mostrar el texto y la imagen del footer", () => {
    render(<Footer />);

    const texto = screen.getByText(/Toda la magia del sur/i);
    const imagen = screen.getByAltText(/imagen-footer/i);

    expect(texto).toBeTruthy();
    expect(imagen).toBeTruthy();
  });
});
