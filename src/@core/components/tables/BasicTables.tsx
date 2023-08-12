// Table.js

import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function CustomTable({ columns, rows, onDelete }: any) {
    return (
        <TableContainer component={Paper}>
            <Table border={1} sx={{border: '1px solid lightgrey'}}>
                <TableHead>
                    <TableRow>
                        {columns?.map((column: any) => (
                            <TableCell key={column.field} id={column.id} align='right'>
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows?.map((row: any) => (
                        <TableRow key={row.id} >
                            {columns?.map((column: any) => (
                                <TableCell key={column.field} id={row.id} align='right'>
                                    {row[column?.field]}
                                    {/* {row[column?.renderCell]} */}
                                    
                                </TableCell>
                            ))}    
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}