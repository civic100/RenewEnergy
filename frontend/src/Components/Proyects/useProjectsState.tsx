import { useState } from 'react';

const useProjectsState = () => {
    const [projects, setProjects] = useState([]);
    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [createPopoverAnchorEl, setCreatePopoverAnchorEl] = useState(null);
    const [editedProject, setEditedProject] = useState({
        id_project: null,
        description: '',
        geographic_area: '',
        coordinates: '',
        village_name: '',
        image_url: '',
    });

    const clearEditedProject = () => {
        setEditedProject({
            id_project: null,
            description: '',
            geographic_area: '',
            coordinates: '',
            village_name: '',
            image_url: '',
        });
    };

    const columns = [
        { key: 'id_project', label: 'Id', align: 'right' },
        { key: 'description', label: 'Description', align: 'right' },
        { key: 'geographic_area', label: 'Geographic Area', align: 'right'},
        { key: 'coordinates', label: 'Coordinates', align: 'right' },
        { key: 'village_name', label: 'Village_name', align: 'right' },
        { key: 'image_url', label: 'Image_url', align: 'right' },
    ];

    const fields = [
        { name: 'description', label: 'Description', align: 'right' },
        { name: 'geographic_area', label: 'Geographic Area', align: 'right'},
        { name: 'coordinates', label: 'Coordinates', align: 'right' },
        { name: 'village_name', label: 'Village_name', align: 'right' },
        { name: 'image_url', label: 'Image_url', type: 'text' }
    ];

    return {
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
    };
};

export default useProjectsState;
