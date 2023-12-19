import Style from '../../../assets/style/Projects/Header.module.css'

function Header() {
  return (
    <div className={Style.headerProjects}>
      <div className={Style.headerContent}>
        <h1 className={Style.headerTitle}>Proyectos de instalación</h1>
        <p className={Style.headerDescription}>
          Descubre todos los proyectos de siembra de árboles en los que puedes
          plantar{" "}
          <a
            href="https://kb.tree-nation.com/es/knowledge/los-proyectos"
            className="subtitle__kb-icon"
            target="_blank"
          >
            <i className="fas fa-info-circle" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Header;
