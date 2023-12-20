import { useState } from 'react';

const usePaymentState = () => {
    const [payment, setPayment] = useState([]);
    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [createPopoverAnchorEl, setCreatePopoverAnchorEl] = useState(null);
    const [editedPayment, setEditedPayment] = useState({
        id_user: null,
        id_project: null,
        amount: '',
    });

    const clearEditedPayment = () => {
        setEditedPayment({
            id_user: null,
            id_project: null,
            amount: '',
        });
    };

    const columns = [
        { key: 'id_user', label: 'User', align: 'center' },
        { key: 'id_project', label: 'Project', align: 'center' },
        { key: 'amount', label: 'Importe', align: 'center' },
    ];

    const fields = [
        { name: 'amount', label: 'Importe', type: 'text' },
    ];

    return {
        payment,
        setPayment,
        editPopoverAnchorEl,
        setEditPopoverAnchorEl,
        createPopoverAnchorEl,
        setCreatePopoverAnchorEl,
        editedPayment,
        setEditedPayment,
        clearEditedPayment,
        columns,
        fields
    };
};

export default usePaymentState;
