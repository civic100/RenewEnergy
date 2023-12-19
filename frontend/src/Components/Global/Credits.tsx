import '../../assets/style/Credits.css';
import Button from '@mui/material/Button';
import "../../assets/style/Button.css";

const Credits = () => {
    return (
        <>
            <hr className="mb-12" />
            <div className="service-catalog__credits-sec text-center pb-2">
                <div className="container">
                    <div className="mb-3">
                        <h2 className="service-catalog__sec-title mb-2">
                            <span>Añade</span>
                            <span className="text-warning">créditos</span>
                            <span>a tu cuenta</span>
                        </h2>
                        <p className="service-catalog__sec-desc">
                            Evita tener que usar tu tarjeta de crédito cada vez que quieras plantar un árbol.
                        </p>
                    </div>
                    <img
                        src="https://tree-nation.com/images/plant/credits-icon.svg"
                        className="service-box__img m-0 mb-3"
                        alt="" />

                    <Button className='btn-color'> ➕ Añadir créditos </Button>
                </div>
            </div>
        </>
    );
};

export default Credits;
