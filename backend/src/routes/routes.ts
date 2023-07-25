import express from 'express';
const router = express.Router();

import {createNewMember, getAllMembers, updateMember, deleteMember} from '../controller/familyController';

export default (): express.Router => {
    
    router.post('/families', createNewMember);
    router.get('/families', getAllMembers);
    router.put('/families/:id', updateMember);
    router.delete('/families/:id', deleteMember);

  return router;
};
