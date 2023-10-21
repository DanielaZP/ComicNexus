import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false, 
  });

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // bd
    console.log(formData);
  };

  return (
    <div className="registration-form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="registration-form">
        <h2 className="form-title">Registro de Usuario</h2>
        <div className="form-group">
          <label>Nombre completo:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
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
        </div>
        <div className="form-group" style={{ textAlign: 'center' }}>
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
}

export default RegistroUsuario;
