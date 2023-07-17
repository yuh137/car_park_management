import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, { params }: { params: { vehicleId: string } }){
    // const body = await request.json();
    const vehicleId = params.vehicleId;

    const res = await prisma.services.findMany({
        where: {
            vehicleId: vehicleId,
        }
    })
    // const services = await res.json();

    return new Response(JSON.stringify(res));
}

export async function DELETE(request: Request, { params }: { params: { vehicleId: string } }){
    const vehicleId = params.vehicleId;
    

    const res = await prisma.services.deleteMany({
        where: {
            id: vehicleId,
        }
    })

    return new Response(JSON.stringify(res));
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const vehicleId = await req.query
// }