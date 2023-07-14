import prisma from "@lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    const id = params.id;

    const res = await prisma.services.deleteMany({
        where: {
            id: id,
        }
    })

    return new Response(JSON.stringify(res));
}