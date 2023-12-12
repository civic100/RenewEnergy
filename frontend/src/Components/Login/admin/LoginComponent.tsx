// LoginComponent.tsx
import React, { useState } from 'react';

interface LoginComponentProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginComponentProps> = ({ setIsLoggedIn }) => {
  const [id_admin, setId_Admin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_admin,
          password,
        }),
      });

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        // Redirigir a la página principal después del inicio de sesión si es necesario
      } else {
        console.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div>
      <h2>Login admin</h2>
      <form onSubmit={handleLogin}>
        <label>
          id:
          <input
            type="text"
            value={id_admin}
            onChange={(e) => setId_Admin(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
