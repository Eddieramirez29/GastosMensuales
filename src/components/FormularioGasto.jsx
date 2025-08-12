import { useState } from "react";
import "../styles/Formulario.css";

function FormularioGasto({ gastos, setGastos }) {
  const [gastoActual, setGastoActual] = useState("");
  const [montoActual, setMontoActual] = useState("");
  const [categoria, setCategoria] = useState("Comida");
  const [mensajeError, setMensajeError] = useState(""); // 🔹 Nuevo estado para mensaje

  const manejarOpcion = (e) => {
    setCategoria(e.target.value);
  };

  const manejarGasto = (e) => {
    setGastoActual(e.target.value);
  };

  const manejarMonto = (e) => {
    setMontoActual(e.target.value);
  };

  const manejarFormulario = (e) => {
    e.preventDefault();

    const nuevoGasto = {
      id: Date.now(),
      nombre: gastoActual,
      monto: parseFloat(montoActual),
      categoria: categoria
    };

    if (nuevoGasto.nombre === "") {
      setMensajeError("Agrega nombre del gasto");
    } 
    else if (isNaN(nuevoGasto.monto) || montoActual.trim() === "") {
      setMensajeError("Agrega la cantidad del gasto");
    } 
    else {
      setGastos([...gastos, nuevoGasto]);
      setGastoActual("");
      setMontoActual("");
      setMensajeError(""); // 🔹 Limpia el mensaje
    }
  };

  return (
    <>
      <form id="formulario" onSubmit={manejarFormulario}>
        <label htmlFor="">Información sobre los gastos</label>

        {/* 🔹 Mensaje visual */}
        {mensajeError && <p className="mensaje-error">{mensajeError}</p>}

        <input
          type="text"
          value={gastoActual}
          onChange={manejarGasto}
          placeholder="Ingresa el gasto"
        />
        <input
          type="text"
          value={montoActual}
          onChange={manejarMonto}
          placeholder="Ingresa el monto $"
        />
        <div id="categoria">
          <label>Categoria:</label>
          <select value={categoria} onChange={manejarOpcion}>
            <option value="Comida">Comida</option>
            <option value="Transporte">Transporte</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <button id="buttonAdd" type="submit">Agregar</button>
      </form>
    </>
  );
}

export default FormularioGasto;
