// UserLogin.tsx

import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/style/Login/Login.css';
import { UserContext } from '../../user/Context/UserContext';

interface UserLoginProps {
    onLogin: (userType: string) => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user'); // Valor predeterminado para usuario normal

    const { setUser } = useContext(UserContext);
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                // Actualiza el contexto con los datos del usuario
                if (userData[0]?.user?.user_type !== 'company') {
                    setUser({
                        id_user: userData.id_user,
                        name: userData.name,
                        email: userData.email,
                        user_type: userData.user_type,
                        image_url: userData.image_url,
                        website: '',
                        company_name: ''
                    });
                } else {
                    setUser({
                        id_user: userData[0].user.id_user,
                        name: userData[0].user.name,
                        email: userData[0].user.email,
                        user_type: userData[0].user.user_type,
                        image_url: userData[0].image_url,
                        website: userData[0].website,
                        company_name: userData[0].company_name
                    });
                }
                // Lógica de manejo de sesión
                onLogin(userType);
            } else {
                // Lógica de manejo de error
                console.error('Error en el inicio de sesión del usuario');
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
                            <input type="text" className="login__input" placeholder="User name / Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    <h3>Log in <br/>RenewEnergy </h3>
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

export default UserLogin;
