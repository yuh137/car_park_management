import prisma from "@lib/prisma";

export async function GET({ params }: { params: { vehicleId: string } }){
    const vehicleId = params.vehicleId;

    const res = await prisma.vehicle.findUnique({
        where: {
            identification: vehicleId,
        }
    })
}

export async function DELETE({ params }: { params: { vehicleId: string } }) {
    const vehicleId = params.vehicleId;

    const res = await prisma.vehicle.delete({
        where: {
            identification: vehicleId,
        }
    })

    return new Response(JSON.stringify(res));
}