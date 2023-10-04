import React from 'react'
import Carrucel from '../componentes/Carrucel'
import Card from '../componentes/Card'
import { Container } from 'react-bootstrap';


const comics = [
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

export const Inicio = () => {
  return (
    <div className='container'>
          <Container className="text-center my-5">
          <h1 className="display-4">ComicsNexus</h1>
          <hr className="my-4" style={{ borderColor: 'var(--verdesito)', borderWidth: '2px' }} />
        </Container>
        <Carrucel/>
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
