import Style from "../../../assets/style/Projects/UserProjects.module.css";
import useProjectsState from "../../admin/Projects/useProjectsState";
import { useEffect, useState } from "react";

import Header from "./Header";
import Filters from "./Filters";
import Project from "./ProjectComponent";

let filters = {
  name: ""
}

export default function ProjectsComponent() {
  interface Projects {
    id_project: number;
    description: string;
    geographic_area: string;
    coordinates: string;
    village_name: string;
    image_url: string;
    is_disabled: boolean;
  }

  const [projects, setProjects] = useState<Projects[]>([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/projects");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de paneles projects");
        }

        let data: Projects[] = await response.json();
        
        data = data.filter((el) => el.is_disabled == true);

        if(filters.name != ""){
          data = data.filter((el) => el.village_name.includes(filters.name));
        }

        setProjects(data);
        setUpdated(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (!updated) {
      fetchProjects();
    }
  }, [projects]);

  return (
    <div className={Style.container}>
      <Header />

      <Filters />

      <div className={Style.content}>
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