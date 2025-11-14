import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../../components/Header", () => ({
  default: () => <div>Header</div>,
}));
vi.mock("../../components/Footer", () => ({
  default: () => <div>Footer</div>,
}));

import Home from "../Home.jsx";

describe("Vista Home", () => {
  it("debe contener el saludo de bienvenida", () => {
    render(<Home />);
    expect(screen.getByText(/Bienvenido/i)).toBeTruthy();
    expect(screen.getByText(/administrador/i)).toBeTruthy();
  });
});
