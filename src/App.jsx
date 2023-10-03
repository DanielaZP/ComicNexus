import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Accion from './paginas/Accion';
import Destacados from './paginas/Destacados';
import Terror from './paginas/Terror';
import Perfil from './paginas/Perfil';
import ListaComics from './paginas/ListaComics';
import { RegistroComic } from './paginas/RegistroComic';
import { Inicio } from './paginas/Inicio';
import Footer from './componentes/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <Routes>
              <Route path='/' element={<Inicio/>}/>
              <Route path='/accion' element={<Accion/>}/>
              <Route path='/registro-comic' element={<RegistroComic/>}/>
              <Route path='/lista-comics' element={<ListaComics/>}/>
              <Route path='/terror' element={<Terror/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
