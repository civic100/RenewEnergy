import Style from "../../../assets/style/Projects/UserProjects.module.css";
import { useEffect, useState } from "react";

import Header from "./Header";
import Filters from "./Filters";
import Project from "./ProjectComponent";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProjectsComponent() {

    const [projects, setProjects] = useState<Projects[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [updated, setUpdated] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState("Por defecto");
    const projectsCount = projects.length;
    const [loading, setLoading] = useState(true);

  interface Projects {
    id_project: number;
    description: string;
    geographic_area: string;
    coordinates: string;
    village_name: string;
    image_url: string;
    is_disabled: boolean;
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/projects");
      if (!response.ok) {
        throw new Error("Error al obtener los datos de paneles projects");
      }

      let data = await response.json();

      // Filtrar proyectos
      if (filterValue !== "") {
        data = data.filter((el: any) => el.village_name.toLowerCase().includes(filterValue.toLowerCase()));
      }
      setProjects(data);
      setUpdated(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!updated) {
      setLoading(true);
      fetchProjects();
    }
  }, [filterValue, updated]);

  const handleFilterChange = (value: any) => {
    setFilterValue(value);
    setUpdated(false);
  };

  const handleSortButtonClick = (orderType: "asc" | "desc") => {
    // Ordenar proyectos por village_name
    const sortedProjects = [...projects].sort((a, b) => {
      if (orderType === "asc") {
        return a.village_name.localeCompare(b.village_name);
      } else {
        return b.village_name.localeCompare(a.village_name);
      }
    });

    setProjects(sortedProjects);
    setDropdownOpen(false);
    setSelectedSortOption(orderType === "asc" ? "Ascendente" : "Descendente");
  };

  return (
    <div className={Style.container}>
      <Header />

      <Filters
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
        handleSortButtonClick={handleSortButtonClick}
        projectsCount={projectsCount}
      />

      <div className={Style.content}>
        {/* Mostrar el icono de carga si está cargando */}
        {loading && (
          <div className={Style.loadingIcon}>
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        )}

        <div className={Style.projectsList}>
          {projects.map((project) => (
            <Project
              key={project.id_project}
              image={project.image_url}
              title={project.village_name}
              numReviews="3"
              description={project.description}
              myContributions="1"
            />
          ))}
        </div>
      </div>
    </div>
  );
}