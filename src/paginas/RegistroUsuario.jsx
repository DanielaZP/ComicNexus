import React, { useState } from 'react';

function RegistroUsuario() {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //bd
      console.log(formData);
    };
  
    return (
      <div>
        <h2>Registro de Usuario</h2>
        
      </div>
    );
  }

export default RegistroUsuario