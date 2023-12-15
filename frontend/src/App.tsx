// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Projects from './page/user/Projects';
import Contributions from './page/user/Contribution';
import UserPerfil from './page/user/UserPerfil';
import AdminUsers from './page/admin/Users';
import AdminContribution from './page/admin/Contribution';
import AdminProjects from './page/admin/Projects';
import AdminSolarPanels from './page/admin/SolarPanels';
import Home from './page/Home';
import NavBar from './page/NavBar';
import UserLogin from './Components/Login/user/LoginComponent';
import RegisterComponent from './Components/Register/RegisterComponent';
import AdminLogin from './Components/Login/admin/LoginComponent';
import Error404 from './page/Error404';
import Footer from './page/Footer';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (userType: string) => {
    setIsAuthenticated(true);
    setIsAdmin(userType === 'admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };
  console.log(isAuthenticated);
  return (
      <div className="app-container">
        <NavBar isAuthenticated={isAuthenticated}  isAdmin={isAdmin} onLogout={handleLogout}  />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contributions" element={<Contributions />} />


          {/* Rutas de administrador */}
          {isAdmin && (
            <>
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/contribution" element={<AdminContribution />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/solarpanels" element={<AdminSolarPanels />} />
            </>
          )}
          {isAuthenticated && (
            <>
              <Route path='/perfil' element={<UserPerfil />} />
            </>
          )}
          {/* Rutas de inicio de sesión y registro */}
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<UserLogin onLogin={handleLogin} />} />
              <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterComponent onRegister={handleRegister} />} />
            </>
          )}
           <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
  );
};

export default App;
