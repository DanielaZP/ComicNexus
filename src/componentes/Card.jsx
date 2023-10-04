function Card({comic}) {
  return (
    <div class="card">
        <img src={comic.imgUrl} class="card-img-top" alt="..."/>
        <div class="card-body">
            <h5 class="card-title">{comic.titulo}</h5>
            <p class="card-text">{comic.sinopsis}</p>
            <a href="#" class="btn custom-btn-color">Ver comic</a>
        </div>
    </div>
  )
}

export default Card