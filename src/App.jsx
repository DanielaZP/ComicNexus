import './App.css';
import { Route, Routes, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Accion from './paginas/Accion';
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
import RegistroUsuario from './paginas/RegistroUsuario';
import Playlist from './paginas/Playlist';
import VistaPlaylist from './paginas/VistaPlaylist';
import InicioSesion from './paginas/IniciosSesion';
import BusquedaTodo from './paginas/BusquedaTodo';
import SolicitudRestablecimientoContraseña from './paginas/SolicitudRestablecimientoContraseña';

function App() {
  const estiloFondo = {
    backgroundImage: `url('src/Imagenes/fondo4.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundPosition: "center"
  };
  return (
    <div className="App" style={estiloFondo}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route index element={<Inicio />} />
            <Route path="accion" element={<Accion />} />
            <Route path="registro-comic" element={<RegistroComic />} />
            <Route path="lista-comics" element={<ListaComics />} />
            <Route path="terror" element={<Terror />} />
            <Route path="comedia" element={<Comedia />} />
            <Route path="ciencia-ficcion" element={<CienciaFiccion />} />
            <Route path="pagina-admi" element={<PaginaAdmi />} />
            <Route path="vista-comic/:id" element={<VistaComic />} />
            <Route path="playlists" element={<Playlist />} />
            <Route path="vista-playlist/:id" element={<VistaPlaylist />} />
            <Route path='buscar' element={<BusquedaTodo/>}/>
          </Route>
          <Route path="registro-usuario" element={<RegistroUsuario />} />
          <Route path="inicio-sesion" element={<InicioSesion />} />
          <Route path="solicitud-restablecimiento-contraseña" element={<SolicitudRestablecimientoContraseña />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;