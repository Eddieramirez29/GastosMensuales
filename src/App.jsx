import { useState } from "react";
import FormularioGasto from './components/FormularioGasto';
import ListaGastos from './components/ListaGastos';
import Resumen from './components/Resumen';
import "./styles/App.css";

function App() {
  const [gastos, setGastos] = useState([]);

  return (
    <>
      <Resumen gastos={gastos} />
      <FormularioGasto gastos={gastos} setGastos={setGastos} />

      {gastos.length === 0 ? (
        <p>No hay datos en la lista</p>
      ) : (
        <ListaGastos gastos={gastos} />
      )}
    </>
  );
}

export default App;
