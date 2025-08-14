import { useState } from "react";
import "../styles/ListaGastos.css";

function ListaGastos({ gastos, setGastos }) {
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoMonto, setNuevoMonto] = useState("");

  const eliminarGasto = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/gastos/${id}`, { method: "DELETE" });
      setGastos(prev => prev.filter(gasto => gasto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  const editarGasto = async (gasto) => {
    if (editandoId === gasto.id) {
      // Aceptar cambios
      const actualizado = { ...gasto, nombre: nuevoNombre, monto: parseFloat(nuevoMonto) || 0 };
      try {
        await fetch(`http://localhost:8080/api/gastos/${gasto.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(actualizado),
        });
        // Actualizar estado local y cerrar edición
        setGastos(prev => prev.map(g => (g.id === gasto.id ? actualizado : g)));
        setEditandoId(null);
        setNuevoNombre("");
        setNuevoMonto("");
      } catch (error) {
        console.error("Error al editar el gasto:", error);
      }
    } else {
      // Iniciar edición
      setEditandoId(gasto.id);
      setNuevoNombre(gasto.nombre);
      setNuevoMonto(gasto.monto.toString());
    }
  };

  return (
    <ul>
      {(gastos || []).map((gasto) => (
        <li key={gasto.id}>
          <span>
            {editandoId === gasto.id ? (
              <>
                <input
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  placeholder="Nombre"
                />
                <input
                  type="number"
                  value={nuevoMonto}
                  onChange={(e) => setNuevoMonto(e.target.value)}
                  placeholder="Monto"
                  style={{ width: "80px", marginLeft: "5px" }}
                />
              </>
            ) : (
              `${gasto.nombre || "Sin nombre"} - $${gasto.monto || 0} (${gasto.categoria || "Sin categoría"})`
            )}
          </span>
          <div className="botones">
            <button
              className="editarBoton"
              onClick={() => editarGasto(gasto)}
            >
              {editandoId === gasto.id ? "Aceptar" : "Editar"}
            </button>
            <button
              className="eliminarBoton"
              onClick={() => eliminarGasto(gasto.id)}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListaGastos;
