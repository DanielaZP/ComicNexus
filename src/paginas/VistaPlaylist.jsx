import React from 'react';

const VistaPlaylist = ({ match }) => {
  const playlistId = match.params.id;
  
  // Lógica para mostrar mensajes personalizados basados en playlistId
  let message = '';
  if (playlistId === '1') {
    message = '¡Hola! Estás viendo la Playlist 1. ¡Bienvenido!';
  } else if (playlistId === '2') {
    message = '¡Hola! Estás viendo la Playlist 2. Esperamos que te guste.';
  } else {
    message = `¡Hola! Estás viendo la Playlist con ID: ${playlistId}. ¡Esperamos que disfrutes!`;
  }

  return (
    <div>
      <h2>Mensaje Especial</h2>
      <p>{message}</p>
    </div>
  );
};

export default VistaPlaylist;
