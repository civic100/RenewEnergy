import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import navBarStyle from '../../../assets/style/NavBar.module.css';

import Projects from "../../../page/admin/Projects";
import SolarPanels from "../../../page/admin/SolarPanels";
import Home from "../../../page/Home";
import Error404 from "../../../page/Error404";
import Users from "../../../page/admin/Users";
import Contribution from "../../../page/admin/Contribution";

import IconProfile from "../../Global/IconProfile";
import imgLogo from "../../../assets/images/logo.png"

export default function AccountMenuAdmin(){
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
                <Link to='/users'>USUARIOS</Link>
              </div>
              <div className={navBarStyle.item}>
                <Link to='/projects'>PROYECTOS</Link>
              </div>
              <div className={navBarStyle.item}>
                <Link to='/solarpanels'>PANELES</Link>
              </div>
              <div className={navBarStyle.item}>
                <Link to='/contribution'>CONTRIBUCIÓN</Link>
              </div>
              <div className='item'>
                <IconProfile />
              </div>
    
            </div>
    
          </div>

          
          <Routes>
            <Route path="/">
            <Route path='/home' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/users' element={<Users />} />
            <Route path='/solarpanels' element={<SolarPanels />} />
            <Route path='/contribution' element={<Contribution />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      )
}