import { useState } from "react";
import { FaBus, FaEllipsisH, FaFilm, FaMoneyBillWave, FaUtensils } from "react-icons/fa";
import "../styles/Resume.css";

function Resumen({ gastos }) {
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalComidaMonto, setTotalComidaMonto] = useState(0);
  const [totalEntretenimientoMonto, setTotalEntretenimientoMonto] = useState(0);
  const [totalTransporteMonto, setTotalTransporteMonto] = useState(0);
  const [totalOtrosMonto, setTotalOtrosMonto] = useState(0);

  const [gastosComida, setGastosComida] = useState([]);
  const [gastosEntretenimiento, setGastosEntretenimiento] = useState([]);
  const [gastosTransporte, setGastosTransporte] = useState([]);
  const [gastosOtros, setGastosOtros] = useState([]);

  const mostrarTotal = () => {
    if (gastos.length === 0) 
    {
      return;
    } 
    else 
    {
      const acumTotal =  gastos.reduce((suma, valor) => {
        return suma + Number(valor.monto);
      }, 0);

      const gastosComidaFiltrados = gastos.filter(
        (valor) => valor.categoria === "Comida"
      );

      const gastosEntretenimientoFiltrados = gastos.filter(
        (valor) => valor.categoria === "Entretenimiento"
      );

      const gastosTransporteFiltrados = gastos.filter(
        (valor) => valor.categoria === "Transporte"
      );

      const gastosOtrosFiltrados = gastos.filter(
        (valor) => valor.categoria === "Otros"
      );

      setGastosComida(gastosComidaFiltrados);
      setGastosEntretenimiento(gastosEntretenimientoFiltrados);
      setGastosTransporte(gastosTransporteFiltrados);
      setGastosOtros(gastosOtrosFiltrados);

      const acumTotalComida = gastosComidaFiltrados.reduce((suma, valor) => {
        return suma + Number(valor.monto);
      }, 0);

      const acumTotalEntretenimiento = gastosEntretenimientoFiltrados.reduce(
        (suma, valor) => {
          return suma + Number(valor.monto);
        },
        0
      );

      const acumTotalTransporte = gastosTransporteFiltrados.reduce(
        (suma, valor) => {
          return suma + Number(valor.monto);
        }, 0);

      const acumTotalOtros = gastosOtrosFiltrados.reduce((suma, valor) => {
        return suma + Number(valor.monto);
      }, 0);

      setTotalGastos(acumTotal);
      setTotalComidaMonto(acumTotalComida);     
      setTotalEntretenimientoMonto(acumTotalEntretenimiento);
      setTotalTransporteMonto(acumTotalTransporte);
      setTotalOtrosMonto(acumTotalOtros);
    }
  };

  return (
    <>
      <div className="containerResumen">
        <p><FaMoneyBillWave style={{ color: "#28a745" }} /> Total: $ {totalGastos}</p>
        <p><FaUtensils style={{ color: "#ff6347" }} /> Total Comida: $ {totalComidaMonto}</p>
        <p><FaFilm style={{ color: "#ffa500" }} /> Total Entretenimiento: $ {totalEntretenimientoMonto}</p>
        <p><FaBus style={{ color: "#007bff" }} /> Total Transporte: $ {totalTransporteMonto}</p>
        <p><FaEllipsisH style={{ color: "#6c757d" }} /> Total Otros: $ {totalOtrosMonto}</p>
        <button id="calcularTotalsButton" onClick={mostrarTotal}>Calcular</button>
      </div>
    </>
  );
}

export default Resumen;
