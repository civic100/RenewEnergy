package com.renewEnergy.Model;

import lombok.Data;

@Data
public class ProjectsDTO {

    private Integer id_project;
    private String description;
    private String geographic_area;
    private String coordinates;
    private String village_name;
    private String image_url;

    public ProjectsDTO(Projects projects){
        this.id_project = projects.getId_project();
        this.description = projects.getDescription();
        this.geographic_area = projects.getGeographic_area();
        this.coordinates = projects.getCoordinates();
        this.village_name = projects.getVillage_name();
        this.image_url = projects.getImage_url();
    }

    public ProjectsDTO() {
    }
}
