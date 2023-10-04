import React from 'react'
import Card from '../componentes/Card'
import { Container } from 'react-bootstrap';

const comics = [
    {
    id: crypto.randomUUID(),
      titulo: 'Batman',
      imgUrl: './heroes/dc-batman.jpg',
    },
    {
      id: crypto.randomUUID(),
        titulo: 'Superman',
        imgUrl: './heroes/dc-superman.jpg',
      },
      {
        id: crypto.randomUUID(),
          titulo: 'Arrow',
          imgUrl: './heroes/dc-arrow.jpg',
        },
      {
        id: crypto.randomUUID(),
          titulo: 'flash',
          imgUrl: './heroes/dc-flash.jpg',
        },
        {
            id: crypto.randomUUID(),
              titulo: 'Iron man',
              imgUrl: './heroes/marvel-iron.jpg',
            },
            {
              id: crypto.randomUUID(),
                titulo: 'Capitan America',
                imgUrl: './heroes/marvel-captain.jpg',
              },
              {
                id: crypto.randomUUID(),
                  titulo: 'Hawkeye',
                  imgUrl: './heroes/marvel-hawkeye.jpg',
                },
              {
                id: crypto.randomUUID(),
                  titulo: 'Hulk',
                  imgUrl: './heroes/marvel-hulk.jpg',
                },
  ]

function ListaComics() {
  return (
    
    <div className='container'>
          <Container className="text-center my-5">
            <h1 className="display-4">Disfruta de todos nuestros comics</h1>
            <p className="lead">Explora y descubre contenido increíble</p>
            <hr className="my-4" style={{ borderColor: 'var(--verdesito)', borderWidth: '2px' }} />
        </Container>
        <div class="row row-cols-1 row-cols-md-4 g-4 mt-4">
        {
          comics.map(comic => (
            <div class="col">
              <Card key={comic.id} comic={comic} />
              </div>
          ))
        }
        </div>
    </div>
  )
}

export default ListaComics