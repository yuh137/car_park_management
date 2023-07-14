import prisma from "@lib/prisma";

export async function POST(request: Request){
    const body = await request.json();

    const newService = await prisma.services.create({
        data: {
            vehicle: {connect: { identification: body.vehicleId }},
            serviceName: body.serviceName,
            price: body.price
        }
    })

    return new Response(JSON.stringify(newService));
}

export async function DELETE(request: Request){
    const body: { vehicleId: string, serviceName: string } = await request.json();

    const res = await prisma.services.deleteMany({
        where: {
            vehicleId: body.vehicleId,
            serviceName: body.serviceName
        }
    })

    return new Response(JSON.stringify(res));
}