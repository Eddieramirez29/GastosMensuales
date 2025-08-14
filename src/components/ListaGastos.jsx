import "../styles/ListaGastos.css";

function ListaGastos({ gastos }) {
  return (
    <ul>
      {(gastos || []).map((gasto) => (
        <li key={gasto.id}>
          <span>
            {gasto.nombre || "Sin nombre"} - ${gasto.monto || 0} ({gasto.categoria || "Sin categoría"})
          </span>
          <div className="botones">
            <button className="editarBoton" id={`editar-${gasto.id}`}>Editar</button>
            <button className="eliminarBoton" id={`eliminar-${gasto.id}`}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListaGastos;
