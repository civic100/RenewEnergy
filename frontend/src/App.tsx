import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Error404 from './page/Error404';
import SolarPanels from './page/SolarPanels';
import Home from './page/Home';
import Login from './Components/Login/LoginComponent';
import NavBarAdmin from './page/NavBarAdmin';
import NavBarUser from './page/NavBarUser';

const App: React.FC = () => {

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/" element={<NavBarAdmin />}>
          <Route path="/solarpanels" element={<SolarPanels />} />
            {/* Añadir rutas para componentes de administrador, por ejemplo: */}

          </Route>
          <Route path="*" element={<Error404 />} />
      </Routes>
    );
  } else {
    // Si el usuario es un administrador, redirige a la página de administrador o muestra componentes específicos de administrador
    return (
      <Routes>
        <Route path="/" element={<NavBarUser />}>
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsAdmin={setIsAdmin} />}
          />
            {/* Añadir rutas para componentes de usuario normal, por ejemplo: */}
          </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    );
  }
}

export default App;
