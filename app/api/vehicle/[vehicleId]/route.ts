import prisma from "@lib/prisma";

export async function GET(request: Request, { params }: { params: { vehicleId: string } }){
    const vehicleId: string = params.vehicleId;

    const res = await prisma.vehicle.findUnique({
        where: {
            identification: vehicleId,
        }
    })

    return new Response(JSON.stringify(res));
}

export async function DELETE(request: Request, { params }: { params: { vehicleId: string } }) {
    const vehicleId = params.vehicleId;

    const res = await prisma.vehicle.delete({
        where: {
            identification: vehicleId,
        }
    })

    return new Response(JSON.stringify(res));
}