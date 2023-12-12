// App.tsx
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './page/NavBar';
import Home from './page/Home';
import Projects from './page/admin/Projects';
import Contribution from './page/admin/Contribution';
import Register from './Components/Register/RegisterComponent';
import Login from './Components/Login/admin/LoginComponent';
import Error404 from './page/Error404';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedCookie: null | string = localStorage.getItem('isLoggedIn');

    if (isLoggedCookie === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // Agrega esto para asegurar que esté en false si no está autenticado
    }
  }, []);

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />

        {isLoggedIn ? (
          <>
            {/* Cuando seas admin */}
            <Route path='/projects' element={<Projects />} />
            <Route path='/contribute' element={<Contribution />} />
          </>
        ) : (
          // Redirigir a la página de inicio de sesión si el usuario no está autenticado
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        )}
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
