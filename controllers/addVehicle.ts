import prisma from "@lib/prisma";
import { Vehicle } from "@interfaces";

export async function addVehicle(vehicle: Vehicle) {
    await prisma.vehicle.create({
        data: {
            admin: {connect: { id: "64a3e5cd89c2a7c399bb4482"}},
            identification: vehicle.id,
            owner: vehicle.owner,
            model: vehicle.model,
            typeName: vehicle.type,
            inputTime: new Date()
        }
    })
}