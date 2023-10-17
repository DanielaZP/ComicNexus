import React from 'react'
import { Container } from 'react-bootstrap';
function VistaComic() {
  return (
    <div>
        <Container className="text-center my-5">
            <h1 className="display-4">Vista del comic</h1>
            <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
      </Container> 
    </div>
  )
}

export default VistaComic