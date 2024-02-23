// import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { ClientModel } from '../models/ClientModel'

type ClientProps = {
  clients: ClientModel[]
}

export const ClientsRegister: React.FC<ClientProps> = ({ clients }) => {

  console.log(clients)

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 650 }} aria-label="Tabla de Registros">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Domicilio</TableCell>
            <TableCell>Código Postal</TableCell>
            <TableCell>Población</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}
            >
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.data.nombre}</TableCell>
              <TableCell>{client.data.domicilio}</TableCell>
              <TableCell>{client.data.codigoPostal}</TableCell>
              <TableCell>{client.data.poblacion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
