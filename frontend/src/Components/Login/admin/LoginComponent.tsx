// AdminLogin.tsx

import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (userType: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [id_user, setId_user] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin'); // Valor predeterminado para usuario normal

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user, password }),
      });

      if (response.ok) {
        // Lógica de manejo de sesión
        onLogin(userType);
      } else {
        // Lógica de manejo de error
        console.error('Error en el inicio de sesión del administrador');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <h2>Inicio de sesión de administrador</h2>
      <form>
        <label>
          Usuario:
          <input type="text" value={id_user} onChange={(e) => setId_user(e.target.value)} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Iniciar sesión</button>
      </form>
    </div>
  );
}

export default AdminLogin;
