import { Button } from "@mui/material";
import Style from '../../assets/style/Home/SectionHome3.module.css';
import plant from "../../assets/images/plant.svg"
import family from "../../assets/images/offset-family.svg"
import { useState } from 'react';
import DataForm from "./DataForm";
import Pago from "./Pago";

const Planes = () => {

    const [createPopoverAnchorEl, setCreatePopoverAnchorEl] = useState(null);
    const [createPopoverAnchorEl2, setCreatePopoverAnchorEl2] = useState(null);

    const handlePOST = async (event) => {
        setCreatePopoverAnchorEl(event.currentTarget);
    };
    const handlePOST2 = async (event) => {
        setCreatePopoverAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setCreatePopoverAnchorEl(null);
        setCreatePopoverAnchorEl2(null);
    };

    return (
        <>
            <div className={` ${Style.tabcontent} ${Style.px3} ${Style.pb4}`} id="myTabContent">
                <div className={`${Style.tabpane}${Style.fade}${Style.active}${Style.show}`} id="citizen-services" role="tabpanel" aria-labelledby="citizen-services-tab">
                    <div className={Style.row + " " + Style.justifyContentCenter}>
                        <div className={`${Style.colmd8} ${Style.collg4} ${Style.mb4}`}>
                            <div className={`${Style.serviceBox} ${Style.serviceBoxGreen} ${Style.itemBox}`}>
                                <div className={Style.serviceBoxHead}>
                                    <h4 className={Style.serviceBoxTitle}>
                                        <span className={Style.spanSpace}>Aportar</span>
                                        <span className={Style.textPrimary}>Paneles Solares</span>
                                    </h4>
                                    <p className={Style.serviceBoxSub}>Instala y regala paneles solares en todo el mundo en pocos clics.</p>
                                </div>
                                <div className={`${Style.dFlex} ${Style.alignItemsCenter}`}>
                                    <img src={plant} className={Style.serviceBoxImg} alt="Plantar Paneles Solares" />
                                    <div className={Style.serviceBoxFeatures}>
                                        <p className={Style.serviceBoxFeature}>
                                            <i className="fas fa-euro-sign" aria-hidden="true"></i>Desde 0,25 € /panel solar
                                        </p>
                                        <p className={Style.serviceBoxFeature}>
                                            <i className="fas fa-sync" aria-hidden="true"></i>Una vez / Mensual / Anual
                                        </p>
                                    </div>
                                </div>
                                <div className={Style.serviceBoxCtas}>
                                    <Button className='btn-color' onClick={handlePOST}>Instala Paneles Solares </Button>
                                </div>
                            </div>
                        </div>
                        <div className={`${Style.colmd8} ${Style.collg4} ${Style.mb4}`}>
                            <div className={`${Style.serviceBox} ${Style.serviceBoxBlue} ${Style.itemBox}`}>
                                <div className={Style.serviceBoxHead}>
                                    <h4 className={Style.serviceBoxTitle}>
                                        <span className={Style.spanSpace}>Ciudadano</span>
                                        <span className={Style.textPrimary2}>Net Zero</span>
                                    </h4>
                                    <p className={Style.serviceBoxSub}>Obtén un plan mensual y compensa tus emisiones de CO2 de la forma más sencilla.</p>
                                </div>
                                <div className={`${Style.dFlex} ${Style.alignItemsCenter}`}>
                                    <img src={family} className={Style.serviceBoxImg} alt="Ciudadano Net Zero" />
                                    <div className={Style.serviceBoxFeatures}>
                                        <p className={Style.serviceBoxFeature}>
                                            <i className="fas fa-euro-sign" aria-hidden="true"></i>Desde 5 € /mes
                                        </p>
                                        <p className={Style.serviceBoxFeature}>
                                            <i className="fas fa-sync" aria-hidden="true"></i>Automático
                                        </p>
                                    </div>
                                </div>
                                <div className={Style.serviceBoxCtas}>
                                    <Button className='btn-color'onClick={handlePOST2}>  Ciudadano Net Zero </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Pago
                onClose={handleClose}
                anchorEl={createPopoverAnchorEl || createPopoverAnchorEl2}
                tipo={createPopoverAnchorEl ? "pagar1" : "pagar2"}
            />
        </>
    );
}

export default Planes;