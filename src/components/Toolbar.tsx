import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type ClientsToolbarProps = {
  onAddClick: () => void
}

export const ClientsToolbar: React.FC<ClientsToolbarProps> = ({
  onAddClick
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Clientes
        </Typography>
        <IconButton color="inherit" onClick={onAddClick}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
