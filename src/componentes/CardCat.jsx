function CardCat({ comic }) {
  const { cod_comic, titulo, sinopsis } = comic.comic; // Datos del cómic
  const portadaUrl = comic.portadaUrl; // URL de la portada

  return (
    <div className="card">
    <img
      src={portadaUrl}
      className="card-img-top"
      alt="Portada"
      style={{ width: '100%', objectFit:"cover", aspectRatio:"293/470" }}
    />
    <div className="card-body" style={{overflow: 'hidden' }}>
      <h5 className="card-title">{titulo}</h5>
      <hr style={{ margin: '4px 0' }} />
      <p className="card-text" style= {{ height: '60px'}}>
        {sinopsis.length > 150 ? `${sinopsis.substring(0, 150)}...` : sinopsis}
      </p>
        <a href={`/ver-comic/${cod_comic}`} className="btn custom-btn-color">
        Ver comic
        </a>  
    </div>
  </div>
  );
}

export default CardCat;
