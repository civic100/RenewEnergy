import { useState } from 'react';

const usePaymentState = () => {
    const [payment, setPayment] = useState([]);
    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [createPopoverAnchorEl, setCreatePopoverAnchorEl] = useState(null);
    const [editedPayment, setEditedPayment] = useState({
        id_contributionplan: null,
        plan_name: '',
        amount: '',
        frequency: ''
    });

    const clearEditedPayment = () => {
        setEditedPayment({
            id_contributionplan: null,
            plan_name: '',
            amount: '',
            frequency: ''
        });
    };

    const columns = [
        { key: 'id_solarpanel', label: 'Id', align: 'right' },
        { key: 'plan_name', label: 'Name', align: 'right' },
        { key: 'amount', label: 'Importe', align: 'right' },
        { key: 'frequency', label: 'Frequency', align: 'right' }
    ];

    const fields = [
        { name: 'plan_name', label: 'Name', type: 'text' },
        { name: 'amount', label: 'Importe', type: 'number' },
        { name: 'frequency', label: 'Frequency', type: 'text' }
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
