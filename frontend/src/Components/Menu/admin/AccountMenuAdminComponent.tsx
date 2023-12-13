// AccountMenuAdmin.jsx
import { NavLink } from 'react-router-dom';
import navBarStyle from '../../../assets/style/NavBar.module.css';
import IconProfile from '../../Global/IconProfile';
import imgLogo from '../../../assets/images/logo.png';


export default function AccountMenuAdmin() {
  

  return (
    <div className="container">
      <div className={navBarStyle.container}>
        <div className={navBarStyle.logo}>
          <a href="/">
            <img src={imgLogo} alt="" />
          </a>
        </div>

        <div className={navBarStyle.items}>
          <div className={navBarStyle.item}>
            <NavLink to="/admin/users" >
              Usuarios
            </NavLink>
          </div>
          <div className={navBarStyle.item}>
            <NavLink to="/admin/projects">
              Proyectos
            </NavLink>
          </div>
          <div className={navBarStyle.item}>
            <NavLink to="/admin/solarpanels" >
              Paneles Solares
            </NavLink>
          </div>
          <div className={navBarStyle.item}>
            <NavLink to="/admin/contribution">
              Contribución
            </NavLink>
          </div>
          <div className="item">
            <IconProfile />
          </div>
        </div>
      </div>
    </div>
  );

}


