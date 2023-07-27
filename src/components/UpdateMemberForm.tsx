import { Button, FormControl, FormLabel, HStack, Input, Select } from '@chakra-ui/react'
import React, { FormEvent } from 'react'
import userService from '../services/userService'

interface Family {
    _id: string,
    name: string,
    age: number,
    role: string,
    birthday: string
}

interface Props {
    families: Family[]
    selectedMember: any,
    setMember: (e: any) => any,
    updateMember: (e: any) => any,
    error: (e: any) => any,
    onClose: (e: any) => any
}

export const UpdateMemberForm = ({ families, selectedMember, setMember, updateMember, error, onClose }: Props) => {

    const updateHandler = (e: FormEvent) => {
        e.preventDefault();
        const newMember = {
            name: selectedMember.name,
            age: selectedMember.age,
            role: selectedMember.role,
            birthday: selectedMember. birthday
        }

        const updatedMember = families.map(member => member._id === selectedMember._id ? {...member, ...selectedMember}: member);

        

        userService.update(newMember, selectedMember._id).then((res) => {
            updateMember(updatedMember)
            onClose(e)
        })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <>
            <form onSubmit={updateHandler}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input id='name' type='text' value={selectedMember.name} onChange={(e) => setMember({ ...selectedMember, name: e.target.value })} placeholder='Name' required />
                    <FormLabel>Age</FormLabel>
                    <Input id='age' type='number' value={selectedMember.age} onChange={(e) => setMember({ ...selectedMember, age: e.target.value })} placeholder='Age' required />
                    <FormLabel>Role</FormLabel>
                    <Select id='role' value={selectedMember.role} onChange={(e) => setMember({ ...selectedMember, role: e.target.value })} placeholder='Select Role' required>
                        <option value='Father'>Father</option>
                        <option value='Mother'>Mother</option>
                        <option value='Son'>Son</option>
                        <option value='Daughter'>Daughter</option>
                        <option value='Grand Father'>Grand Father</option>
                        <option value='Grand Mother'>Grand Mother</option>
                        <option value='Grand Son'>Grand Son</option>
                        <option value='Grand Daughter'>Grand Daughter</option>
                    </Select>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input id='birthday' type='date' value={selectedMember.birthday} onChange={(e) => setMember({ ...selectedMember, birthday: e.target.value })} required />
                </FormControl>
                <HStack justifyContent='right' marginTop='10'>
                    <Button colorScheme='teal' type='submit' mr={3}>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </HStack>
            </form>
        </>
    )
}
