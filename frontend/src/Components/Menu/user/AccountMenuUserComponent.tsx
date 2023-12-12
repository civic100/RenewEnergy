import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import navBarStyle from "../../../assets/style/NavBar.module.css";

import Home from "../../../page/Home";
import Projects from "../../../page/user/Projects";
import Contribution from "../../../page/user/Contribution";
import Register from "../../Register/RegisterComponent";
import Login from "../../Login/user/LoginComponent";
import Error404 from "../../../page/Error404";

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
              <Link to='/home'>
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
      {/*
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contribute' element={<Projects />} />
            <Route path='/register' element={<Projects />} />
            <Route path='/login' element={<Projects />} />
    </Routes> */}

          <Routes>
            <Route path="/">
            <Route path='/home' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contribute' element={<Contribution />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setIsAdmin={true} />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
    );
}