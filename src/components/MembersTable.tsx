import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import userService from '../services/userService'
import { FormEvent } from 'react';

interface Family {
  _id: string,
  name: string,
  age: number,
  role: string,
  birthday: string,
  isDeleted:string
}

interface Props {
  families: Family[],
  toggleUpdateForm: (e: any) => any;
  selectMember: any;
  removeMember: (e: any) => any;
  error: (e: any) => any;
}

export const MembersTable = ({ families, toggleUpdateForm, removeMember, error, selectMember }: Props) => {
  
  const updateHandler = (member: Family, e: FormEvent) => {
    toggleUpdateForm(e);
    selectMember(member)

  }

  const deleteMember = (member: Family) => {
    removeMember(families.filter((res) => res._id !== member._id));
    
    userService.delete(member._id)
    .catch(err => {
      error(err.message)
    });
  }

  const filteredMembers = families.filter((member) => !member.isDeleted)

  return (
    <TableContainer  borderRadius='10px'>
      
      <Table variant='simple' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th>Member Name</Th>
            <Th>Age</Th>
            <Th>Role</Th>
            <Th>Date of Birth</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredMembers.map((member) =>
            <Tr key={member._id}>
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
                  onClick={(e) => updateHandler(member,e)}
                />
                <IconButton
                  colorScheme='red'
                  size='sm'
                  aria-label='Call Segun'
                  marginX={1}
                  icon={<DeleteIcon />}
                  onClick={() => deleteMember(member)}
                />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
