import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Accion from './paginas/Accion';
import Destacados from './paginas/Destacados';
import Terror from './paginas/Terror';
import CienciaFiccion from './paginas/CienciaFiccion';
import Comedia from './paginas/Comedia';
import Perfil from './paginas/Perfil';
import PaginaAdmi from './paginas/PaginaAdmi';
import ListaComics from './paginas/ListaComics';
import { RegistroComic } from './paginas/RegistroComic';
import { Inicio } from './paginas/Inicio';
import Footer from './componentes/Footer';
import VistaComic from './paginas/VistaComic';


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
              <Route path='/comedia' element={<Comedia/>}/>
              <Route path='/ciencia-ficcion' element={<CienciaFiccion/>}/>
              <Route path='/pagina-admi' element={<PaginaAdmi/>}/>
              <Route path='/vista-comic' element={<VistaComic/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
