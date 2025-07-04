import { Router } from "express";
import {listUsers, createUser, getUser, deleteUser} from "../controller/users"

const router = Router();

router.get('/users', listUsers);
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);

export default router;