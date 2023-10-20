import React from 'react';
import { Container } from 'react-bootstrap';
function Playlist() {
  return (
    <div>
      <Container className="text-center my-5">
        <h1 className="display-4">Mis playlists</h1>
        <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
      </Container> 
    </div>
  );
}

export default Playlist;
    