import { useState } from "react";
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
      const acumTotal = gastos.reduce((suma, valor) => {
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
        <p>Total: {totalGastos}</p>
        <p>Total Comida: {totalComidaMonto}</p>
        <p>Total Entretenimiento: {totalEntretenimientoMonto}</p>
        <p>Total Transporte: {totalTransporteMonto}</p>
        <p>Total Otros: {totalOtrosMonto}</p>
        <button id="calcularTotalsButton" onClick={mostrarTotal}>Calcular</button>
      </div>
    </>
  );
}

export default Resumen;