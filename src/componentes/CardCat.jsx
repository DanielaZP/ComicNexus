function CardCat({ comic }) {
  const { cod_comic, titulo, sinopsis } = comic.comic; // Datos del cómic
  const portadaUrl = comic.portadaUrl; // URL de la portada

  return (
    <div className="card">
      <img src={portadaUrl} className="card-img-top" alt="Portada" />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{sinopsis}</p>
        <a href={`/ver-comic/${cod_comic}`} className="btn custom-btn-color">
          Ver comic
        </a>
      </div>
    </div>
  );
}

export default CardCat;
