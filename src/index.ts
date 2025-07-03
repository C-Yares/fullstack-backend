import express from "express";
import prisma from "./prismaClient";

const app = express();



app.get('/', (req: express.Request, res: express.Response) => {
    console.log('Got request')
    res.send('I got your request')
})
app.get('/roles', async(req: express.Request, res: express.Response)=>{
    const roles = await prisma.role.findMany({
        include: {
            permissions: true,
        }
    })
    res.json(roles);
})
app.listen(8888, () => {
    console.log('Server is running on port 8888')
})