import prisma from "@lib/prisma";

interface updateRequestBody {
    newIncome: number;
}

export async function GET(request: Request, { params }: { params: { username: string } }){
    // const body = await request.json();
    const id = params.username;

    const user = await prisma.admin.findFirst({
        where: {
            username: id,
        }
    })

    return new Response(JSON.stringify(user));
} 

export async function POST(request: Request, { params }: { params: { username: string } }){
    const name = params.username;
    const body: updateRequestBody = await request.json();

    const user = await prisma.admin.updateMany({
        where: {
            username: name
        },
        data: {
            totalIncome: {
                increment: body.newIncome
            }
        }
    })

    return new Response(JSON.stringify(user))
}