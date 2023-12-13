import React, { useState } from 'react';
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
import "../../assets/style/Button.css";
import TablePaginationActions from './TablePage.tsx';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell key={column.key} align={column.align}>{column.label}</StyledTableCell>
                        ))}
                        <StyledTableCell align="right">Update</StyledTableCell>
                        {onEnable ? (
                            <StyledTableCell align="right">Is_disabled</StyledTableCell>
                        ): null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data).map((row: any) => (
                            <StyledTableRow key={row[idKey]}>
                                {columns.map((column: any) => (
                                    <StyledTableCell key={column.key} align={column.align}>
                                        {column.key === 'image_url' ? (
                                            <img src={`http://localhost:8080/images/${row[column.key]}`} alt="Image" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                            ) : (
                                                column.key === 'password' ? (
                                                    '******'
                                                ): (    
                                                    row[column.key]
                                                )
                                        )}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell align="right">
                                    <BtnEdit onClick={(e: any) => onEdit(e, row[idKey])} />
                                </StyledTableCell>
                                {onEnable ? (
                                    <StyledTableCell align="right">
                                        <BtnEnabled classState={row.is_disabled} onClick={() => onEnable(row[idKey])} />
                                    </StyledTableCell>
                                ) : null}
                            </StyledTableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={columns.length + 2}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
