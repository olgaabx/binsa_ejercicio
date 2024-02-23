import React from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'
import { ContactModel } from '../models/ContactModel'
import { addDoc, collection } from 'firebase/firestore'
import { ClientModel } from '../models/ClientModel'
import { db } from '../services/firebase'

type ContactFormProps = {
  open: boolean;
  onClose: () => void;
  setContacts: React.Dispatch<React.SetStateAction<ContactModel[]>>
  selectedClient?: ClientModel | null
  contacts: ContactModel[]
}

export type FormValues = {
  nombre: string
  telefono: string
  email: string
};

export const ContactForm: React.FC<ContactFormProps> = ({ open, onClose, setContacts, selectedClient, contacts }) => {
  const formMethods = useForm<FormValues>()

  const { register, handleSubmit } = formMethods

  const onSubmit = async (data: FormValues) => {
    try {
      const clientId = selectedClient?.id
  
      if (clientId) {
        const contactRef = await addDoc(collection(db, 'contacts'), {
          ...data,
          clientId,
        })
  
        const newContactId = contactRef.id
        setContacts([...contacts, { id: newContactId, ...data, clientId }])
  
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Contacto</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Nombre" type="text" {...register('nombre', { required: 'Campo requerido' })} fullWidth />
          <TextField label="Teléfono" type="tel" {...register('telefono', { required: 'Campo requerido' })} fullWidth />
          <TextField label="Correo Electrónico" type="email" {...register('email', { required: 'Campo requerido' })} fullWidth />
          <Button type="submit" variant="contained" color="primary">Guardar</Button>
          <Button type="button" onClick={onClose} variant="outlined" color="secondary">Cancelar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
