import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SolicitudRestablecimientoContraseña() {
  const [email, setEmail] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí puedes realizar una solicitud al servidor para enviar un correo de restablecimiento de contraseña al correo electrónico proporcionado.
    
    // Simulación de éxito de la solicitud (en una aplicación real, esto sería una solicitud al servidor)
    setRequestSent(true);
  };

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
    <form onSubmit={handleSubmit} className="form">
      <div className="image-container">
        <img src="./LogoComicsNexus.png" alt="Imagen de usuario" style={{ maxWidth: '50%', height: 'auto' }} />
      </div>
      <div className="form-group">
        <label>
          <FontAwesomeIcon icon={faUser} /> Correo electrónico<span className="text-danger">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group" style={{ textAlign: 'center' }}>
        <button type="submit">Enviar solicitud</button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        ¿Recuerdas tu contraseña? <Link to="/inicio-sesion">Inicia sesión.</Link>
      </div>
    </form>
  </div>
  );
}

export default SolicitudRestablecimientoContraseña;
