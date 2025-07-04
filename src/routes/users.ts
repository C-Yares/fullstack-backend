import { Router } from "express";
import {listUsers, createUser, getUser} from "../controller/users"

const router = Router();

router.get('/users', listUsers);
router.post('/users', createUser);
router.get('/users/:id', getUser);

export default router;