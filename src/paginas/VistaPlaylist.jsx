import React from 'react';
import { Container } from 'react-bootstrap'; // Asegúrate de importar el componente Container de react-bootstrap

const VistaPlaylist = () => {
  return (
    <Container className="text-center my-5">
      <h1 className="display-4 badabb">playlists</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
      <div className="content-container">
        <h2>Página de Playlist</h2>
      </div>
    </Container>
  );
};

export default VistaPlaylist;
