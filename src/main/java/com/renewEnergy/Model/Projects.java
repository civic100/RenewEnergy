package com.renewEnergy.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Table(name = "projects")
@Entity
public class Projects {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_project")
    private Integer id_project;

    @Column(name = "description")
    private String description;

    @Column(name = "geographic_area")
    private String geographic_area;

    @Column(name = "coordinates")
    private String coordinates;

    @Column(name = "village_name")
    private String village_name;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "is_disabled")
    private Boolean is_disabled;


    public Projects(ProjectsDTO projectsDTO){
        this.id_project = projectsDTO.getId_project();
        this.description = projectsDTO.getDescription();
        this.geographic_area = projectsDTO.getGeographic_area();
        this.coordinates = projectsDTO.getCoordinates();
        this.village_name = projectsDTO.getVillage_name();
        this.image_url = projectsDTO.getImage_url();
    }
}
