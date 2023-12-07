// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [id_admin, setId_Admin] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/Register', {
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
                //setIsAdmin(true); // Establecer el estado de administrador
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
            <h2>Register</h2>
            <form>
                <label>
                    Nombre:
                    <input type="text" value={id_admin} onChange={(e) => setId_Admin(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
