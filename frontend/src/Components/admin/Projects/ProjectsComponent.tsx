import React, { useEffect, useState } from 'react';
import DataTable from '../../Global/DataTable.tsx';
import DataForm from '../../Global/DataForm.tsx';
import useProjectsState from './useProjectsState.tsx';
import BtnCreate from '../../Button/BtnCreateComponent.tsx';

const ProjectsComponent = () => {
    const {
        projects,
        setProjects,
        editPopoverAnchorEl,
        setEditPopoverAnchorEl,
        createPopoverAnchorEl,
        setCreatePopoverAnchorEl,
        editedProject,
        setEditedProject,
        clearEditedProject,
        columns,
        fields
    } = useProjectsState();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8080/projects');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de paneles projects');
                }

                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProjects();
    }, [projects]);

    const handlePATCH = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/projects/${id}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el projects');
            }

            // Actualizar la lista de projects
            const updatedProjects = projects.map((project) =>
                project.id_project === id ? { ...project, is_disabled: !project.is_disabled } : project
            );
            setProjects(updatedProjects);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePUT = (event, id) => {
        const projectToEdit = projects.find((project) => project.id_project === id);
        setEditedProject(projectToEdit);
        setEditPopoverAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setEditPopoverAnchorEl(null);
        setCreatePopoverAnchorEl(null);
        clearEditedProject();
    };

    const handleFormChange = (event) => {
        setEditedProject((prevProject) => ({
            ...prevProject,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            if (editedProject.id_project) {
                // Si editedProject.id_project está presente, realiza una solicitud PUT
                const response = await fetch(`http://localhost:8080/projects/${editedProject.id_project}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedProject),
                });

                if (!response.ok) {
                    throw new Error('Error al editar el project');
                }
            } else {
                // Si editedProject.id_projects está ausente, realiza una solicitud POST
                const response = await fetch('http://localhost:8080/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedProject),
                });

                if (!response.ok) {
                    throw new Error('Error al agregar el projects');
                }

                // Verifica si la respuesta tiene datos antes de intentar analizarla
                const responseData = await response.text();
                const newProject = responseData ? JSON.parse(responseData) : null;

                if (newProject) {
                    // Agrega la nueva placa project a la lista
                    setProjects([...projects, newProject]);
                }
            }

            // Actualizar la lista de paneles project después de editar o agregar
            const updatedProjects = projects.map((project) =>
                project.id_project === editedProject.id_project ? editedProject : project
            );
            setProjects(updatedProjects);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePOST = async (event) => {
        // Al hacer clic en el botón "Create", establece el estado de editedProject a un nuevo objeto
        clearEditedProject();

        // Abre el Popover para ingresar los detalles de la nueva placa project
        setCreatePopoverAnchorEl(event.currentTarget);
    };

    return (
        <>
            <BtnCreate onClick={handlePOST}/>
            <DataTable columns={columns} data={projects} onEnable={handlePATCH} onEdit={handlePUT} idKey='id_project' />
            <DataForm fields={fields} editedType={editedProject.id_project ? 'Edit' : 'Add'} editedData={editedProject} onChange={handleFormChange} onSubmit={handleFormSubmit} onClose={handleClose} anchorEl={editPopoverAnchorEl || createPopoverAnchorEl} />
        </>
    );


};

export default ProjectsComponent;