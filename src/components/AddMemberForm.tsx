import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import userService from '../services/userService';

interface Family {
    name: string,
    age: number,
    role: string,
    birthday: string
}

interface Props {
    families: Family[]
    addMember: (e: any) => any;
    error: (e: any) => any;
}

export const AddMemberForm = ({ families, addMember, error }: Props) => {
    const [member, setMember] = useState({
        name: '',
        age: '',
        role: '',
        birthday: ''
    })

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        const newMember = { ...member }

        userService.create(newMember)
            .then(res => {
                addMember([res.data, ...families])
            })
            .catch(err => {
                error(err.message);
            })
    }



    return (
        <>
            <form onSubmit={submitHandler}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input id='name' type='text' value={member.name} onChange={(e) => setMember({ ...member, name: e.target.value })} placeholder='Name' required />
                    <FormLabel>Age</FormLabel>
                    <Input id='age' type='number' value={member.age} onChange={(e) => setMember({ ...member, age: e.target.value })} placeholder='Age' required />
                    <FormLabel>Role</FormLabel>
                    <Select id='role' value={member.role} onChange={(e) => setMember({ ...member, role: e.target.value })} placeholder='Select Role' required>
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
                    <Input id='birthday' type='date' value={member.birthday} onChange={(e) => setMember({ ...member, birthday: e.target.value })} placeholder='Enter Date of Birth' required />
                    <Button colorScheme='teal' type='submit' mt={5}>Submit</Button>
                </FormControl>
            </form>
        </>
    )
}
