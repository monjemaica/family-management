import { Alert, AlertIcon, Box, Button, Center, Flex, HStack, Skeleton, Stack, VStack, useDisclosure } from '@chakra-ui/react'
import { MembersTable } from './components/MembersTable'
import { AddMemberForm } from './components/AddMemberForm'
import { useEffect, useState } from 'react';

import { CanceledError } from './services/api-client';
import userService, { Member } from './services/userService';
import { ModalForm } from './components/ModalForm';
import { UpdateMemberForm } from './components/UpdateMemberForm';

function App() {
  const [family, setFamily] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState({})
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const skeletons = [1, 2, 3, 4, 5];
  const addModal =  useDisclosure()
  const updateModal =  useDisclosure()

  useEffect(() => {

    setIsLoading(true);

    const { request, cancel } = userService.getAll<Member>()
    request.then((res) => {
      setFamily(res.data);
      setIsLoading(false);
    })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setIsLoading(false);
      })

    return () => cancel();
  }, [])




  return (
    <>
      {error &&
        <Stack spacing={3}>
          <Alert status='error'>
            <AlertIcon />
            <p>{error}</p>
          </Alert>
        </Stack>
      }
      <ModalForm isOpen={addModal.isOpen} onClose={addModal.onClose} modalHeader='Add Member' modalBody={<AddMemberForm  families={family} addMember={setFamily} error={setError} onClose={addModal.onClose}/>}/>
      <ModalForm isOpen={updateModal.isOpen} onClose={updateModal.onClose} modalHeader='Edit Member' modalBody={<UpdateMemberForm families={family}  selectedMember={selectedMember} setMember={setSelectedMember} updateMember={setFamily} error={setError} onClose={updateModal.onClose}/>}/>
      <Center>
        <Box w='100%' p={10} width='50%'>
          <VStack align='flex-end' paddingY='5'>
            <Button colorScheme='teal' size='sm' onClick={addModal.onOpen}>Add Member</Button>
          </VStack>
          {/* <Box w='30%' p={5} >

          <AddMemberForm families={family} addMember={setFamily} error={setError} />
        </Box> */}
          {isLoading == true ?
            <Stack>
              {skeletons.map(e => <Skeleton height='40px' p={2} key={e} />
              )}
            </Stack>
            :
            <Box >
              <MembersTable families={family} toggleUpdateForm={updateModal.onOpen} selectMember={setSelectedMember} removeMember={setFamily} error={setError} />
            </Box>
          }
        </Box>
      </Center>

    </>
  )
}

export default App
