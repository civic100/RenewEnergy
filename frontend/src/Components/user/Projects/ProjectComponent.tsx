import React from "react";
import Style from "../../../assets/style/Projects/Project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

function Project(props: any){
    let title = props.title;
    let numReviews = props.numReviews;
    let description = props.description;
    let myContributions = props.myContributions;
    let img = props.image;

    return(
        <section className={Style.project}>
            <div className={Style.imgProject}>
              <img src={`http://localhost:8080/images/${img}`} alt="" />
            </div>

            <div className={Style.projectContent}>
              <div className={Style.titleProject}>
                <span>{ title }</span>{" "}
                {/* Añadir Titulo desde JS */}
              </div>
              <div className={Style.review}>
                <div className={Style.starIcons}>
                  <FontAwesomeIcon
                    className={Style.starIcon}
                    icon={faStar}
                    style={{ color: "" }}
                  />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfStroke} />
                </div>
                <span>{numReviews} Reseñas</span> {/* Añadir número de reseñas desde JS */}
              </div>
              <div className={Style.descriptionProject}>
                <span>{ description }</span>
                {/* Añadir Descripción desde JS */}
              </div>

              <div className={Style.contributionButtons}>
                <Button className="btn-color">Aportar desde 0,50€</Button>  {/* AÑADIR VALOR DE IMPORTE MÍNIMO DESDE JS */}
                <Button className="btn-border-color">Seguir proyecto</Button>
              </div>

              <div className={Style.myContribution}>
                <div className={Style.myContributionNumber}>
                  <FontAwesomeIcon icon={faCoins} />
                  <span>{ myContributions }</span> {/* Añadir numero de aportaciones desde JS */}
                </div>
                <span>aportaciones en este proyecto</span>
              </div>
            </div>
          </section>
    );
}

export default Project;