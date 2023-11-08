import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from 'react-use';

function SolicitudRestablecimientoContraseña() {
  const [nuevo, setNuevo ]= useLocalStorage('nuevo');
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
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) { 
      newErrors.email = 'El correo electrónico es obligatorio.';
    }
    
    if (Object.keys(newErrors).length === 0) {
      axios.get('https://comic-next-laravel.vercel.app/api/verificar-correo/' + formData.email)
        .then((response) => {
          // Almacena los datos JSON en el estado local
          console.log(response.data);
          localStorage.setItem('nuevo', response.data.nuevo);
          if (response.data.nuevo) {
            setRequestSent(true);
            setErrorMessage(null);
          } else {
            setRequestSent(false);
            setErrorMessage('El correo electrónico no ha sido verificado.'); 
          }
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
          setErrorMessage('Error al verificar el correo electrónico.');
        });
    } else {
      setErrorMessage('Por favor, corrige los errores en el formulario.');
    }
    setErrors(newErrors);
  };  

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title badabbm">Restablecimiento de contraseña</h2>
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
                placeholder='Ingrese su correo electrónico'
              />
              <p className={`error-message ${errors.email ? '' : 'hidden'}`}>
                {errors.email}
              </p>
            </div>
            <div className="form-group" style={{ textAlign: 'center' }}>
              <button type="submit">Enviar solicitud</button>
            </div>
            <div className="form-group" style={{ textAlign: 'center' }}>
            {errorMessage && (
             <p className="error-message">{errorMessage}</p>
             )}
            </div>
          </div>
        )}
        {requestSent ? null : ( 
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            ¿Recuerdas tu contraseña? <Link to="/">Inicia sesión.</Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default SolicitudRestablecimientoContraseña;
