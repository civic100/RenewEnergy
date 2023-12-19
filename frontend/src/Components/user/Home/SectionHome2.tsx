import Style from '../../../assets/style/Home/SectionHome2.module.css';
import Button from '@mui/material/Button';
import "../../../assets/style/Button.css";
import { useNavigate} from 'react-router-dom';

export default function SectionHome2() {
    const navigate = useNavigate(); // Obtén la función de navegación
    const handleContribuirClick = () => {
        // Redirigir a la página de contributions
        navigate('/projects');
    };

    return (
        <div className={`${Style.homeSe} ${Style.bg1}`}>
            <div className={Style.container}>
                <div className={Style.homeSecHead + " " + Style.textCenter}>
                    <h2 className={Style.homeH2}>Objetivo: alcanzar 1 billón de paneles solares para 2050</h2>
                    <p className={Style.homeSubtitle1}>
                        No se puede solucionar el cambio climático sin abordar la transición a la energía renovable. Descubre nuestro{' '}
                        <a href="https://tree-nation.com/es/proyectos-de-siembra-de-arboles/inside-tree-nation/articulo/19297-on-a-mission-to-plant-1-trillion-trees-by-2050" className={Style.previewListener}>
                            Plan Maestro
                        </a>{' '}
                        para alcanzar este imponente objetivo.
                    </p>
                </div>
                
                <div className={Style.textCenter}>
                    <Button className='btn-color' onClick={handleContribuirClick}> Proyectos </Button>
                </div>
            </div>
        </div>

    );
}

