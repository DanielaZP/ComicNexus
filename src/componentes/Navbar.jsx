import { Link } from "react-router-dom";
import NavComponent from "./filtrado/NavComponent";
import React, { useState } from 'react';

const Navbar = () => {
  const [hoverInicio, setHoverInicio] = useState(false);
  const [hoverComics, setHoverComics] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // Nuevo estado

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

            <NavComponent />

          </div>
        </div>
        <div className="dropdown" onMouseEnter={handleUserMenuHover} onMouseLeave={handleUserMenuLeave}>
          <button className="btn btn-secondary dropdown-toggle custom-btn-color" style={{ marginRight: 20 }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle "></i>
          </button>
          <ul className="dropdown-menu" id="main-menu" style={userMenuStyle}>
            {/* <li><a className="dropdown-item" href="#">Mi perfil</a></li> */}
            <li><Link className="dropdown-item" to="/playlists">Mis playlists</Link></li>
            <li><Link className="dropdown-item" to="/favoritos">Mis favoritos</Link></li>
            <li><Link className="dropdown-item" to="/">Cerrar Sesion</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="/pagina-admi">Panel administrador</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
