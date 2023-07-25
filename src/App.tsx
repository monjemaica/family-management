
import { Box, Flex } from '@chakra-ui/react'
import { MembersTable } from './components/MembersTable'
import { AddMemberForm } from './components/AddMemberForm'
import { useState } from 'react';
function App() {
  const [family, setFamily] = useState([
    { id: 1, name: "Anna", age: 22, role: "Mother", birthday: "1956-07-25" },
    { id: 2, name: "Jess", age: 18, role: "Daughter", birthday: "2000-07-25" }
  ]);

  return (
    <>
      <Flex>
        <Box w='30%' p={5} >
          <AddMemberForm families={family} addMember={setFamily}/>
        </Box>
        <Box w='100%' p={5} >
          <MembersTable families={family}/>
        </Box>

      </Flex>
    </>
  )
}

export default App
