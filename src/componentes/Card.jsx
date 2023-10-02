function Card({comic}) {
  return (
    <div class="card">
        <img src={comic.imgUrl} class="card-img-top" alt="..."/>
        <div class="card-body">
            <h5 class="card-title">{comic.titulo}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn custom-btn-color">Ver comic</a>
        </div>
    </div>
  )
}

export default Card