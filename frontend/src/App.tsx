import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import NavBarAdmin from './page/NavBarAdmin';
import NavBarUser from './page/NavBarUser';


const App: React.FC = () => {

  const [isAdmin,   setIsAdmin] = useState<boolean>(false);

  if (isAdmin) {
    console.log("SOY ADMIN");
    return (
      <NavBarAdmin />
    );
  } else {
    console.log("SOY USUARIO");
    // Si el usuario es un administrador, redirige a la página de administrador o muestra componentes específicos de administrador
    return (
      <NavBarUser />
    );
  }
}

export default App;
