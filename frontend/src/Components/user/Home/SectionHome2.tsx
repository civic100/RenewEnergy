import React from "react";
import Style from '../../../assets/style/Home/SectionHome2.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolarPanel } from "@fortawesome/free-solid-svg-icons";

export default function SectionHome2() {
    return(
        <div className={Style.objetiveSection}>

                <div className={Style.title}>
                    OBJETIVO
                </div>
            <div className={Style.content}>

                <p className={Style.description}>
                    Conectando un futuro sostenible: Nuestro compromiso es impulsar la adopción masiva de energía solar, transformando cada instalación en un paso hacia un mundo más limpio y energéticamente independiente.
                </p>

                <div className={Style.sections}>
                    <section className={Style.monthSection}>
                        <div className={Style.icon}>
                        <FontAwesomeIcon icon={faSolarPanel} size="2xl" style={{color: "#374771"}}/>
                        </div>
                        <div className={Style.info}>
                            <p>2.130 placas instaladas</p>
                            <div>ESTE MES</div>
                        </div>

                    </section>

                    <section className={Style.yearSection}>
                        <div className={Style.icon}>
                            <FontAwesomeIcon icon={faSolarPanel} size="2xl" style={{color: "#374771"}}/>
                            <FontAwesomeIcon icon={faSolarPanel} size="2xl" style={{color: "#374771"}}/>
                            <FontAwesomeIcon icon={faSolarPanel} size="2xl" style={{color: "#374771"}}/>
                        </div>
                        <div className={Style.info}>
                            <p>17.453 placas instaladas</p>
                            <div>ESTE AÑO</div>
                        </div>

                    </section>
                </div>

            </div>
        </div>
    );
}

