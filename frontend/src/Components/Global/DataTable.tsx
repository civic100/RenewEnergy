import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BtnEdit from '../Button/BtnEditComponent';
import BtnEnabled from '../Button/BtnEnabledComponent';
import '../../assets/style/SolarPanelsComponent.css';

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
const DataTable = ({ columns, data, onEnable, onEdit, idKey }) => {
    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell key={column.key} align={column.align}>{column.label}</StyledTableCell>
                        ))}
                        <StyledTableCell align="right">Update</StyledTableCell>
                        <StyledTableCell align="right">Is_disabled</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row[idKey]}>
                            {columns.map((column) => (
                                <StyledTableCell key={column.key} align={column.align}>{row[column.key]}</StyledTableCell>
                            ))}
                            <StyledTableCell align="right">
                                <BtnEdit onClick={(e) => onEdit(e, row[idKey])} />
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <BtnEnabled classState={row.is_disabled} onClick={() => onEnable(row[idKey])}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default DataTable;
