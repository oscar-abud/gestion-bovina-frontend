import { useEffect, useRef, useState } from "react";
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
  const [vacas, setVacas] = useState([])
  const [vacasSanas, setVacasSanas] = useState([])
  const [vacasEnfermas, setVacasEnfermas] = useState([])
  const [vacasHembras, setVacasHembras] = useState([])
  const [vacasMachos, setVacasMachos] = useState([])
  
  useEffect(() => {
    const getVacas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/vacas/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        const data = await res.json()
        // Obtener total de las vacas activas e inactivas
        setVacas(data)
        // Filtrar vacas sanas
        setVacasSanas(data.filter(v => v.sick === null));
        // Filtrar vacas enfermas
        setVacasEnfermas(data.filter(v => v.sick !== null));
        // Filtrar vacas hembras
        setVacasHembras(data.filter(v => v.genre === "F"));
        // Filtrar vacas machos
        setVacasMachos(data.filter(v => v.genre === "M"));

      } catch (error) {
        console.error(error)
      }
    }

    getVacas()
  }, [])

  console.log("Total de vacas",vacas.length)
  console.log("Vacas sanas",vacasSanas.length)
  console.log("Total enfermas",vacasEnfermas.length)
  console.log("Total hembras",vacasHembras.length)
  console.log("Total machos",vacasMachos.length)

  console.log(vacas)
  
  const data = {
    labels: ["Vacas activas/inactivas", "Sanas", "Enfermas", "Hembras", "Machos"],
    datasets: [
      {
        label: "Valores",
        data: [vacas.length, vacasSanas.length, vacasEnfermas.length, vacasHembras.length, vacasMachos.length],
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
      title: { display: true, text: "Reporte - Valores" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: vacas.length + 1,
        ticks: { callback: (v) => `${v}` },
        grid: { drawBorder: false },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <main className="py-4">
      <div className="container d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Reporte</h1>
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
                  Cantidad: <strong>{vacas.length * 7} L</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">Producción mensual</h2>
                <p className="mb-0">
                  Total: <strong>{vacas.length * 45} L</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
