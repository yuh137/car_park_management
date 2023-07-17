import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, { params }: { params: { username: string } }){
    // const body = await request.json();
    const id = params.username;

    const user = await prisma.admin.findFirst({
        where: {
            username: id,
        }
    })

    return new Response(JSON.stringify(user));
} 