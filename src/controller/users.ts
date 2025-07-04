import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";

export const createUser = async (request: Request, response: Response) => {
    const { name, email, password, roleId } = request.body;
    const user = await prisma.user.create({
        data: { 
            name:name, 
            email:email,
            role: {
                connect: {
                    id: roleId
                }
            },
            password: {
                create: {
                    hash: bcrypt.hashSync(password, 10)
                }
            }
        }
    });
    response.json(user);
}

export const listUsers = async (request: Request, response: Response) => {
    const users = await prisma.user.findMany({
        include: {
            role: true
        }
    });
    response.json(users);
}