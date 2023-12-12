import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginComponentProps {
    setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginComponentProps> = ({ setIsUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Inicio de sesión exitoso
                setIsUser(true); // Establecer el estado de usuario normal
                navigate('/home'); // Redirige a la página principal después del inicio de sesión
            } else {
                console.error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    return (
        <div>
            <h2>Login User</h2>
            <form>
                <label>
                    email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;