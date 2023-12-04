import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const SolarPanelsComponent = () => {
    const [solarPanels, setSolarPanels] = useState([]);

    useEffect(() => {
    const fetchSolarPanels = async () => {
        try {
        const response = await fetch('http://localhost:8080/solarpanels');
        console.log(response);
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
  }, []); // El array vacío como segundo argumento asegura que el efecto solo se ejecute una vez al montar el componente

    const handlePATCH = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/solarpanels/${id}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el panel solar');
            }

            // Actualizar la lista de paneles solares después de eliminar
            const updatedSolarPanels = solarPanels.map(panel =>
                panel.id_solarpanel === id
                    ? { ...panel, is_disabled: !panel.is_disabled }
                    : panel
            );
            setSolarPanels(updatedSolarPanels);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Model</TableCell>
                <TableCell align="right">Manufacturer</TableCell>
                <TableCell align="right">Nominalpower(g)</TableCell>
                <TableCell align="right">Efficiency</TableCell>
                <TableCell align="right">Celltype</TableCell>
                <TableCell align="right">Image_url</TableCell>
                <TableCell align="right">Is_disabled</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {solarPanels.map((row) => (
                <TableRow
                key={row.id_solarpanel}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.id_solarpanel}
                </TableCell>
                <TableCell align="right">{row.model}</TableCell>
                <TableCell align="right">{row.manufacturer}</TableCell>
                <TableCell align="right">{row.nominalpower}</TableCell>
                <TableCell align="right">{row.efficiency}</TableCell>
                <TableCell align="right">{row.celltype}</TableCell>
                <TableCell align="right">{row.image_url}</TableCell>
                <TableCell align="right">
                    {row.is_disabled ? '1' : '0'}
                    <button onClick={() => handlePATCH(row.id_solarpanel)}>Update</button>
                </TableCell>

                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default SolarPanelsComponent;

