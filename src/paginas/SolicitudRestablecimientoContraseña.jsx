import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SolicitudRestablecimientoContraseña() {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });
  const [requestSent, setRequestSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) { 
      newErrors.email = 'El correo electrónico es obligatorio.';
    }
    // Aquí realizarsb la lógica de envío de correo con la base de datos
    if (Object.keys(newErrors).length === 0) {
      
      setRequestSent(true);
    }
    setErrors(newErrors);
  };

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title badabb">Restablecimiento de contraseña</h2>
        <div className="image-container">
          <img src="./LogoComicsNexus.png" alt="Imagen de usuario" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
        {requestSent ? (
          <div>
            <p style={{ textAlign: 'center' }}>Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña. Por favor, verifica tu bandeja de entrada.</p>
          </div>
        ) : (
          <div>
            <p>Ingresa la dirección de email que usaste para registrarte. Te enviaremos un mensaje con tu nombre de usuario y un enlace para restablecer tu contraseña.</p>
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faUser} /> Correo electrónico<span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <p className={`error-message ${errors.email ? '' : 'hidden'}`}>
                {errors.email}
              </p>
            </div>
            <div className="form-group" style={{ textAlign: 'center' }}>
              <button type="submit">Enviar solicitud</button>
            </div>
          </div>
        )}
        {requestSent ? null : ( 
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            ¿Recuerdas tu contraseña? <Link to="/inicio-sesion">Inicia sesión.</Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default SolicitudRestablecimientoContraseña;
