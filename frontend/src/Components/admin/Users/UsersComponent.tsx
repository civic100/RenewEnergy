import React, { useEffect, useState } from 'react';
import DataTable from '../../Global/DataTable.tsx';
import DataForm from '../../Global/DataForm.tsx';
import useUsersState from "./UsersState.tsx";
import BtnCreate from '../../Button/BtnCreateComponent.tsx';
import axios from 'axios';

const UsersComponent = () => {
    const {
        users,
        setUsers,
        editPopoverAnchorEl,
        setEditPopoverAnchorEl,
        createPopoverAnchorEl,
        setCreatePopoverAnchorEl,
        editedUsers,
        setEditedUsers,
        clearEditedUsers,
        columns,
        fields
    } = useUsersState();
    const [updated, setUpdated] = useState(false);
    const [selectedImageFromForm, setSelectedImageFromForm] = useState(null);
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',  // Reemplaza con la URL de tu servidor
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de Users');
                }

                const data = await response.json();
                setUsers(data);
                setUpdated(true);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if(!updated){
            fetchUsers();
        }
    }, [users]);

    const handlePATCH = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el Users');
            }

            // Actualizar la lista de users
            const updatedUsers = users.map((user) =>
                user.id_user === id ? { ...user, is_disabled: !user.is_disabled } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePUT = (event, id) => {
        const userToEdit = users.find((user) => user.id_user === id);
        setEditedUsers(userToEdit);
        setEditPopoverAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setEditPopoverAnchorEl(null);
        setCreatePopoverAnchorEl(null);
        clearEditedUsers();
    };

    const handleFormChange = (event) => {
        setEditedUsers((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            if (editedUsers.id_user) {
                // Si editedUser.id_user está presente, realiza una solicitud PUT
                const response = await fetch(`http://localhost:8080/users/${editedUsers.id_user}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedUsers),
                });
    
                if (!response.ok) {
                    throw new Error('Error al editar el users');
                }
            } else {
                // Si editedUser.id_user está ausente, realiza una solicitud POST
                const response = await fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedUsers),
                });
    
                if (!response.ok) {
                    throw new Error('Error al agregar el users');
                }
    
                // Verifica si la respuesta tiene datos antes de intentar analizarla
                const responseData = await response.text();
                const newUser = responseData ? JSON.parse(responseData) : null;
    
                if (newUser) {
                    // Agrega la nueva placa solar a la lista
                    setUsers([...users, newUser]);
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
    
            // Actualizar la lista de users después de editar o agregar
            const updatedUsers = users.map((user) =>
                user.id_user === editedUsers.id_user ? editedUsers : user
            );
            setUsers(updatedUsers);
            setUpdated(false);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePOST = async (event) => {
        // Al hacer clic en el botón "Create", establece el estado de editedUsers a un nuevo objeto
        clearEditedUsers();

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
            <BtnCreate onClick={handlePOST}/>
            <DataTable columns={columns} data={users} onEnable={handlePATCH} onEdit={handlePUT} idKey="id_user"/>
            <DataForm fields={fields} 
            editedType={editedUsers.id_user ? 'Edit' : 'Add'} 
            editedData={editedUsers} 
            onChange={handleFormChange} 
            onSubmit={handleFormSubmit} 
            onClose={handleClose} 
            anchorEl={editPopoverAnchorEl || createPopoverAnchorEl}
            onImageSubmit={setSelectedImageFromForm} 
            onDeleteImage={deleteImage}/>
        </>
    );
};



export default UsersComponent;