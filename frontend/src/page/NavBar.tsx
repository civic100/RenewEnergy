// NavBarComponent.tsx
import React from 'react';
import AccountMenuAdmin from '../Components/Menu/admin/AccountMenuAdminComponent';
import AccountMenuUser from '../Components/Menu/user/AccountMenuUserComponent';

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
          isAdmin ? <AccountMenuAdmin /> : <AccountMenuUser isAuthenticated={isAuthenticated} onLogout={onLogout} />
        ) : (
          <AccountMenuUser isAuthenticated={isAuthenticated} onLogout={onLogout} />
        )}
      </nav>
    </div>
  );
};

export default NavBar;
