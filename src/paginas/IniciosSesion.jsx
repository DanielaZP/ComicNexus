import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

function InicioSesion() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({ ...errors, [name]: '' });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es obligatorio.';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria.';
    }

    if (Object.keys(newErrors).length === 0) {
      // No hay errores, enviar el formulario
      try {
        const response = await fetch('http://127.0.0.1:8000/api/verificar-credenciales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (response.ok) {
          // Autenticación exitosa
          const data = await response.json();
          console.log('Autenticación exitosa. Código de usuario:', data.cod_usuario);
        } else {
          // Autenticación fallida
          const data = await response.json();
          console.error('Error de autenticación:', data.error);
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    }
    setErrors(newErrors);
  };

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title badabb">Inicio Sesión</h2>
        <div className="image-container">
          <img src="./LogoComicsNexus.png" alt="Imagen de usuario" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUser} /> Nombre de usuario<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
          />
          <p className={`error-message ${errors.username ? '' : 'hidden'}`}>
            {errors.username}
          </p>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faLock} /> Contraseña<span className="text-danger">*</span>
          </label>
          <div className="password-input">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
            <FontAwesomeIcon
              icon={formData.showPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          </div>
          <p className={`error-message ${errors.password ? '' : 'hidden'}`}>
            {errors.password}
          </p>
        </div>
        <div className="form-group" style={{ textAlign: 'center' }}>
          <button type="submit">Iniciar Sesión</button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          ¿Aún no tienes una cuenta? <Link to="/registro-usuario"> Regístrate.</Link>
        </div>
      </form>
    </div>
  );
}

export default InicioSesion;
