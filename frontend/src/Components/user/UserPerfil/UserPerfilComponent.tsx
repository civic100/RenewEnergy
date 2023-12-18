import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user/Context/UserContext';
import '../../../assets/style/UserPerfil/userPerfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSolarPanel, faCloud } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import UserPerfilPlaca from './UserPerfilPlaca.tsx';
import UserPerfilEnergy from './UserPerfilEnergy.tsx';

const UserProfile: React.FC = () => {
    // Obtén el contexto y el valor del usuario
    const { user } = useContext(UserContext);
    const [updated, setUpdated] = useState(false);
    const [datoPlaca, setDatoPlaca] = useState([]);
    const [datoEnergy, setDatoEnergy] = useState<any>(null);
    const [solar, setSolar] = useState(false);
    const [energy, setEnergy] = useState(false);


    useEffect(() => {
        const fetchDato = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/energyfootprints/${user.id_user}`);
                const response2 = await fetch(`http://localhost:8080/users/sumenergy/${user.id_user}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de placa');
                }
                if (!response2.ok) {
                    throw new Error('Error al obtener los datos de energy');
                }
                const data = await response.json();
                const data2 = await response2.json();

                setDatoPlaca(data);
                setDatoEnergy(data2);
                setUpdated(true);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!updated) {
            fetchDato();
        }
    }, [datoPlaca, datoEnergy]);

    const handleSolar = async () => {

        if (energy) {
            setEnergy(false);
        }
        setSolar(true);
    }
    const handleEnergy = async () => {

        if (solar) {
            setSolar(false);
        }
        setEnergy(true);
    }

    return (
        <>
            <div className='background'>
                <div className='perfil-container'>
                    <img
                        src={`http://localhost:8080/images/${user.image_url}`}
                        className='perfil'
                    />
                    <div>
                        <p className='texto'>PLACA SOLAR DE</p>
                        <p className='texto'><b>{user.name}</b></p>
                    </div>
                    <div className='iconos'>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faSolarPanel} className='iconito' />
                                <p>

                                    {datoPlaca.length}
                                </p>
                            </li>
                            {datoEnergy && (
                                <li>
                                    <FontAwesomeIcon icon={faCloud} className='iconito' />
                                    <p>
                                        {datoEnergy.sumCarbonFootprint} CO2
                                    </p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='link'>
                <Button onClick={handleSolar}>Placa Solar</Button>
                <Button onClick={handleEnergy}>Energy</Button>
            </div>

            <div className='contenido'>
                {solar ? (
                    <UserPerfilPlaca dato={datoPlaca}/>
                ) : energy ? (
                    <UserPerfilEnergy dato={datoPlaca}/>
                ) : null}
            </div>
        </>
    );
};

export default UserProfile;

/*

*/