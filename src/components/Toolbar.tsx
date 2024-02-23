import React from 'react'
import {
  Toolbar as MuiToolbar,
  IconButton,
  Tooltip,
  Typography,
  Container,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContactIcon from '@mui/icons-material/ContactMail'

interface ToolbarProps {
  onAddClick: () => void
  // onEditClick: () => void
  onDeleteClick: () => void
  // onContactClick: () => void
  onViewContactClick: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAddClick, onDeleteClick, onViewContactClick }) =>
  {    
    return (
      <Container maxWidth="xl">
        <MuiToolbar style={{ width: '100%' }}>
          <Tooltip title="Nuevo">
            <IconButton
              onClick={onAddClick}
            >
              <AddIcon />
              <Typography variant="caption">Nuevo</Typography>
            </IconButton>
          </Tooltip>

          <Tooltip title="Editar">
            <IconButton
            // onClick={onEditClick}
            >
              <EditIcon />
              <Typography variant="caption">Editar</Typography>
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar">
            <IconButton
            onClick={onDeleteClick}
            >
              <DeleteIcon />
              <Typography variant="caption">Eliminar</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Contacto">
            <IconButton
              onClick={onViewContactClick}
            >
              <ContactIcon />
              <Typography variant="caption">Ver contacto</Typography>
            </IconButton>
          </Tooltip>
        </MuiToolbar>
      </Container>
    )
  }
