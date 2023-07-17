import prisma from "@lib/prisma";

export async function DELETE(request: Request, { params }: { params: { vehicleId: string } }){
    const vehicleId = params.vehicleId;
    

    const res = await prisma.services.deleteMany({
        where: {
            vehicleId: vehicleId,
            serviceName: "wash"
        }
    })

    return new Response(JSON.stringify(res));
}