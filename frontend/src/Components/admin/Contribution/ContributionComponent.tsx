import React, { useEffect, useState } from 'react';
import DataTable from '../../Global/DataTable.tsx';
import DataForm from '../../Global/DataForm.tsx';
import useContributionState from './ContributionState.tsx';
import BtnCreate from '../../Button/BtnCreateComponent.tsx';
import axios from 'axios';

const ContributionComponent = () => {
    const {
        contributions,
        setContributions,
        editPopoverAnchorEl,
        setEditPopoverAnchorEl,
        createPopoverAnchorEl,
        setCreatePopoverAnchorEl,
        editedContribution,
        setEditedContribution,
        clearEditedContribution,
        columns,
        fields
    } = useContributionState();
    const [updated, setUpdated] = useState(false);
    const [selectedImageFromForm, setSelectedImageFromForm] = useState(null);
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',  // Reemplaza con la URL de tu servidor
    });

    useEffect(() => {
        const fetchContribution = async () => {
            try {
                const response = await fetch('http://localhost:8080/payment');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de paneles solares');
                }

                const data = await response.json();
                setContributions(data);
                setUpdated(true); // Marcar que la actualización se ha realizado
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!updated) {
            fetchContribution(); // Realizar la llamada solo si no se ha actualizado
        }
    }, [contributions]);

    const handlePUT = (event, id) => {
        const contributionToEdit = contributions.find((contribution) => contribution.id_contributionplan === id);
        setEditedContribution(contributionToEdit);
        setEditPopoverAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setEditPopoverAnchorEl(null);
        setCreatePopoverAnchorEl(null);
        clearEditedContribution();
    };

    const handleFormChange = (event) => {
        setEditedContribution((prevContribution) => ({
            ...prevContribution,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            if (editedContribution.id_contributionplan) {
                // Si editedContribution.id_contributionplan está presente, realiza una solicitud PUT
                const response = await fetch(`http://localhost:8080/payment/${editedContribution.id_contributionplan}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedContribution),
                });

                if (!response.ok) {
                    throw new Error('Error al editar el payment');
                }
            } else {
                // Si editedContribution.id_contributionplan está ausente, realiza una solicitud POST
                const response = await fetch('http://localhost:8080/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedContribution),
                });

                if (!response.ok) {
                    throw new Error('Error al agregar el payment');
                }

                // Verifica si la respuesta tiene datos antes de intentar analizarla
                const responseData = await response.text();
                const newContribution = responseData ? JSON.parse(responseData) : null;

                if (newContribution) {
                    // Agrega la nueva payment a la lista
                    setContributions([...contributions, newContribution]);
                }
            }

            // Actualizar la lista de payment después de editar o agregar
            const updatedContributions = contributions.map((contribution) =>
                contribution.id_contribution === editedContribution.id_contribution ? editedContribution : contribution
            );
            setContributions(updatedContributions);
            setUpdated(false);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePOST = async (event) => {
        // Al hacer clic en el botón "Create", establece el estado de editedPanel a un nuevo objeto
        clearEditedContribution();

        // Abre el Popover para ingresar los detalles de la nueva placa solar
        setCreatePopoverAnchorEl(event.currentTarget);
    };

    return (
        <>
            <BtnCreate onClick={handlePOST} />
            <DataTable columns={columns} data={contributions} onEnable={false} onEdit={handlePUT} idKey="id_contributionplan" />
            <DataForm fields={fields}
                editedType={editedContribution.id_contributionplan ? 'Edit' : 'Add'}
                editedData={editedContribution}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onClose={handleClose}
                anchorEl={editPopoverAnchorEl || createPopoverAnchorEl}
                onImageSubmit={setSelectedImageFromForm} 
                onDeleteImage={false}/>
        </>
    );
};

export default ContributionComponent;