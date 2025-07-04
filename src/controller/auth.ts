import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONFIG from "../scripts/config";

export const login = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = await prisma.user.findUnique({
        where: { email: 
            email 
        },
        include: {
            password: true
        }
    });
    if(!user || !user.password){
        response.status(404).json({error: "Invalid credentials"});
        return;
    }

    if(!bcrypt.compareSync(password, user.password.hash)){
        response.status(401).json({error: "Invalid credentials"});
        return;
    }
    
    const userPayload = {
        userId: user.id,
        roleId: user.role_id,
    }
    const token = jwt.sign(userPayload, CONFIG.JWT_SECRET, {expiresIn: "1d"});
    response.json({
        token: token,
        id: user.id,
        name: user.name,
        email: user.email,
    });
}