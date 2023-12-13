// UserLogin.tsx

import React, { useState } from 'react';

interface UserLoginProps {
    onLogin: (userType: string) => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user'); // Valor predeterminado para usuario normal

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
