import prisma from "@lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
    username: string,
    password: string,
    createdAt: Date,
    totalIncome: number,
}

export async function POST(request: Request){
    const body: RequestBody = await request.json();

    try {
        const res = await prisma.admin.create({
            data: {
                username: body.username,
                password: await bcrypt.hash(body.password, 10),
                createdAt: new Date(),
                totalIncome: body.totalIncome || 0,
                lastVehicle: 0
            }
        })
        
        const { password, ...result} = res;
        return new Response(JSON.stringify(result));
    } catch (error) {
        console.log(error);
    }

    
}