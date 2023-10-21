import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter style={{ backgroundColor: 'white',marginTop: '20px'}} className='text-lg-left-img-top'>
    <MDBContainer className='p-4'>
      <MDBRow>
        <MDBCol lg='6' md='12' className='mb-4 mb-md-0 '>
          <h5 className='text-uppercase text-center text'>Creadores de la página.</h5>
          <MDBRow>
            <MDBCol md='6'>
            <p className='text-left'>
                1. Barriga Rios Valeria Michelle
                <br />
                2. Huanca Maldonado Rodrigo
                <br />
                3. Mercado Rojas Rolando
                <br />
                4. Padilla Morales Aron Joel
              </p>
            </MDBCol>
            <MDBCol md='6'>
            <p className='text-left '>
                5. Torrico Martinez Leonardo Enrique
                <br />
                6. Villanueva Zapata Teresa
                <br />
                7. Zapata Pari Daniela
              </p>
          </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol lg='6' md='12' className='mb-4 mb-md-0 text-center text'>
          <img
            src='/LogoComicsNexus.png'  
            alt='Descripción de la imagen'
            style={{ maxWidth: '20%', height: 'auto' }}  
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>

    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      &copy; {new Date().getFullYear()} Copyright:{' '}
      <a className='text-dark'>
        Alianza agil
      </a>
    </div>
  </MDBFooter>
);

}

export default Footer