// RegisterComponent.tsx

import React, { useState } from 'react';
import ImageUpload from '../Global/ImageUpload';
import { Navigate } from 'react-router-dom';

const RegisterComponent: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    user_type: 'normal', // O 'company', según tu lógica
    image_url: '',
    // Campos específicos para empresa
    company_name: '',
    website: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Luego de un registro exitoso, llamas a la función onRegister para redirigir al usuario al login.
        return <Navigate to="/login" />;
      } else {
        // Manejar casos de error en la respuesta del servidor
        console.error('Error en el registro:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <h2>Registro de usuario</h2>
      <form>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Tipo de usuario:
          <select name="user_type" value={formData.user_type} onChange={handleInputChange}>
            <option value="normal">Normal</option>
            <option value="company">Empresa</option>
          </select>
        </label>
        <br />
        {/* Campos específicos para empresa */}
        {formData.user_type === 'company' && (
          <>
            <label>
              Nombre de la empresa:
              <input type="text" name="company_name" value={formData.company_name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Sitio web:
              <input type="text" name="website" value={formData.website} onChange={handleInputChange} />
            </label>
          </>
        )}
        <br />
        <label>
          URL de imagen:
          <ImageUpload onImageSelect={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
