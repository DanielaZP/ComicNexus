import './App.css';
import React from 'react';
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
import RestablecerContraseña from './paginas/RestablecerContraseña';
import ContenidoComic from './paginas/ContenidoComic';
import EditarComic from './paginas/EditarComic';
import Favoritos from './paginas/Favoritos';
import LeerComic from './paginas/LeerComic';

const codUsuario = localStorage.getItem('cod_usuario');

function PrivateRoute({ children }) {
  return codUsuario ? children : <Navigate to="/" />;
}
function PrivateRouteAdmi({ children }) {
  const codUsuario = parseInt(localStorage.getItem('cod_usuario'), 10);

  return codUsuario === 127 ? children : <Navigate to="/inicio" />;
}

function App() {
  const estiloFondo = {
    backgroundImage: `url('../fondos/Fondo.jpeg')`,
    backgroundColor: "#999999",
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
            <Route
              path="inicio"
              element={<PrivateRoute><Inicio/></PrivateRoute>}
            />
            <Route
              path="accion"
              element={<PrivateRoute><Accion /></PrivateRoute>}
            />
            <Route
              path="registro-comic"
              element={<PrivateRouteAdmi><RegistroComic /></PrivateRouteAdmi>}
            />
            <Route
              path="lista-comics"
              element={<PrivateRoute><ListaComics /></PrivateRoute>}
            />
            <Route
              path="terror"
              element={<PrivateRoute><Terror /></PrivateRoute>}
            />
            <Route
              path="comedia"
              element={<PrivateRoute><Comedia /></PrivateRoute>}
            />
            <Route
              path="ciencia-ficcion"
              element={<PrivateRoute><CienciaFiccion /></PrivateRoute>}
            />
            <Route
              path="pagina-admi"
              element={<PrivateRouteAdmi><PaginaAdmi /></PrivateRouteAdmi>}
            />
            <Route
              path="vista-comic/:id"
              element={<PrivateRoute><VistaComic /></PrivateRoute>}
            />
            <Route
              path="playlists"
              element={<PrivateRoute><Playlist /></PrivateRoute>}
            />
            <Route
              path="vista-playlist/:id"
              element={<PrivateRoute><VistaPlaylist /></PrivateRoute>}
            />
            <Route
              path="buscar"
              element={<PrivateRoute><BusquedaTodo /></PrivateRoute>}
            />
            <Route
              path="perfil"
              element={<PrivateRoute><Perfil /></PrivateRoute>}
            />
            <Route
              path="contenido-comic"
              element={<PrivateRouteAdmi><ContenidoComic /></PrivateRouteAdmi>}
            />
            <Route
              path="editar-comic/:id"
              element={<PrivateRouteAdmi><EditarComic /></PrivateRouteAdmi>}
            />
            <Route
              path="favoritos"
              element={<PrivateRoute><Favoritos /></PrivateRoute>}
            />
            {/* <Route
              path="leer"
              element={<PrivateRoute><LeerComic /></PrivateRoute>}
            /> */}
          </Route>
          <Route path="registro-usuario" element={<RegistroUsuario />} />
          <Route index element={<InicioSesion />} />
          <Route
            path="solicitud-restablecimiento-contraseña"
            element={<SolicitudRestablecimientoContraseña />}
          />
          <Route
            path="restablecer-contraseña"
            element={<RestablecerContraseña />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
