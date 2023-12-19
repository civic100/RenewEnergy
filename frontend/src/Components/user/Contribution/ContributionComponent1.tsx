import React from 'react';
import '../../../assets/style/Cntribution/Contributions.css'
const ContributionComponent = () => {
    return (
        <div className="service-catalog-header">
            <div className="container">
                <h1 className="service-catalog-header__title display-2">
                    Selecciona una opción de plantación
                </h1>
                <p className="service-catalog-header__subtitle">
                    Escoge la herramienta que mejor corresponda a tu compromiso medioambiental
                </p>
            </div>
            <div className="service-catalog-header__background">
                <title>forest-illustration</title>
                <image
                    id="forest-illustration-layer-6-copy"
                    className="rellax"
                    data-rellax-speed="-5"
                    x="0"
                    y="85"
                    width="1553"
                    height="553"
                    xlinkHref=""
                    style={{ transform: 'translate3d(0px, 0px, 0px)' }}
                ></image>
            </div>
        </div>
    );
};

export default ContributionComponent;
