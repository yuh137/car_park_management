import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, { params }: { params: { username: string } }){
    // const body = await request.json();
    const id = params.username;

    const res = await prisma.admin.findFirst({
        where: {
            username: id,
        }
    })
    // const services = await res.json();

    return new Response(JSON.stringify(res));
} 