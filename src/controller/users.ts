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
    const users = await prisma.user.findMany();
    response.json(users);
}

export const getUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    });

    if(!user){
        response.status(404).json({error: "User not found"});
        return;
    }

    response.json(user);
}

export const deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
        where:{
            id: Number(id)
        }
    });
    if(!user){
        response.status(404).json({error: "User not found"});
        return
    }
    await prisma.user.delete({
        where:{
            id: Number(id)
        }
    });
    response.json({message: "User deleted successfully"});
}