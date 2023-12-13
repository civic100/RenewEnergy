// AccountMenuAdmin.tsx

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import navBarStyle from "../../../assets/style/NavBar.module.css";
import IconProfile from "../../Global/IconProfile";
import imgLogo from "../../../assets/images/logo.png";

interface AccountMenuUserProps {
  isAuthenticated: boolean;
}

const AccountMenuUser: React.FC<AccountMenuUserProps> = ({ isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={navBarStyle.node}>
      <div className={navBarStyle.container}>
        <div className={navBarStyle.logo}>
          <Link to='/'>
            <img src={imgLogo} alt="" />
          </Link>
        </div>
        <div className={navBarStyle.items}>
          <div className={navBarStyle.item}>
            <Link to='/projects'>Proyectos</Link>
          </div>
          <div className={navBarStyle.item}>
            <Link to='/contribute'>Contribuir</Link>
          </div>
          {/* Ocultar cuando esté autenticado */}
          {!isAuthenticated && (
            <>
              <div className={navBarStyle.item}>
                <Link to='/register'>Registrarse</Link>
              </div>
              <div className={navBarStyle.login}>
                <Link to='/login'>Iniciar Sisión</Link>
              </div>
            </>
          )}
           {/* SI ESTÁ LOGEADO MOSTRAR EL ICONO PROFILE*/}
          {isAuthenticated && (
            <>
              <div className='item'>
                <IconProfile />
              </div>
            </>
          )}
         
          
        </div>
      </div>
    </div>
  );
};

export default AccountMenuUser;
