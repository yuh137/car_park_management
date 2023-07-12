import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest){
    // const body = await request.json();
    const res = await request.query.vehicleId;

    // const res = await prisma.services.findMany({
    //     where: {
    //         vehicleId: vehicleId,
    //     }
    // })

    return new Response(JSON.stringify(res));
} 

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const vehicleId = await req.query
// }