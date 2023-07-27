import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import userService from '../services/userService';
import { countAge } from '../helpers/countAge';

interface Family {
    name: string,
    age: number,
    role: string,
    birthday: string
}

interface Props {
    families: Family[]
    addMember: (e: any) => any,
    error: (e: any) => any,
    onClose: (e: any) => any
}

export const AddMemberForm = ({ families, addMember, error, onClose }: Props) => {
    const [member, setMember] = useState({
        name: '',
        age: 0,
        role: '',
        birthday: ''
    })
    const [hasError, setHasError] = useState(false);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        const newMember = { ...member }

        if (!hasError) {
            userService.create(newMember)
                .then(res => {
                    addMember([res.data, ...families]);
                    onClose(e);
                })
                .catch(err => {
                    error(err.message);
                })
        }
    }

    const birthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const age = countAge(e.target.value);

        if (!age) {
            setHasError(true)
        } else {
            setHasError(false);
        }

        setMember({ ...member, birthday: e.target.value, age })
    }



    return (
        <>
            <form onSubmit={submitHandler}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input id='name' type='text' value={member.name} onChange={(e) => setMember({ ...member, name: e.target.value })} placeholder='Name' required />
                </FormControl>

                <FormControl>
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
                </FormControl>

                <FormControl isInvalid={hasError}>
                    <FormLabel >Date of Birth</FormLabel>
                    <Input id='birthday' type='date' value={member.birthday} onChange={birthdayHandler} placeholder='Enter Date of Birth' required />
                    {hasError && <FormErrorMessage id='birthday'>Invalid date of birth.</FormErrorMessage>}
                </FormControl>
                <FormLabel>Age</FormLabel>
                <Input id='age' type='number' value={member.age} placeholder='Age' disabled />
                <HStack justifyContent='right' marginTop='10'>
                    <Button colorScheme='teal' type='submit' mr={3}>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </HStack>

            </form>
        </>
    )
}
