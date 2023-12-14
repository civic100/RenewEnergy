// NavBarComponent.tsx
import React, { useState, useEffect } from 'react';
import AccountMenuAdmin from "../Components/Menu/admin/AccountMenuAdminComponent";
import AccountMenuUser from "../Components/Menu/user/AccountMenuUserComponent";
import { Link } from 'react-router-dom';

interface NavBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, onLogout }) => {

  return (
    <div className="menu">
      <nav>
        {isAuthenticated ? (
          <AccountMenuAdmin />
        ) : (
          <AccountMenuUser />
        )}
        <ul>

          {isAuthenticated ? (
            <li onClick={onLogout}>Cerrar sesión</li>
          ) : (
            <>

            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
