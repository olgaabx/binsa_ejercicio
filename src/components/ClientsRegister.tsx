import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material'
import { ClientModel } from '../models/ClientModel'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContactIcon from '@mui/icons-material/ContactMail'
import React from 'react'

type ClientsRegisterProps = {
  clients: ClientModel[]
  setSelectedClient: (client: ClientModel) => void
  onDeleteClick: (client: ClientModel) => void
  onContactClick: (client: ClientModel) => void
}

export const ClientsRegister: React.FC<ClientsRegisterProps> = ({
  clients,
  setSelectedClient,
  onDeleteClick,
  onContactClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
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
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client?.data?.nombre}</TableCell>
              <TableCell>{client?.data?.domicilio}</TableCell>
              <TableCell>{client?.data?.codigoPostal}</TableCell>
              <TableCell>{client?.data?.poblacion}</TableCell>
              <TableCell>
                <IconButton color="inherit" onClick={() => setSelectedClient(client)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => onDeleteClick(client)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => onContactClick(client)}>
                  <ContactIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
