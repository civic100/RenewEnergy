import { useState } from 'react';

const useSolarPanelState = () => {
    const [solarPanels, setSolarPanels] = useState([]);
    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [createPopoverAnchorEl, setCreatePopoverAnchorEl] = useState(null);
    const [editedPanel, setEditedPanel] = useState({
        id_solarpanel: null,
        model: '',
        manufacturer: '',
        nominalpower: null,
        efficiency: null,
        celltype: '',
        image_url: '',
    });

    const [reloadData, setReloadData] = useState(false);

    const clearEditedPanel = () => {
        setEditedPanel({
            id_solarpanel: null,
            model: '',
            manufacturer: '',
            nominalpower: null,
            efficiency: null,
            celltype: '',
            image_url: '',
        });
    };

    const columns = [
        { key: 'id_solarpanel', label: 'Id', align: 'right' },
        { key: 'model', label: 'Model', align: 'right' },
        { key: 'manufacturer', label: 'Manufacturer', align: 'right' },
        { key: 'nominalpower', label: 'Nominalpower', align: 'right' },
        { key: 'efficiency', label: 'Efficiency', align: 'right' },
        { key: 'celltype', label: 'Celltype', align: 'right' },
        { key: 'image_url', label: 'Image_url', align: 'right' },
    ];

    const fields = [
        { name: 'model', label: 'Model', type: 'text' },
        { name: 'manufacturer', label: 'Manufacturer', type: 'text' },
        { name: 'nominalpower', label: 'Nominal Power', type: 'number' },
        { name: 'efficiency', label: 'Efficiency', type: 'number' },
        { name: 'celltype', label: 'Cell Type', type: 'text' },
        { name: 'image_url', label: 'Image_url', type: 'text' }
    ];

    return {
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
        fields,
        reloadData,
        setReloadData,
    };
};

export default useSolarPanelState;
