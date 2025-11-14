import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function DataTable() {
  // Valores: Producción 75%, Fertilidad 50%, Salud 90%
  // Producción diaria: 25 L ; Producción mensual: 750 L
  const chartRef = useRef(null);

  const data = {
    labels: ["Producción", "Fertilidad", "Salud"],
    datasets: [
      {
        label: "Valores (%)",
        data: [75, 50, 90],
        backgroundColor: "rgba(75, 182, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Reporte - Valores (%)" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { callback: (v) => `${v}%` },
        grid: { drawBorder: false },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <main className="py-4">
      <div className="container d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Reporte</h1>
        <button className="btn btn-primary">Descargar reporte</button>
      </div>

      <div className="container">
        {/* Gráfico de Valores */}
        <div className="card shadow-sm mb-4">
          <div className="card-body" style={{ height: 360 }}>
            <Bar ref={chartRef} data={data} options={options} />
          </div>
        </div>

        {/* Tarjetas de producción diaria y mensual */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">Producción diaria</h2>
                <p className="mb-0">
                  Cantidad: <strong>25 L</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">Producción mensual</h2>
                <p className="mb-0">
                  Total: <strong>750 L</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
