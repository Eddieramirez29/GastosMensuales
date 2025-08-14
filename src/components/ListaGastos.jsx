import "../styles/ListaGastos.css";

function ListaGastos({  gastos, setGastos }) {
  
  
  const eliminarGasto = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/gastos/${id}`, {
        method: "DELETE",
      });
      // Actualizar la lista en el estado sin el gasto eliminado
      setGastos((prev) => prev.filter((gasto) => gasto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  return (
    <ul>
      {(gastos || []).map((gasto) => (
        <li key={gasto.id}>
          <span>
            {gasto.nombre || "Sin nombre"} - ${gasto.monto || 0} ({gasto.categoria || "Sin categoría"})
          </span>
          <div className="botones">
            <button
              className="editarBoton"
              id={`editar-${gasto.id}`}
              
            >
              Editar
            </button>
            <button
              className="eliminarBoton"
              id={`eliminar-${gasto.id}`}
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
