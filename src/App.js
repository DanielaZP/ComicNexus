import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Accion from './paginas/Accion';
import Destacados from './paginas/Destacados';
import Terror from './paginas/Terror';
import { Inicio } from './paginas/Inicio';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <Routes>
              <Route path='/' element={<Inicio/>}/>
              <Route path='/accion' element={<Accion/>}/>
              <Route path='/destacados' element={<Destacados/>}/>
              <Route path='/terror' element={<Terror/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
