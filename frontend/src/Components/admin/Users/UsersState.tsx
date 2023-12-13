import { useState } from 'react';

const useUsersState = () => {
    const [users, setUsers] = useState([]);
    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [createPopoverAnchorEl, setCreatePopoverAnchorEl] = useState(null);
    const [editedUsers, setEditedUsers] = useState({
        id_user: null,
        name: '',
        email: '',
        password: '',
        user_type: '',
        image_url: ''
    });

    const clearEditedUsers = () => {
        setEditedUsers({
            id_user: null,
            name: '',
            email: '',
            password: '',
            user_type: '',
            image_url: ''
        });
    };

    const columns = [
        { key: 'id_user', label: 'Id', align: 'right' },
        { key: 'name', label: 'Name', align: 'right' },
        { key: 'email', label: 'Email', align: 'right' },
        { key: 'password', label: 'Password', align: 'right' },
        { key: 'user_type', label: 'Type', align: 'right' },
        { key: 'image_url', label: 'Image', align: 'right' }
    ];

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'password', label: 'Password', type: 'number' },
        { name: 'user_type', label: 'Type', type: 'number' },
        { name: 'image_url', label: 'Image', type: 'text' }
    ];

    return {
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
    };
};

export default useUsersState;
