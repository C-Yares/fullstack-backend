import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CONFIG from "../scripts/config";

const NO_AUTH_PATHS = ['./login'] 


export const authentication = (request: Request, response: Response, next: NextFunction) => {
   
    if(NO_AUTH_PATHS.includes(request.path)){
        next();
        return;
    }
    const headerToken = request.headers['authorization'];
    if(!headerToken){
        response.status(401).json({error: "Unauthorized"});
        return;
    }
    const token = headerToken.split(' ')[1];
    try{
        const decodedPayload = jwt.verify(token, CONFIG.JWT_SECRET) as any
        console.log('Decoded JWT payload:', decodedPayload);
        (request as any).userId = decodedPayload.userId;
        (request as any).roleId = decodedPayload.roleId;
        next();
    }catch(error){
        console.log('JWT verification failed:', error);
        response.status(401).json({error: "Unauthorized"});
        return;
    }
    

}