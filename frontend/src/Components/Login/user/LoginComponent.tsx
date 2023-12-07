// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAdmin }) => {
    const [id_admin, setId_Admin] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
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
                // Inicio de sesión exitoso
                setIsAdmin(true); // Establecer el estado de administrador
                history('/home'); // Redirige a la página principal después del inicio de sesión
            } else {
                console.error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <label>
                    id:
                    <input type="text" value={id_admin} onChange={(e) => setId_Admin(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
