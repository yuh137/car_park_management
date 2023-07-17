import prisma from "@lib/prisma";
import { Vehicle } from "@interfaces";

export async function GET(request: Request){
    const vehicles = await prisma.vehicle.findMany();

    return new Response(JSON.stringify(vehicles));
}

export async function POST(request: Request){
    const body: Vehicle = await request.json();

    const newVehicle = await prisma.vehicle.create({
        data: {
            admin: {connect: { id: "64a3e5cd89c2a7c399bb4482"}},
            identification: body.identification,
            owner: body.owner,
            model: body.model,
            typeName: body.typeName,
            inputTime: new Date(),
        }
    });

    return new Response(JSON.stringify(newVehicle));
}

export async function DELETE(request: Request){
    const body = await request.json();

    const vehicleToDelete = await prisma.vehicle.findUnique({
        where: {
            identification: body.identification,
        }
    })
}