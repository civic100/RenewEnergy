import Style from '../../../assets/style/Home/SectionHome1.module.css';
import GIF from '../../../assets/images/energia-solar.gif';

export default function SectionHome1() {
    return(
        <div className={Style.container}>
            <div className={Style.sections}>
                <div className={Style.row}>
                    <div className={Style.section1}>
                        <div className={Style.title}>Únete a nosotros para reforestar el mundo</div>
                    </div>
                    <div className={Style.section2}>
                        <img src={GIF} alt="" />
                    </div>
                </div>

                <div className={Style.row}>
                    <div className={Style.section3}>
                        <div className={Style.description}>
                            Juntos, podemos construir un mañana más brillante, impulsado por la energía limpia del sol. ¡Haz la diferencia hoy!"
                        </div>
                        <div className={Style.button}>
                            <div className="">
                                Contribuir
                            </div>
                        </div>
                    </div>
                {/*
                <div className={Style.section4}>
                    <h1>b</h1>
                </div>
            */}
                </div>
            </div>
        </div>
    );
}