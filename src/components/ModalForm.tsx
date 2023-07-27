import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

interface Props {
  isOpen: boolean,
  onClose: () => void,
  modalHeader: any,
  modalBody: any
}

export const ModalForm = ({ isOpen, onClose, modalBody, modalHeader }: Props) => {

  const initialRef = React.useRef(null)
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalHeader}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {modalBody}
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}
