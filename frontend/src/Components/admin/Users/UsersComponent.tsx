import React, { useEffect, useState } from 'react';
import DataTable from '../../Global/DataTable.tsx';
import DataForm from '../../Global/DataForm.tsx';
import useUsersState from "./UsersState.tsx";
import BtnCreate from '../../Button/BtnCreateComponent.tsx';


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
                user.id_users === id ? { ...user, is_disabled: !user.is_disabled } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePUT = (event, id) => {
        const userToEdit = users.find((user) => user.id_users === id);
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
            if (editedUsers.id_users) {
                // Si editedUser.id_users está presente, realiza una solicitud PUT
                const response = await fetch(`http://localhost:8080/solarpanels/${editedUsers.id_users}`, {
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
                // Si editedUser.id_users está ausente, realiza una solicitud POST
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
    
            // Actualizar la lista de users después de editar o agregar
            const updatedUsers = users.map((user) =>
                user.id_users === editedUsers.id_users ? editedUsers : user
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

    return (
        <>
            <BtnCreate onClick={handlePOST}/>
            <DataTable columns={columns} data={users} onEnable={handlePATCH} onEdit={handlePUT} idKey="id_users"/>
            <DataForm fields={fields} editedType={editedUsers.id_users ? 'Edit' : 'Add'} editedData={editedUsers} onChange={handleFormChange} onSubmit={handleFormSubmit} onClose={handleClose} anchorEl={editPopoverAnchorEl || createPopoverAnchorEl} />
        </>
    );
};



export default UsersComponent;