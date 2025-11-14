import "./pages.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DataTable from "../components/DataTable";

function Reportes() {
  return (
    <div id="container" className="container-xll">
      <Header />
      <main className="container-sm my-5">
        <DataTable />
      </main>
      <Footer />
    </div>
  );
}

export default Reportes;
