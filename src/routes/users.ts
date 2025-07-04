import { Router } from "express";
import {listUsers, createUser, getUser, deleteUser} from "../controller/users"
import { authorization } from "../middlewares/authorization";
import { PERMISSIONS } from "../constants";

const router = Router();

router.get('/users', authorization([PERMISSIONS.USERS.READ]), listUsers);
router.get('/users/:id', authorization([PERMISSIONS.USERS.READ]), getUser);
router.post('/users', authorization([PERMISSIONS.USERS.EDIT]), createUser);
router.delete('/users/:id', authorization([PERMISSIONS.USERS.EDIT]), deleteUser);

export default router;