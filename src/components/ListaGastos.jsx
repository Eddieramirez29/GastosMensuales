import "../styles/ListaGastos.css";

function ListaGastos({ gastos }) 
{
  return (
    <ul>
      {(gastos || []).map((gasto) => (
        <li key={gasto.id}>
          {gasto.nombre || "Sin nombre"} - ${gasto.monto || 0} ({gasto.categoria || "Sin categoría"})
        </li>
      ))}
    </ul>
  );
}


export default ListaGastos;
