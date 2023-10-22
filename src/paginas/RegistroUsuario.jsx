import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';

function RegistroUsuario() {
  const history = useHistory(); // Importa el objeto history para redireccionar

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [message, setMessage] = useState(''); // Mensaje para mostrar respuestas del servidor

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/registro-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registro exitoso, redirige a la página de inicio de sesión u otra página
        setMessage('Usuario registrado con éxito.');
        history.push('/inicio-sesion'); // Redirige a la página de inicio de sesión
      } else {
        // Maneja errores del servidor
        const data = await response.json();
        setMessage(data.message); // Mensaje de error desde el servidor
      }
    } catch (error) {
      // Error de conexión o del servidor
      setMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Registro de Usuario</h2>
        <div className="image-container">
          <img src="./LogoComicsNexus.png" alt="Imagen de usuario" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
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
        {message && <div className="error-message">{message}</div>}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          ¿Ya tienes cuenta? <Link to="/inicio-sesion"> Inicia sesión.</Link>
        </div>
      </form>
    </div>
  );
}

export default RegistroUsuario;
