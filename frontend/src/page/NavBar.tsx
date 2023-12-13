// NavBarComponent.tsx
import React from 'react';
import AccountMenuAdmin from '../Components/Menu/admin/AccountMenuAdminComponent';
import AccountMenuUser from '../Components/Menu/user/AccountMenuUserComponent';
import { Link } from 'react-router-dom';

interface NavBarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, isAdmin, onLogout }) => {
  return (
    <div className="menu">
      <nav>
        {isAuthenticated ? (
          isAdmin ? <AccountMenuAdmin /> : <AccountMenuUser isAuthenticated={isAuthenticated} />
        ) : (
          <AccountMenuUser isAuthenticated={isAuthenticated}/>
        )}
        <ul>
          {isAuthenticated && (
            <li onClick={onLogout}>Cerrar sesión</li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
