import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PaginaAdmi() {
  return (
    <div  style={{ margin: '20px' }}>
        <Container className="text-center my-5">
            <h1 className="display-4 badabb">Panel administrador</h1>
            <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }}/>
        </Container>
        <div class="row">
        <div class="col-sm-6 mb-4 mb-sm-0">
            <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Añadir nuevo cómic a la plataforma</h5>
                <p class="card-text">Para registrar un nuevo cómic y agregar sus datos presione el botón de abajo.</p>
                <Link class="btn custom-btn-color" to="/registro-comic">Añadir cómic</Link>
            </div>
            </div>
        </div>
         <div class="col-sm-6 mb-4">
            <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Añadir nuevo contenido de cómic a la plataforma</h5>
                <p class="card-text">Para agregar nuevo contenido de un cómic presione el botón de abajo.</p>
                <Link class="btn custom-btn-color" to="/contenido-comic">Añadir contenido</Link>
            </div>
            </div>
        </div> 
        <div class="col-sm-6 mb-4 mx-auto">
            <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Editar un cómic de la plataforma</h5>
                <p class="card-text">Para editar datos de un cómic ya registrado presione el botón de abajo.</p>
                <Link class="btn custom-btn-color" to="">Editar cómic</Link>
            </div>
            </div>
        </div> 
        </div>
    </div>
  )
}

export default PaginaAdmi