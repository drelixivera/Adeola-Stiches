import { createContext, useState } from 'react'

const ModalContext = createContext({
  isOrderModalOpen: false,
  selectedService: '',
  openOrderModal: () => {},
  closeOrderModal: () => {},
})

export const ModalProvider = ({ children }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const openOrderModal = (service = '') => {
    setSelectedService(service)
    setIsOrderModalOpen(true)
  }

  const closeOrderModal = () => {
    setIsOrderModalOpen(false)
    setSelectedService('')
  }

  return (
    <ModalContext.Provider
      value={{
        isOrderModalOpen,
        selectedService,
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
