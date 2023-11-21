import { Link } from "react-router-dom";
import NavComponent from "./filtrado/NavComponent";
import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Navbar = () => {
  const [hoverInicio, setHoverInicio] = useState(false);
  const [hoverComics, setHoverComics] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // Nuevo estado
  const [usuarioData, setUsuarioData] = useState([]);
  const codUsuario = localStorage.getItem('cod_usuario');

  useEffect(() => {
    axios.get(`https://comic-next-laravel.vercel.app/api/api/datosUser?idUser=${codUsuario}`)
      .then((response) => {
        console.log(response.data);
        setUsuarioData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de usuario:', error);
      });
  }, []);
  
  
  const handleInicioHover = () => {
    setHoverInicio(true);
  };

  const handleInicioLeave = () => {
    setHoverInicio(false);
  };

  const handleComicsHover = () => {
    setHoverComics(true);
  };

  const handleComicsLeave = () => {
    setHoverComics(false);
  };

  const handleCategoriesHover = () => {
    setShowCategories(true);
  };

  const handleCategoriesLeave = () => {
    setShowCategories(false);
  };

  const handleUserMenuHover = () => {
    setShowUserMenu(true);
  };

  const handleUserMenuLeave = () => {
    setShowUserMenu(false);
  };
  const handleLogout = () => {
    // Elimina el codUsuario del localStorage al cerrar sesión
    localStorage.removeItem('cod_usuario');
  };

  const linkStyleInicio = hoverInicio ? { borderBottom: '2px solid black' } : {};
  const linkStyleComics = hoverComics ? { borderBottom: '2px solid black' } : {};
  const dropdownStyle = showCategories ? { display: 'block' } : {};
  const userMenuStyle = showUserMenu ? { display: 'block' } : {};

  return (
    <div style={{ marginBottom: '30px' }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/inicio">
            <img
              src="/LogoComicsNexus.png"
              alt="Logo de tu aplicación"
              style={{ maxHeight: '45px', marginRight: '20px', marginLeft: '15px' }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/inicio"
                  onMouseEnter={handleInicioHover}
                  onMouseLeave={handleInicioLeave}
                  style={linkStyleInicio}
                >
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/lista-comics"
                  onMouseEnter={handleComicsHover}
                  onMouseLeave={handleComicsLeave}
                  style={linkStyleComics}
                >
                  Lista cómics
                </Link>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={handleCategoriesHover}
                onMouseLeave={handleCategoriesLeave}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorías
                </a>
                <ul className="dropdown-menu" style={dropdownStyle}>
                  <li>
                    <Link className="dropdown-item" to="/terror">
                      Terror
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/accion">
                      Acción
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ciencia-ficcion">
                      Ciencia ficción
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/comedia">
                      Comedia
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <span className="navbar-text" style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {usuarioData.usuario && `Hola, ${usuarioData.usuario.nombre_u}!!`}
            </span>
            <NavComponent />

          </div>
        </div>
        <div className="dropdown" onMouseEnter={handleUserMenuHover} onMouseLeave={handleUserMenuLeave}>
          <button className="btn btn-secondary dropdown-toggle custom-btn-color btn-hover-effect" style={{ marginRight: 20 }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle "></i>
          </button>
          
          <ul className="dropdown-menu" id="main-menu" style={userMenuStyle}>
            {/* <li><a className="dropdown-item" href="#">Mi perfil</a></li> */}
            <li><Link className="dropdown-item" to="/playlists">Mis playlists</Link></li>
            <li><Link className="dropdown-item" to="/favoritos">Mis favoritos</Link></li>
            {localStorage.getItem('cod_usuario') === '127' && (
              <li>
                <Link className="dropdown-item" to="/pagina-admi">Panel administrador</Link>
              </li>
            )}
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Cerrar Sesión</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
