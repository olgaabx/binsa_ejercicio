import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogTitle,
} from '@mui/material'
import { ContactModel } from '../models/ContactModel'

type ContactDetailProps = {
  open: boolean
  onClose: () => void
  client?: ContactModel | null
  contacts: ContactModel[]
  onAddContact: () => void
  onContactAdded: (newContact: ContactModel) => void
  onDeleteContact: (contact: ContactModel) => void
}

export const ContactsDetail: React.FC<ContactDetailProps> = ({
  open,
  onClose,
  client,
  contacts,
  onAddContact,
  // onEditContact,
  onDeleteContact,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Contactos de {client?.nombre}</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.id}</TableCell>
                  <TableCell>{contact.nombre}</TableCell>
                  <TableCell>{contact.telefono}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => onDeleteContact(contact)}>Eliminar</Button> 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAddContact}>Agregar Contacto</Button>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}
