import { Link } from "react-router-dom";
import NavComponent from "./NavComponent.jsx";

const Navbar = () => {
  return (
    <div style={{ marginBottom: '30px' }}>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#E0E0E0', color: '#FFFFFF' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            ComicNexus
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lista-comics">
                  Lista comics
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorias
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/terror">
                      Terror
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/accion">
                      Accion
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ciencia-ficcion">
                      Ciencia ficcion
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

            <NavComponent/>

            <Link className="btn btn-registro" to="/registro-usuario" style={{ marginLeft: '10px'}}>
                 Registro
            </Link>
            <Link className="btn btn-inicio" to="/inicio-sesion" style={{ marginLeft: '10px' }}>
                 Inicio de Sesión
            </Link>
           
            
          </div>
        </div> 
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle custom-btn-color" style={{marginRight:20}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-circle "></i>
          </button>
          <ul class="dropdown-menu" id="main-menu">
            {/* <li><a class="dropdown-item" href="#">Mi perfil</a></li> */}
            <li><Link class="dropdown-item" to="/playlists">Mis playlists</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><Link class="dropdown-item" to="/pagina-admi">Panel administrador</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
