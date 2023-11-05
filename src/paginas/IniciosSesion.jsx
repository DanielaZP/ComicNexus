import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function InicioSesion() {
  const navigate = useNavigate();
  const [errorMensaje, setErrorMensaje] = useState('');
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
    const newPassword = name === 'password' ? value.replace(/\s/g, '') : value; // Elimina espacios en blanco

    setErrors({ ...errors, [name]: '' });
    setFormData({ ...formData, [name]: newPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es obligatorio.';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una letra minúscula.';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una letra mayúscula.';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos un número.';
    } else if (/\s/.test(formData.password)) {
      newErrors.password = 'La contraseña no puede contener espacios en blanco.';
    }

    if (Object.keys(newErrors).length === 0) {
      // No hay errores, enviar el formulario
      try {
        const response = await axios.get(`https://comic-next-laravel.vercel.app/api/api/verificar-credenciales?nombre_u=${formData.username}&password=${formData.password}`)
        if (response.status === 200) {
          // Autenticación exitosa
          const data = response.data; // Obtén los datos de la respuesta
          const codUsuario = data.cod_usuario; // Obten el valor 'cod_usuario'
          localStorage.setItem('cod_usuario', codUsuario);
          console.log('Autenticación exitosa. Código de usuario:', codUsuario);
          navigate('/inicio');
        } else {
          // Autenticación fallida
          console.error('Error de autenticación:', response.data.error);
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        setErrorMensaje('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        const response2 = await axios.get(`https://comic-next-laravel.vercel.app/api/api/incrementarFallidos/${formData.username}`)
        if (response2.status === 200) {
          const data2 = response2.data;
          console.log(data2);
        }
      }
    }
    setErrors(newErrors);
  };

  return (
    <div className="form-container" style={{ width: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title badabbm">Inicio Sesion</h2>
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
            maxlength="30"
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
              maxlength="50"
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
        {errorMensaje && (
          <div className="error-message" style={{ textAlign: 'center', color: 'red' }}>
            {errorMensaje}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          ¿Aún no tienes una cuenta? <Link to="/registro-usuario"> Regístrate.</Link>
          <p><strong><Link to="/solicitud-restablecimiento-contraseña" style={{ color: 'black' }}>¿Olvidaste tu contraseña?</Link></strong></p>
        </div>
      </form>
    </div>
  );
}

export default InicioSesion;
