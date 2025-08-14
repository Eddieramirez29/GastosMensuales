import { useState } from "react";

function FormularioGasto({ setGastos }) {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("Comida");
  const [mensajeError, setMensajeError] = useState("");

  const manejarFormulario = async (e) => {
    e.preventDefault();

    if (!nombre) return setMensajeError("Agrega nombre del gasto");
    if (!monto || isNaN(parseFloat(monto))) return setMensajeError("Agrega la cantidad del gasto");

    const nuevoGasto = { nombre, monto: parseFloat(monto), categoria };

    try {
      const response = await fetch("http://localhost:8080/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoGasto),
      });

      if (!response.ok) throw new Error("Error al guardar el gasto");

      const gastoGuardado = await response.json();
      setGastos(prev => [...prev, gastoGuardado]);

      setNombre("");
      setMonto("");
      setMensajeError("");
    } catch (error) {
      setMensajeError(error.message);
    }
  };

  return (
    <form onSubmit={manejarFormulario}>
      {mensajeError && <p>{mensajeError}</p>}
      <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Gasto" />
      <input type="text" value={monto} onChange={e => setMonto(e.target.value)} placeholder="Monto $" />
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="Comida">Comida</option>
        <option value="Transporte">Transporte</option>
        <option value="Entretenimiento">Entretenimiento</option>
        <option value="Otros">Otros</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioGasto;
