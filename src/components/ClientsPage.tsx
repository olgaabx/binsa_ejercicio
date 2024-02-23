import { useEffect, useState } from 'react'
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  // updateDoc,
} from 'firebase/firestore'
import { db } from '../services/firebase'
import { ClientsRegister } from './ClientsRegister'
import { ClientModel } from '../models/ClientModel'
import { ClientsToolbar } from './Toolbar'
import { ClientForm } from './ClientForm'
import { ConfirmationModal } from './ClientConfirmationModal'
import { ContactsDetail } from './ContactsDetail'
import { ContactForm } from './ContactForm'
import { ContactModel } from '../models/ContactModel'

export const ClientsPage = () => {
  const [clients, setClients] = useState<ClientModel[]>([])
  const [selectedClient, setSelectedClient] = useState<ClientModel | null>(null)
  const [isModalFormOpen, setIsModalFormOpen] = useState(false)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false)
  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false)
  const [contacts, setContacts] = useState<ContactModel[]>([])
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'clients'),
      (querySnapshot) => {
        const docs: ClientModel[] = []
        querySnapshot.forEach((doc) => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          } as ClientModel)
        })
        setClients(docs)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleCloseModal = () => {
    setIsModalFormOpen(false)
  }

  const handleAddClick = () => {
    setIsModalFormOpen(true)
  }

  // const handleUpdateClient = async (
  //   updatedData: Partial<ClientModel> | null
  // ) => {
  //   try {
  //     if (selectedClient && selectedClient.id) {
  //       const clientRef = doc(db, 'clients', selectedClient.id)
  //       await updateDoc(clientRef, updatedData as ClientModel)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleDeleteClick = (client: ClientModel) => {
    setSelectedClient(client)
    setIsDeleteConfirmationOpen(true)
  }

  const handleConfirmationCloseModal = () => {
    setIsDeleteConfirmationOpen(false)
  }

  const handleConfirmationDeleteModal = async () => {
    setIsDeleteConfirmationOpen(false)

    try {
      if (selectedClient) {
        const clientRef = doc(db, 'clients', selectedClient.id)
        await deleteDoc(clientRef)
        setSelectedClient(null)
      }
    } catch (error) {
      console.error('Error al eliminar el cliente', error)
    }
  }

  const handleViewContactClick = (client: ClientModel) => {
    setSelectedClient(client)
    setIsContactDetailOpen(true)
  }

  const handleCloseContactDetail = () => {
    setIsContactDetailOpen(false)
  }

  const handleAddContactForm = () => {
      setIsContactFormOpen(true)
  }

  const handleCloseAddContactForm = () => {
    setIsContactFormOpen(false)
  }

  const handleDeleteContact = async (contact: ContactModel) => {
    try {
      await deleteDoc(doc(db, 'contacts', contact.id))
  
      const updatedContacts = contacts.filter((c) => c.id !== contact.id)
      setContacts(updatedContacts)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <ClientsToolbar
        onAddClick={handleAddClick}
        // onEditClick={() => handleUpdateClient(selectedClient)}
      />
      <ClientsRegister
        clients={clients}
        setSelectedClient={setSelectedClient}
        onDeleteClick={handleDeleteClick}
        onContactClick={handleViewContactClick}
      />
      <ConfirmationModal
        open={isDeleteConfirmationOpen}
        onClose={handleConfirmationCloseModal}
        onConfirm={handleConfirmationDeleteModal}
      />
      <ClientForm open={isModalFormOpen} onClose={handleCloseModal} />

      {isContactDetailOpen && (
        <ContactsDetail
        open={isContactDetailOpen}
        onClose={handleCloseContactDetail}
        contacts={contacts}
        onAddContact={handleAddContactForm}
        onContactAdded={(newContact) => {
          setContacts([...contacts, newContact])
          handleCloseContactDetail()
        }}
        onDeleteContact={handleDeleteContact}
        />
      )}
      
      {isContactFormOpen && (
        <ContactForm
          open={isContactFormOpen}
          onClose={handleCloseAddContactForm}
          setContacts={setContacts}
          selectedClient={selectedClient}
          contacts={contacts}
        />
      )}
    </>
  )
}
