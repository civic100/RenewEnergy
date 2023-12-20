// AdminLogin.tsx

import React, { useState } from 'react';
import '../../../assets/style/Login/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight } from '@fortawesome/free-solid-svg-icons';


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
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <FontAwesomeIcon icon={faUser} className="login__icon" />
              <input type="text" className="login__input" placeholder='Admin id' value={id_user} onChange={(e) => setId_user(e.target.value)} />
            </div>
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login__icon" />
              <input type="password" className="login__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="button login__submit" type="button" onClick={handleLogin}>
              <span className="button__text">Log In Now</span>
              <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
            </button>
          </form>
          <div className="social-login">
            <h3>Log in <br />RenewEnergy </h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
