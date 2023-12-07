import React, { useEffect, useState } from 'react';
import '../../assets/style/SolarPanelsComponent.css';
import DataTable from '../Global/DataTable.tsx';
import DataForm from '../Global/DataForm.tsx';
import useSolarPanelState from './SolarPanelsState.tsx';
import BtnCreate from '../Button/BtnCreateComponent.tsx';

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

    useEffect(() => {
        const fetchSolarPanels = async () => {
            try {
                const response = await fetch('http://localhost:8080/solarpanels');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de paneles solares');
                }

                const data = await response.json();
                setSolarPanels(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSolarPanels();
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
    
            // Actualizar la lista de paneles solares después de editar o agregar
            const updatedSolarPanels = solarPanels.map((panel) =>
                panel.id_solarpanel === editedPanel.id_solarpanel ? editedPanel : panel
            );
            setSolarPanels(updatedSolarPanels);
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

    return (
        <>
            <BtnCreate onClick={handlePOST}/>
            <DataTable columns={columns} data={solarPanels} onEnable={handlePATCH} onEdit={handlePUT} idKey="id_solarpanel"/>
            <DataForm fields={fields} editedType={editedPanel.id_solarpanel ? 'Edit' : 'Add'} editedData={editedPanel} onChange={handleFormChange} onSubmit={handleFormSubmit} onClose={handleClose} anchorEl={editPopoverAnchorEl || createPopoverAnchorEl} />
        </>
    );
};

export default SolarPanelsComponent;

