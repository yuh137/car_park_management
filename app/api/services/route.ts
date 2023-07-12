import prisma from "@lib/prisma";

export async function GET(request: Request){
    const body = await request.json();

    const res = await prisma.services.findMany({
        where: {
            vehicleId: body.vehicleId,
        }
    })

    return new Response(JSON.stringify(res));
} 

export async function POST(request: Request){
    const body = await request.json();
}