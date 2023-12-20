import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort, faArrowUpWideShort, faChevronDown,faMagnifyingGlass,faSort } from "@fortawesome/free-solid-svg-icons";
import Style from "../../../assets/style/Projects/Filters.module.css";
import { useState } from "react";

export default function Filters({ filterValue, handleFilterChange, handleSortButtonClick, projectsCount}: { filterValue:any, handleFilterChange:any, handleSortButtonClick:any, projectsCount:any}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Por defecto");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default");

  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSortOptionClick = (option: string) => {
    if (option === "asc" || option === "desc") {
      setSelectedSortOption(`Ordenar: ${option === "asc" ? "Ascendente" : "Descendente"}`);
      setSortOrder(option as "asc" | "desc");
      handleSortButtonClick(option);
      setDropdownOpen(false);
    } else {
      setSelectedSortOption("Por defecto");
      setSortOrder("default");
      handleSortButtonClick("default");
      setDropdownOpen(false);
    }
  };

  
  return (
      <div className={Style.filtersSection}>
      <div className={Style.filtersContent}>
        <div className={Style.items}>
          <div className={Style.item + " " + Style.nameFilter}>
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={filterValue}
              onChange={(e) => handleFilterChange(e.target.value)}
            />
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
        </div>

        <div className={Style.sortFilters}>
          <div className={Style.sortOption}>
            <div className={Style.sortButton} onClick={toggleDropdown}>
              <FontAwesomeIcon icon={sortOrder === "asc" ? faArrowUpWideShort : sortOrder === "desc" ? faArrowDownWideShort : faSort} />
              <span>Ordenar: {selectedSortOption}</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>

            {dropdownOpen && (
              <div className={Style.dropdown}>
                <button className={Style.dropdownOption} onClick={() => handleSortOptionClick("Por defecto")}>
                  <FontAwesomeIcon icon={faSort} /> Por defecto
                </button>
                <button className={Style.dropdownOption} onClick={() => handleSortOptionClick("asc")}>
                  <FontAwesomeIcon icon={faArrowUpWideShort} /> Ascendente
                </button>
                <button className={Style.dropdownOption} onClick={() => handleSortOptionClick("desc")}>
                  <FontAwesomeIcon icon={faArrowDownWideShort} /> Descendente
                </button>
              </div>
            )}
          </div>
          <div className={Style.sortResult}>
            <span>Mostrando <b>{projectsCount}</b> proyecto{projectsCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
    );
  }
  