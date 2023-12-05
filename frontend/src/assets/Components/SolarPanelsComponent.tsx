import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import '../style/SolarPanelsComponent.css';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const SolarPanelsComponent = () => {
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
    }, []);

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

    const handlePUT = (id) => {
        const panelToEdit = solarPanels.find((panel) => panel.id_solarpanel === id);
        setEditedPanel(panelToEdit);
        setEditPopoverAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setEditPopoverAnchorEl(null);
        setCreatePopoverAnchorEl(null);
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

    const handleFormChange = (event) => {
        setEditedPanel((prevPanel) => ({
            ...prevPanel,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
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

            // Actualizar la lista de paneles solares después de editar
            const updatedSolarPanels = solarPanels.map((panel) =>
                panel.id_solarpanel === editedPanel.id_solarpanel ? editedPanel : panel
            );
            setSolarPanels(updatedSolarPanels);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePOST = async () => {
        // Al hacer clic en el botón "Create", establece el estado de editedPanel a un nuevo objeto
        setEditedPanel({
            id_solarpanel: null,
            model: '',
            manufacturer: '',
            nominalpower: null,
            efficiency: null,
            celltype: '',
            image_url: '',
        });

        // Abre el Popover para ingresar los detalles de la nueva placa solar
        setCreatePopoverAnchorEl(event.currentTarget);
    };

    const handleAddSubmit = async () => {
        try {
            // Realiza la solicitud POST para agregar una nueva placa solar
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
        
            const updatedSolarPanels = solarPanels.map((panel) =>
            panel.id_solarpanel === editedPanel.id_solarpanel ? editedPanel : panel
        );
        setSolarPanels(updatedSolarPanels);
        // Cierra el Popover después de agregar 
        handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <Button variant="contained" color="success" 
            onClick={() => handlePOST()}>
            Create
        </Button>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>    Id</StyledTableCell>
                        <StyledTableCell align="right">Model</StyledTableCell>
                        <StyledTableCell align="right">Manufacturer</StyledTableCell>
                        <StyledTableCell align="right">Nominalpower</StyledTableCell>
                        <StyledTableCell align="right">Efficiency</StyledTableCell>
                        <StyledTableCell align="right">Celltype</StyledTableCell>
                        <StyledTableCell align="right">Image_url</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                        <StyledTableCell align="right">Is_disabled</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {solarPanels.map((row) => (
                    <StyledTableRow   
                    key={row.id_solarpanel} 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row"> {row.id_solarpanel} </StyledTableCell>
                    <StyledTableCell align="right">{row.model}</StyledTableCell>
                    <StyledTableCell align="right">{row.manufacturer}</StyledTableCell>
                    <StyledTableCell align="right">{row.nominalpower}</StyledTableCell>
                    <StyledTableCell align="right">{row.efficiency}</StyledTableCell>
                    <StyledTableCell align="right">{row.celltype}</StyledTableCell>
                    <StyledTableCell align="right">{row.image_url}</StyledTableCell>
                    <StyledTableCell align="right">
                    <Button
                        variant="contained"
                        className="btn-color"
                        onClick={() => handlePUT(row.id_solarpanel)}>
                        EDIT
                    </Button>                
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    <Button
                        variant="contained"
                        className={`${row.is_disabled ? 'enabled-btn' : 'disabled-btn'}`}
                        onClick={() => handlePATCH(row.id_solarpanel)}>
                        {row.is_disabled ? 'ENABLED' : 'DISABLED'}
                    </Button>                
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>

            <Popover
                open={Boolean(editPopoverAnchorEl)}
                anchorEl={editPopoverAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <div>
                    <Typography>Edit Solar Panel</Typography>
                    <form>
                            <TextField label="Model" name="model" value={editedPanel.model} onChange={handleFormChange} />
                            <TextField label="Manufacturer" name="manufacturer" value={editedPanel.manufacturer} onChange={handleFormChange} />
                            <TextField label="Nominalpower" name="nominalpower" value={editedPanel.nominalpower} onChange={handleFormChange} />
                            <TextField label="Efficiency" name="efficiency" value={editedPanel.efficiency} onChange={handleFormChange} />
                            <TextField label="Celltype" name="celltype" value={editedPanel.celltype} onChange={handleFormChange} />
                        <Button variant="contained" className="btn-color" onClick={handleFormSubmit}>
                            Save
                        </Button>
                    </form>
                </div>
            </Popover>

            <Popover
                open={Boolean(createPopoverAnchorEl)}
                anchorEl={createPopoverAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <div>
                    <Typography>{editedPanel.id_solarpanel ? 'Edit' : 'Add'} Solar Panel</Typography>
                    <form>
                        <TextField label="Model" name="model" value={editedPanel.model} onChange={handleFormChange} />
                        <TextField label="Manufacturer" name="manufacturer" value={editedPanel.manufacturer} onChange={handleFormChange} />
                        <TextField label="Nominalpower" name="nominalpower" value={editedPanel.nominalpower} onChange={handleFormChange} />
                        <TextField label="Efficiency" name="efficiency" value={editedPanel.efficiency} onChange={handleFormChange} />
                        <TextField label="Celltype" name="celltype" value={editedPanel.celltype} onChange={handleFormChange} />
                        <Button variant="contained" className="btn-color" onClick={handleAddSubmit}>
                            {editedPanel.id_solarpanel ? 'Save' : 'Add'}
                        </Button>
                    </form>
                </div>
            </Popover>
        </TableContainer>
        
    </>
    );
};

export default SolarPanelsComponent;

