import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function RestablecerContraseña() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es obligatoria.';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmación de contraseña es obligatoria.';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(newErrors).length === 0) {
      // Las contraseñas coinciden, puedes enviar la solicitud para restablecerla
      // Aquí debes agregar el código para enviar la solicitud de restablecimiento
    }

    setErrors(newErrors);
  };

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title badabbm">Restablecer Contraseña</h2>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faLock} /> Nueva Contraseña<span className="text-danger">*</span>
          </label>
          <div className="password-input">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nueva Contraseña"
              maxLength="50"
            />
            <FontAwesomeIcon
              icon={formData.showPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          </div>
          <p className={`error-message ${errors.newPassword ? '' : 'hidden'}`}>
            {errors.newPassword}
          </p>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faLock} /> Confirmar Contraseña<span className="text-danger">*</span>
          </label>
          <div className="password-input">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar Contraseña"
              maxLength="50"
            />
          </div>
          <p className={`error-message ${errors.confirmPassword ? '' : 'hidden'}`}>
            {errors.confirmPassword}
          </p>
        </div>
        <div className="form-group" style={{ textAlign: 'center' }}>
          <button type="submit">Restablecer Contraseña</button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/">Volver al Inicio de Sesión</Link>
        </div>
      </form>
    </div>
  );
}

export default RestablecerContraseña;
