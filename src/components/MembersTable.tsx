import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

export const MembersTable = () => {
  return (
    <TableContainer>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Photo</Th>
          <Th>Member Name</Th>
          <Th>Mobile</Th>
          <Th>Email</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
        <Td>test</Td>
        <Td>test</Td>
        <Td>test</Td>
        <Td>test</Td>
        <Td>test</Td>
        </Tr>
      </Tbody>
    </Table>
  </TableContainer>
  )
}
