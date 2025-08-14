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

  const manejarFormulario = async (e) => {
    e.preventDefault();

    const nuevoGasto = {
      nombre: gastoActual,
      monto: parseFloat(montoActual),
      categoria: categoria
    };

    if (nuevoGasto.nombre === "") {
      setMensajeError("Agrega nombre del gasto");
      return;
    } 
    if (isNaN(nuevoGasto.monto) || montoActual.trim() === "") {
      setMensajeError("Agrega la cantidad del gasto");
      return;
    }

    try {
      // 🔹 POST al backend
      const response = await fetch("http://localhost:8080/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoGasto)
      });

      if (!response.ok) {
        throw new Error("Error al guardar el gasto en la base de datos");
      }

      const gastoGuardado = await response.json();

      // 🔹 Actualiza el estado local con el objeto que devuelve el backend
      setGastos([...gastos, gastoGuardado]);

      // 🔹 Limpia los inputs y mensajes
      setGastoActual("");
      setMontoActual("");
      setMensajeError("");
    } catch (error) {
      setMensajeError(error.message);
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
