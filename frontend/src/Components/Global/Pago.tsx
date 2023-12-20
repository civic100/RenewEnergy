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
        project: 0,
        solarpanel: 0,
        plan_name: '',
        amount: null,
        frequency: 'weekly',
        id_user: user.id_user,
    });

    const [projects, setProjects] = useState([]); // Estado para almacenar la lista de proyectos
    const [solarpanels, setSolarpanles] = useState([]); // Estado para almacenar la lista de solar panels

    const handleInputChange = (event) => {
        const value = event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: value,
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

        try {

            const response = await fetch('http://localhost:8080/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan_name: formData.plan_name,
                    amount: formData.amount,
                    frequency: formData.frequency,
                }),
            });

            if (response.ok) {

                const responsetSolarPanel = await fetch(`http://localhost:8080/solarpanels/${formData.solarpanel}`);

                    // Obtener datos del panel solar seleccionado
                    const solarpanelData = await responsetSolarPanel.json();

                    // Calcular generatedenergy y carbonfootprint
                    const nominalpower = solarpanelData.nominalpower; // Reemplaza con el campo real de tu respuesta
                    const efficiency = solarpanelData.efficiency; // Reemplaza con el campo real de tu respuesta

                    const generatedenergy = nominalpower; // Cambia según la fórmula real
                    const carbonfootprint = efficiency * nominalpower; // Cambia según la fórmula real

                    // Guardar generatedenergy y carbonfootprint en el estado o donde lo necesites
                    setFormData((prevData) => ({
                        ...prevData,
                        generatedenergy,
                        carbonfootprint,
                    }));

                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    const day = currentDate.getDate().toString().padStart(2, '0');
                    const formattedDate = `${year}-${month}-${day}`;

                    // Solicitud para energyfootprint

                    const responseProject = await fetch(`http://localhost:8080/projects/${formData.project}`);
                    const responseUser = await fetch(`http://localhost:8080/users/${formData.id_user}`);

                    if (responseProject.ok && responseUser.ok && responsetSolarPanel.ok) {
                        const responseEnergyfootprint = await fetch('http://localhost:8080/energyfootprint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                project: { id_project: formData.project },  // Pasar solo el identificador
                                solarPanel: { id_solarpanel: formData.solarpanel },  // Pasar solo el identificador
                                user: { id_user: formData.id_user },
                                date: formattedDate,
                                carbonfootprint,
                                generatedenergy,
                            }),

                        });
                        console.log(JSON.stringify({
                            project: { id_project: formData.project },  // Pasar solo el identificador
                            solarPanel: { id_solarpanel: formData.solarpanel },  // Pasar solo el identificador
                            user: { id_user: formData.id_user },
                            date: formattedDate,
                            carbonfootprint,
                            generatedenergy,
                        }));

                        if (responseEnergyfootprint.ok) {
                            console.log('Registro exitoso');
                        }

                    }
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
                const response2 = await fetch('http://localhost:8080/solarpanels');
                if (response.ok && response2.ok) {
                    const projectsData = await response.json();
                    const solarpanelsData = await response2.json();
                    setProjects(projectsData);
                    setSolarpanles(solarpanelsData);

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
                                    <option key={project.id_project} value={parseInt(project.id_project)}>
                                        {project.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="register__field">
                            <FontAwesomeIcon icon={faDiagramProject} className="register__icon" />
                            <select
                                name="solarpanel"
                                className="register__select"
                                value={formData.solarpanel}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Selecciona un Solar Panel
                                </option>
                                {solarpanels.map((solarpanel) => (
                                    <option key={solarpanel.id_solarpanel} value={parseInt(solarpanel.id_solarpanel)}>
                                        {solarpanel.model}
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
                                    min={1}
                                    max={300}
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
                                    <option value="5">5 €</option>
                                    <option value="10">10 €</option>
                                    <option value="15">15 €</option>
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
