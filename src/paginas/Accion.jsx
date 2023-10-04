import React from 'react'
import { Container } from 'react-bootstrap';

const Accion = () => {
  return (
  <div>
      <Container className="text-center my-5">
      <h1 className="display-4">Seccion de Acción</h1>
      <p className="lead">Explora y descubre contenido increíble</p>
      <hr className="my-4" style={{ borderColor: 'var(--verdesito)', borderWidth: '2px' }} />
    </Container>
  </div>
  )
}

export default Accion