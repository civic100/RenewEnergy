// UserLogin.tsx

import React, { useState , useContext} from 'react';
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
                console.log(userData);
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
        
        <div>
            <h2>Inicio de sesión de usuario</h2>
            <form>
                <label>
                    Usuario:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default UserLogin;
