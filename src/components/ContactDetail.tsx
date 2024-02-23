import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Toolbar,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

type ContactDetailProps = {
  open: boolean
  onClose: () => void
}

export const ContactDetail: React.FC<ContactDetailProps> = ({
  open,
  onClose,
}) => {
  return (
    <Container>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <Toolbar>
          <Typography variant="h6">Contacto Detalle</Typography>
          <div style={{ flex: 1 }} />
          <IconButton
            edge="end"
            color="inherit"
            //onClick={() => handleEdit(selectedContact)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            //onClick={() => handleDelete(selectedContact)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            //onClick={() => handleDelete(selectedContact)}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cliente ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
