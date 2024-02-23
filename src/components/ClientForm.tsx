import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material'
import {
  collection,
  addDoc,
} from 'firebase/firestore'
import { db } from '../services/firebase'

type ClientFormProps = {
  open: boolean
  onClose: () => void
}

type FormValues = {
  id: number | string
  nombre: string
  domicilio?: string
  codigoPostal?: string
  poblacion?: string
}

export const ClientForm: React.FC<ClientFormProps> = ({ open, onClose }) => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      id: '',
      nombre: '',
      domicilio: '',
      codigoPostal: '',
      poblacion: '',
    },
    mode: 'onBlur'
  })

  const { register, handleSubmit } = formMethods

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await addDoc(collection(db, "clients"), {
        data
      })
      formMethods.reset()
    } catch (e) {
      console.error(e)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nuevo Cliente</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nombre"
            type="text"
            {...register('nombre', { required: 'Campo requerido' })}
            fullWidth
          />

          <TextField
            label="Dirección"
            type="text"
            {...register('domicilio')}
            fullWidth
          />

          <TextField
            label="Código Postal"
            type="text"
            {...register('codigoPostal')}
            fullWidth
          />

          <TextField
            label="Población"
            type="text"
            {...register('poblacion')}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="outlined"
            color="secondary"
          >
            Cancelar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
