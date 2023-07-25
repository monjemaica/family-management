import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, IconButton, Img, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

interface Family {
  name: string,
  age: number,
  role: string,
  birthday: string
}

interface Props {
  families: Family[]
}
export const MembersTable = ({ families }: Props) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Photo</Th>
            <Th>Member Name</Th>
            <Th>Age</Th>
            <Th>Role</Th>
            <Th>Date of Birth</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {families.map((member) =>
            <Tr>
              <Td><Img src='https://randomuser.me/api/portraits/women/87.jpg' boxSize='50px' borderRadius='5px'></Img></Td>
              <Td>{member.name}</Td>
              <Td>{member.age}</Td>
              <Td>{member.role}</Td>
              <Td>{member.birthday}</Td>
              <Td>
                <IconButton
                  colorScheme='teal'
                  size='sm'
                  aria-label='Call Segun'
                  icon={<EditIcon />}
                />
                  <IconButton
                  colorScheme='red'
                  size='sm'
                  aria-label='Call Segun'
                  marginX={1}
                  icon={<DeleteIcon />}
                />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
