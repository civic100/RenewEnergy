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
          <a href="/home">
            <img src={imgLogo} alt="" />
          </a>
        </div>

        <div className={navBarStyle.items}>
          <div className={navBarStyle.item}>
            <NavLink to="/users" activeClassName="active">
              USUARIOS
            </NavLink>
          </div>
          <div className={navBarStyle.item}>
            <NavLink to="/projects" activeClassName="active">
              PROYECTOS
            </NavLink>
          </div>
          <div className={navBarStyle.item}>
            <NavLink to="/solarpanels" activeClassName="active">
              PANELES
            </NavLink>
          </div>
          <div className={navBarStyle.item}>
            <NavLink to="/contribution" activeClassName="active">
              CONTRIBUCIÓN
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
