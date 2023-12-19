import Style from '../../../assets/style/Home/SectionHome3.module.css';
import Planes from '../../Global/Planes';


export default function SectionHome3() {
    return (
        <div className={Style.homeSec + " " + Style.bgWhite}>
            <div className={Style.container}>
                <div className={Style.homeSecHead + " " + Style.textCenter}>
                    <h2 className={Style.homeH2}>Una plataforma creada para todos</h2>
                    <p className={Style.homeSubtitle1}>Facilitamos la transición a la energía solar y la lucha contra el cambio climático. Te mostramos cómo.</p>
                </div>
                <div>
                    <div className={`nav homePillNav ${Style.homePillNav} mb-4`} role="tablist">
                        <h2 className={Style.homeH2}>Planes</h2>
                    </div>
                    <Planes /> 
                </div>
            </div>
        </div>

    );
}