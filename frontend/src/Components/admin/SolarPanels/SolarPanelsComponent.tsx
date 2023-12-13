import React, { useEffect, useState } from 'react';
import DataTable from '../../Global/DataTable.tsx';
import DataForm from '../../Global/DataForm.tsx';
import useSolarPanelState from './SolarPanelsState.tsx';
import BtnCreate from '../../Button/BtnCreateComponent.tsx';
import axios from 'axios';


const SolarPanelsComponent = () => {
    const {
        solarPanels,
        setSolarPanels,
        editPopoverAnchorEl,
        setEditPopoverAnchorEl,
        createPopoverAnchorEl,
        setCreatePopoverAnchorEl,
        editedPanel,
        setEditedPanel,
        clearEditedPanel,
        columns,
        fields
    } = useSolarPanelState();
    const [updated, setUpdated] = useState(false);
    const [selectedImageFromForm, setSelectedImageFromForm] = useState(null);
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',  // Reemplaza con la URL de tu servidor
    });

    useEffect(() => {
        const fetchSolarPanels = async () => {
            try {
                const response = await fetch('http://localhost:8080/solarpanels');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de paneles solares');
                }

                const data = await response.json();
                setSolarPanels(data);
                setUpdated(true); // Marcar que la actualización se ha realizado

            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!updated) {
            fetchSolarPanels(); // Realizar la llamada solo si no se ha actualizado
        }
    }, [solarPanels]);

    const handlePATCH = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/solarpanels/${id}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el panel solar');
            }

            // Actualizar la lista de paneles solares
            const updatedSolarPanels = solarPanels.map((panel) =>
                panel.id_solarpanel === id ? { ...panel, is_disabled: !panel.is_disabled } : panel
            );
            setSolarPanels(updatedSolarPanels);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePUT = (event, id) => {
        const panelToEdit = solarPanels.find((panel) => panel.id_solarpanel === id);
        setEditedPanel(panelToEdit);
        setEditPopoverAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setEditPopoverAnchorEl(null);
        setCreatePopoverAnchorEl(null);
        clearEditedPanel();
    };

    const handleFormChange = (event) => {
        setEditedPanel((prevPanel) => ({
            ...prevPanel,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            if (editedPanel.id_solarpanel) {
                // Si editedPanel.id_solarpanel está presente, realiza una solicitud PUT
                const response = await fetch(`http://localhost:8080/solarpanels/${editedPanel.id_solarpanel}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedPanel),
                });

                if (!response.ok) {
                    throw new Error('Error al editar el panel solar');
                }
            } else {
                // Si editedPanel.id_solarpanel está ausente, realiza una solicitud POST
                const response = await fetch('http://localhost:8080/solarpanels', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedPanel),
                });

                if (!response.ok) {
                    throw new Error('Error al agregar el panel solar');
                }

                // Verifica si la respuesta tiene datos antes de intentar analizarla
                const responseData = await response.text();
                const newPanel = responseData ? JSON.parse(responseData) : null;

                if (newPanel) {
                    // Agrega la nueva placa solar a la lista
                    setSolarPanels([...solarPanels, newPanel]);
                }
            }

            if (selectedImageFromForm) {
                // Hacer algo con la imagen seleccionada, como enviarla a la API
                const formData = new FormData();
                formData.append('image', selectedImageFromForm);

                await axios.post('http://localhost:8080/images', formData)
                    .then(response => {
                        console.log('Imagen guardada con éxito:', response.data);
                    })
                    .catch(error => {
                        console.error('Error al guardar la imagen:', error);
                    });
            }

            // Actualizar la lista de paneles solares después de editar o agregar
            const updatedSolarPanels = solarPanels.map((panel) =>
                panel.id_solarpanel === editedPanel.id_solarpanel ? editedPanel : panel
            );
            setSolarPanels(updatedSolarPanels);
            setUpdated(false);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePOST = async (event) => {
        // Al hacer clic en el botón "Create", establece el estado de editedPanel a un nuevo objeto
        clearEditedPanel();

        // Abre el Popover para ingresar los detalles de la nueva placa solar
        setCreatePopoverAnchorEl(event.currentTarget);
    };

    const deleteImage = async (imageName) => {
        try {
            const response = await axiosInstance.delete(`/images/${imageName}`);
            console.log(response.data);  // Mensaje de éxito o error desde el servidor
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    };

    return (
        <>
            <BtnCreate onClick={handlePOST} />
            <DataTable columns={columns} data={solarPanels} onEnable={handlePATCH} onEdit={handlePUT} idKey="id_solarpanel" />
            <DataForm fields={fields}
                editedType={editedPanel.id_solarpanel ? 'Edit' : 'Add'}
                editedData={editedPanel}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onClose={handleClose}
                anchorEl={editPopoverAnchorEl || createPopoverAnchorEl}
                onImageSubmit={setSelectedImageFromForm} 
                onDeleteImage={deleteImage}/>
        </>
    );
};

export default SolarPanelsComponent;

