import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat) {
  return { name, calories, fat};
}

const rows = [
  createData(102020399,"E-19334455673","xyznas vsc"),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} style={{width:"100%",margin:'auto',boxShadow:"None",marginTop:"3rem"}}>
      <Table sx={{ minWidth:500, maxWidth:1000}} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{border:"None"}}
            >
              <TableCell component="th" scope="row" style={{border:"None",textAlign:"left"}}>Admission No. : 12687623962</TableCell>
              <TableCell align="right" style={{border:"None",textAlign:"left"}}>Enrollement : E108723783</TableCell>
              <TableCell align="right" style={{border:"None",textAlign:"left"}}>Name : Muskan Pandey</TableCell>
            </TableRow>
          ))}

         {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{border:"None"}}
            >
              <TableCell component="th" scope="row" style={{border:"None",textAlign:"left"}}>Session : 2023-2024</TableCell>
              <TableCell align="right" style={{border:"None",textAlign:"left"}}>Branch : Information Technology</TableCell>
              <TableCell align="right" style={{border:"None",textAlign:"left"}}>Institute Name : Dr. AITH</TableCell>
            </TableRow>
          ))}

            {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{border:"None"}}
            >
              <TableCell component="th" scope="row" style={{border:"None",textAlign:"left"}}>E-mail:abc@gmail.com</TableCell>
              <TableCell align="right" style={{border:"None",textAlign:"left"}}>Phone No.:126721123</TableCell>
              <TableCell align="right" style={{border:"None",textAlign:"left"}}>Gender:Female</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
