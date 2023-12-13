import { useState } from 'react';

const useContributionState = () => {
    const [contributions, setContributions] = useState([]);
    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [createPopoverAnchorEl, setCreatePopoverAnchorEl] = useState(null);
    const [editedContribution, setEditedContribution] = useState({
        id_contributionplan: null,
        plan_name: '',
        amount: null,
        frequency: '',
    });

    const clearEditedContribution = () => {
        setEditedContribution({
            id_contributionplan: null,
            plan_name: '',
            amount: null,
            frequency: '',
        });
    };

    const columns = [
        { key: 'id_contributionplan', label: 'Id', align: 'right' },
        { key: 'plan_name', label: 'Plan', align: 'right' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'frequency', label: 'Frequency', align: 'right' },
    ];

    const fields = [
        { name: 'plan_name', label: 'Plan', type: 'text' },
        { name: 'amount', label: 'Amount', type: 'Float' },
        { name: 'frequency', label: 'Frenquency', type: 'number' }
    ];

    return{
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
    };
};

export default useContributionState;