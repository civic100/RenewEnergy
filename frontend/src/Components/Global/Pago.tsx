import Popover from '@mui/material/Popover';
import "../../assets/style/Button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faDiagramProject, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../assets/style/Pago.css';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/Context/UserContext.tsx';


const Pago = ({ onClose, anchorEl, tipo }) => {

    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        //project: null,
        plan_name: '',
        amount: null,
        frequency: 'weekly',
        //id_user:  user.id_user,
    });

    const [projects, setProjects] = useState([]); // Estado para almacenar la lista de proyectos

    const handleInputChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

    const handleRegister = async () => {
        if (formData.frequency === 'weekly') {
            formData.plan_name = 'Weekly plan';
        }
        else if (formData.frequency === 'monthly') {
            formData.plan_name = 'Monthly plan';
        }
        else if (formData.frequency === 'annual') {
            formData.plan_name = 'Annual plan';
        }

        console.log(JSON.stringify(formData));
        try {
            const response = await fetch('http://localhost:8080/payment/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });



            if (response.ok) {
                console.log('Registro exitoso');
            } else {
                console.error('Error en el registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    // Realizar la solicitud GET al montar el componente para obtener la lista de proyectos
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8080/projects');
                if (response.ok) {
                    const projectsData = await response.json();
                    setProjects(projectsData);
                } else {
                    console.error('Error al obtener la lista de proyectos:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchProjects();
    }, []); // El array vacío asegura que la solicitud se realice solo una vez al montar el componente

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <div className="pago-screen">
                <div className="pago-screen__content">
                    <form className="register">
                        {/* Desplegable de proyectos */}

                        <div className="register__field">
                            <FontAwesomeIcon icon={faDiagramProject} className="register__icon" />
                            <select
                                name="project"
                                className="register__select"
                                value={formData.project}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Selecciona un proyecto
                                </option>
                                {projects.map((project) => (
                                    <option key={project.id_project} value={project.id_project}>
                                        {project.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Resto de los campos */}
                        {tipo === 'pagar1' ? (
                            <div className="register__field">
                                <FontAwesomeIcon icon={faMoneyBill} className="register__icon" />
                                <input
                                    type="number"
                                    className="register__input"
                                    placeholder="Importe"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : tipo === 'pagar2' ? (
                            <div className="register__field">
                                <FontAwesomeIcon icon={faMoneyBill} className="register__icon" />
                                <select
                                    name="amount"
                                    className="register__select"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                        ) : null}
                        <div className="register__field">
                            <select
                                name="frequency"
                                className="register__select"
                                value={formData.frequency}
                                onChange={handleInputChange}
                            >
                                <option value="weekly">Semanal</option>
                                <option value="monthly">Mensual</option>
                                <option value="annual">Anual</option>
                            </select>
                        </div>
                        <button className="button register__submit" type="button" onClick={handleRegister}>
                            <span className="button__text">Pagar</span>
                            <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
                        </button>
                    </form>
                </div>
                <div className="pago-screen__background">
                    <span className="pago-screen__background__shape screen__background__shape4"></span>
                    <span className="pago-screen__background__shape screen__background__shape3"></span>
                    <span className="pago-screen__background__shape screen__background__shape2"></span>
                    <span className="pago-screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </Popover>
    );
};

export default Pago;
