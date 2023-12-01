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
@Table(name = "userprojects")
@Entity
public class UsersProjects {
    
    @EmbeddedId
    private UsersProjectId id;

    @ManyToOne
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "id_project", insertable = false, updatable = false)
    private Projects project;

    @ManyToOne
    @JoinColumn(name = "contribution_plan_id", insertable = false, updatable = false)
    private ContributionPlans contributionPlans;

    @Embeddable
    @Data
    public static class UsersProjectId implements Serializable {
        @Column(name = "id_user")
        private Integer userId;

        @Column(name = "id_project")
        private Integer projectId;

        @Column(name = "contribution_plan_id")
        private Integer paymentId;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            UsersProjectId that = (UsersProjectId) o;

            return Objects.equals(userId, that.userId) && 
            Objects.equals(projectId, that.projectId)  &&
            Objects.equals(paymentId, that.paymentId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, projectId, paymentId);
        }

        public UsersProjectId(Integer userId, Integer projectId, Integer paymentId) {
            this.userId = userId;
            this.projectId = projectId;
            this.paymentId = paymentId;
        }

        public UsersProjectId(){

        }
    }

    public UsersProjects(UsersProjectId userProjectId, Users users, Projects projects,
            ContributionPlans contributionPlans) {
                this.id = userProjectId;
                this.user = users;
                this.project = projects;
                this.contributionPlans = contributionPlans;
    }

    public UsersProjects(){
        
    }
}

