import "../assets/style/Footer.css"
import ods1 from '../assets/images/ods/S-WEB-Goal-07-200x200.png';
import ods2 from '../assets/images/ods/S-WEB-Goal-09-200x200.png';
import ods3 from '../assets/images/ods/S-WEB-Goal-11-200x200.png';
import ods4 from '../assets/images/ods/S-WEB-Goal-13-200x200.png';
import icon from '../assets/images/logo-icon.png';
import linkedinLogo from '../assets/images/logo-linkedin.png'; // Ajusta la ruta según la ubicación de tus archivos de imagen
import githubLogo from '../assets/images/logo-github.webp'; // Ajusta la ruta según la ubicación de tus archivos de imagen

function Footer() {

  return (
    <footer className="footer-container">
      <div className="footer-left">
        <img className="img-footer-1" src={icon} alt="Logo de la empresa" />
      </div>
      <div className="footer-center-1">
        <div className="footer-column">
          <img className="img-footer-logo" src={linkedinLogo} alt="LinkedIn" />
          <ul>
            <li><a href="https://www.linkedin.com/in/adrian-villacis-333758208/" target="blanck">Adrian Villacis</a></li>
            <li><a href="https://www.linkedin.com/in/xiaochao-ying-727137225/" target="blanck">Xiaochao Ying</a></li>
            <li><a href="https://www.linkedin.com/in/lopez-lopez-victor/" target="blanck">Víctor López</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-center-2">
        <div className="footer-column">
          <img className="img-footer-logo" src={githubLogo} alt="GitHub" />
          <ul>
            <li><a href="https://github.com/villacisa16" target="blanck">villacisa16</a></li>
            <li><a href="https://github.com/Xiaochaoy" target="blanck">Xiaochaoy</a></li>
            <li><a href="https://github.com/civic100" target="blanck">civic100</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-right">
       
        <a href="https://www.un.org/sustainabledevelopment/es/energy/" target="blanck"><img className="img-footer-2" src={ods1} alt="ods 1" /> </a>
        <a href="https://www.un.org/sustainabledevelopment/es/infrastructure/" target="blanck"><img className="img-footer-2" src={ods2} alt="ods 2" /> </a>
        <a href="https://www.un.org/sustainabledevelopment/es/cities/" target="blanck"><img className="img-footer-2" src={ods3} alt="ods 3" /> </a>
        <a href="https://www.un.org/sustainabledevelopment/es/climate-change-2/" target="blanck"><img className="img-footer-2" src={ods4} alt="ods 4" /> </a>
      </div>
    </footer>
  );
}

export default Footer;
