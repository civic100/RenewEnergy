import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';  // Importa tu archivo de estilos aquí

import Projects from './page/user/Projects';
import Contributions from './page/user/Contribution';
import AdminUsers from './page/admin/Users';
import AdminContribution from './page/admin/Contribution';
import AdminProjects from './page/admin/Projects';
import AdminSolarPanels from './page/admin/SolarPanels';
import Login from './Components/Login/user/LoginComponent';
import Register from './Components/Register/RegisterComponent';
import Home from './page/Home';
import NavBar from './page/NavBar';
import AdminLogin from './Components/Login/admin/LoginComponent';



const App: React.FC = () => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = (userType: string) => {
    setIsAuthenticated(true);
    setIsAdmin(userType === 'admin');
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Lógica de cierre de sesión...
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (

      <div className="app-container">
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        {/* Definir rutas protegidas y sus componentes */}
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/projects" Component={Projects} />
          <Route path="/contributions" Component={Contributions} />
          {/* Otras rutas de usuario normal... */}
          {isAdmin && (
            <>
              <Route path="/admin/users" Component={AdminUsers} />
              <Route path="/admin/contribution" Component={AdminContribution} />
              <Route path="/admin/projects" Component={AdminProjects} />
              <Route path="/admin/solarpanels" Component={AdminSolarPanels} />
              {/* Otras rutas de administrador... */}
            </>
          )}
          {/* Rutas de inicio de sesión y registro */}
          <Route path="/login"  element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />}  />
        </Routes>
      </div>

  );
}

export default App;
