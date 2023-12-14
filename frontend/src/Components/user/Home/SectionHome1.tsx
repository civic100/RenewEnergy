import GIF from '../../../assets/images/energia-solar-4.gif';
import Button from '@mui/material/Button';
import "../../../assets/style/Button.css";
import Style from '../../../assets/style/Home/SectionHome1.module.css';

export default function SectionHome1() {
    return (
        <div className={Style.homeheader}>
            <div  className={Style.container}>
                <div className={Style.homeheaderinnercontainer}>
                    <h1 className={Style.homeheadertitle}>Únete a la energía solar ¡Impacto positivo global!</h1>
                    <p className={Style.homeheadersubtitle}>
                    La manera más sencilla para que ciudadanos y empresas contribuyan a la expansión de la energía solar y compensen sus emisiones de CO2, mediante la instalación de paneles solares y la promoción de una huella de carbono neutral
                    </p>

                    <Button className='btn-color'> Contribuir </Button>

                    <div className={Style.homeheadercounter}>
                        <p className={Style.homeheadercountervalue}>3600</p>
                        <p className={Style.homeheadercounterlabel}>paneles solares instalados hasta hoy</p>
                    </div>
                </div>
            </div>
            <div className={Style.homeheaderimgwrap}>
                <img
                    className={Style.homeheaderimg}
                    alt="RenewEnergy por la Energia solar"
                    src={GIF}
                />

            </div>
        </div>
    );
};
