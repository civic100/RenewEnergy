import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import navBarStyle from "../../../assets/style/NavBar.module.css";
import IconProfile from "../../Global/IconProfile";
import imgLogo from "../../../assets/images/logo.png"

export default function AccountMenuAdmin() {
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
                <Link to='/projects'>PROYECTOS</Link>
              </div>
              <div className={navBarStyle.item}>
                <Link to='/contribute'>CONTRIBUIR</Link>
              </div>
              <div className={navBarStyle.item}>
                <Link to='/register'>REGISTRARSE</Link>
              </div>
              <div className={navBarStyle.login}>
                <Link to='/login'>INICIAR SESIÓN</Link>
              </div>

              {/* SI ESTÁ LOGEADO MOSTRAR EL ICONO PROFILE*/}
              <div className='item'>
                <IconProfile />
              </div>
            </div>
          </div>
        </div>
    );
}