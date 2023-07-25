import { Box, Flex } from '@chakra-ui/react'
import { MembersTable } from './components/MembersTable'
import { AddMemberForm } from './components/AddMemberForm'
import { useEffect, useState } from 'react';

import { CanceledError } from './services/api-client';
import userService, { Member } from './services/userService';

function App() {
  const [family, setFamily] = useState<Member[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


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
     {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      <Flex>
        <Box w='30%' p={5} >
          <AddMemberForm families={family} addMember={setFamily} error={setError}/>
        </Box>
        <Box w='100%' p={5} >
          <MembersTable families={family} editMember={setFamily} removeMember={setFamily} error={setError}/>
        </Box>

      </Flex>
    </>
  )
}

export default App
