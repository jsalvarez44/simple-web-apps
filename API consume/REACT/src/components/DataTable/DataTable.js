import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

const DataTable = ({ universities }) => {
    return (
        <TableContainer component={Paper} className="px-8">
        <h1>TABLA DE DATOS</h1>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>NOMBRE</TableCell>
                <TableCell>PAÍS</TableCell>
                <TableCell>DOMINIO</TableCell>
                <TableCell>PÁGINA WEB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {universities.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.domains.join()}</TableCell>
                  <TableCell><a target="_blank" rel="noreferrer" href={row.web_pages}>{row.web_pages}</a></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default DataTable
