import { Request, Response } from "express";
import prisma from "../prismaClient";

export const listRoles = async (request: Request, response: Response) => {
    const roles = await prisma.role.findMany({
        include: {
            permissions: true,
        }
    });
    response.json(roles);
}

export const createRole = async (request: Request, response: Response) => {
    const { name, permissions } = request.body;
    await prisma.role.create({
        data: {
            name: name,
            permissions: {
                connect: permissions.map((p: string) => {
                    return {
                        name: p
                    }
                })
            }
        }
    })
    response.json({message: 'Role created successfully'});
}    