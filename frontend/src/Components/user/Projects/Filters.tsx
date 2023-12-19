import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown,faMagnifyingGlass,faSort } from "@fortawesome/free-solid-svg-icons";
import Style from "../../../assets/style/Projects/Filters.module.css";

export default function Filters() {
    return (
      <div className={Style.filtersSection}>
        <div className={Style.filtersContent}>
          <div className={Style.items}>
            <div className={Style.item + " " + Style.nameFilter}>
              <input type="text" placeholder="Buscar por nombre" />
              <span>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </div>

          </div>
  
          <div className={Style.sortFilters}>
            <div className={Style.sortOption}>
              <button className={Style.sortButton}>
                <FontAwesomeIcon icon={faSort} />
                <span>Ordenar: Por defecto</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
            <div className={Style.sortResult}>
              <span>Mostrando x proyectos</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  