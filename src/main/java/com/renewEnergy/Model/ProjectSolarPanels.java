package com.renewEnergy.Model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "projectsolarpanels")
@Entity
public class ProjectSolarPanels {
    
    @EmbeddedId
    private  ProjectSolarPanelId id;

    @ManyToOne
    @JoinColumn(name = "id_project")
    private Projects project;

    @ManyToOne
    @JoinColumn(name = "id_solarpanel")
    private SolarPanels solarPanel;


    @Embeddable
    @Data
    public static class ProjectSolarPanelId implements Serializable{
        @Column(name = "id_project", insertable = false, updatable = false)
        private Integer projectId;
    
        @Column(name = "id_solarpanel", insertable = false, updatable = false)
        private Integer solarpanelId;

        @Override
        public boolean equals(Object object){
            if (this == object) return true;
            if (object == null || getClass() != object.getClass()) return false;

            ProjectSolarPanelId that = (ProjectSolarPanelId) object;

            return Objects.equals(projectId, that.projectId) &&
            Objects.equals(solarpanelId, that.solarpanelId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(projectId, solarpanelId);
        }

        public ProjectSolarPanelId(Integer projectId, Integer solarpanelId){
            this.projectId = projectId;
            this.solarpanelId = solarpanelId;
        }

        public ProjectSolarPanelId(){

        }
    }

    public ProjectSolarPanels(ProjectSolarPanelId projectSolarPanelId, Projects projects, SolarPanels solarPanels){

        this.id = projectSolarPanelId;
        this.project = projects;
        this.solarPanel = solarPanels;
    }
    public ProjectSolarPanels(){
        
    }
}
