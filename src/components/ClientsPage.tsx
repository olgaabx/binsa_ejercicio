import { useEffect, useState } from 'react'
import { ClientsRegister } from './ClientsRegister'
import { Toolbar } from './Toolbar'
import { ClientForm } from './ClientForm'
import { collection, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ClientModel } from '../models/ClientModel';
import ConfirmationDialog from './ClientConfirmationDialog';
import { ContactDetail } from './ContactDetail';

export const ClientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState<ClientModel[]>([])
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'clients'), (querySnapshot) => {
      const docs: ClientModel[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        } as ClientModel);
      });
      setClients(docs);
    });
  
    return () => unsubscribe();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDelete = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false)
  }

  const handleConfirmationConfirm = async () => {
    setIsConfirmationOpen(false)

    try {
      const querySnapshot = await getDocs(collection(db, 'clients'))

      const deletePromises = querySnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref)
      });

      await Promise.all(deletePromises)
      setClients([])
    } catch (error) {
      console.error('Error al eliminar los clientes', error);
    }
  }

  const handleViewContactClick = () => {
    setIsContactDetailOpen(true);
  }

  const handleCloseContactDetail = () => {
    setIsContactDetailOpen(false);
  }

  return (
    <>
      <Toolbar onAddClick={handleAddClick} onDeleteClick={handleDelete } onViewContactClick={handleViewContactClick} />
      <ClientsRegister clients={clients} />
      <ClientForm open={isModalOpen} onClose={handleCloseModal} />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onClose={handleConfirmationClose}
        onConfirm={handleConfirmationConfirm}
      />
      {isContactDetailOpen && (
        <ContactDetail open={isContactDetailOpen} onClose={handleCloseContactDetail} />
      )}
    </>
  )
}