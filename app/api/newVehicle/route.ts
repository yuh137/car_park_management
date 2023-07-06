import prisma from "@lib/prisma";

async function POST(request: Request){
    const body = await request.json();

    const newVehicle = await prisma.vehicle.create({
        data: {
            admin: {connect: { id: "64a3e5cd89c2a7c399bb4482"}},
            identification: body.id,
            owner: body.owner,
            model: body.model,
            typeName: body.type,
            inputTime: new Date()
        }
    });
}