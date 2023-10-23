import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PlaylistCard = ({ playlist }) => {
  return (
    <Card style={{ width: '250px', height: '300px', marginBottom: '10px' }}>
      <Card.Img variant="top" src={playlist.imagen_playlist} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{playlist.nombre_playlist}</Card.Title>
        <Button variant="btn custom-btn-color">Visualizar Playlist</Button>
      </Card.Body>
    </Card>
  );
};

export default PlaylistCard;
