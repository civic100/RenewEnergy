import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import '../../assets/style/SolarPanelsComponent.css';
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
                                <Button
                                    variant="contained"
                                    className="btn-color"
                                    onClick={(e) => onEdit(e, row[idKey])}>
                                    EDIT
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button
                                    variant="contained"
                                    className={`${row.is_disabled ? 'enabled-btn' : 'disabled-btn'}`}
                                    onClick={() => onEnable(row[idKey])}>
                                    {row.is_disabled ? 'ENABLED' : 'DISABLED'}
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default DataTable;
