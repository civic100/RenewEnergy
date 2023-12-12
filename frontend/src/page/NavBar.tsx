// NavBarComponent.tsx
import React, { useState, useEffect } from 'react';
import AccountMenuAdmin from "../Components/Menu/admin/AccountMenuAdminComponent";
import AccountMenuUser from "../Components/Menu/user/AccountMenuUserComponent";

const NavBar = () => {
  // Aquí puedes inicializar el estado como false
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Al montar el componente, verifica si el usuario está autenticado
    const isLoggedCookie: null | string = localStorage.getItem('isLoggedIn');

    // Solo establece el estado si isLoggedCookie es 'true'
    if (isLoggedCookie === 'true') {
      setIsLogged(true);
    }
  }, []);

  return (
    <div className="menu">
      <nav>
        {isLogged ? <AccountMenuAdmin /> : <AccountMenuUser />}
      </nav>
    </div>
  );
}

export default NavBar;
