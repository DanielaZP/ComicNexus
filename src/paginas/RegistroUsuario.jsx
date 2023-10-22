import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'El nombre completo es obligatorio.';
    }
    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es obligatorio.';
    }
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria.';
    }

    if (Object.keys(newErrors).length === 0) {
      // Lógica de registro
      console.log('Registro exitoso con:', formData);
    }

    setErrors(newErrors);
  };

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Registro de Usuario</h2>
        <div className="image-container">
          <img src="./LogoComicsNexus.png" alt="Imagen de usuario" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
        <div className="form-group">
          <label>Nombre completo<span className="text-danger">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p className={`error-message ${errors.name ? '' : 'hidden'}`}>
            {errors.name}
          </p>
        </div>
        <div className="form-group">
          <label>Nombre de usuario<span className="text-danger">*</span></label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <p className={`error-message ${errors.username ? '' : 'hidden'}`}>
            {errors.username}
          </p>
        </div>
        <div className="form-group">
          <label>Correo electrónico<span className="text-danger">*</span></label>
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
        <div className="form-group">
          <label>Contraseña<span className="text-danger">*</span></label>
          <div className="password-input">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
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
          <button type="submit">Registrarse</button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          ¿Ya tienes cuenta? <Link to="/inicio-sesion">Inicia sesión aquí.</Link>
        </div>
      </form>
    </div>
  );
}

export default RegistroUsuario;
