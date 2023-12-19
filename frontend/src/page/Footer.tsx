import "../assets/style/Footer.css"
import ods from '../assets/images/sdg-13-single.gif';
import icon from '../assets/images/logo-icon.png';
function Footer() {

    return (
        <footer className="footer-container">
          <div className="footer-left">
            <img  className="img-footer" src={icon} alt="Logo de la empresa" />
          </div>
          <div className="footer-center">
            <p>Texto del pie de página</p>
          </div>
          <div className="footer-right">
            <img className="img-footer" src={ods} alt="GIF a la derecha" />
          </div>
        </footer>
      );
}

export default Footer;
