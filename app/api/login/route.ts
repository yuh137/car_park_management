import prisma from "@lib/prisma"
import * as bcrypt from 'bcrypt';

interface RequestBody {
    username: string,
    password: string
}

export async function GET(request: Request){
    
    
}

export async function POST(request: Request){
    const body: RequestBody = await request.json();
    
    const admin = await prisma.admin.findFirst({
        where: {
            username: body.username
        }
    })

    if (admin && (await bcrypt.compare(body.password, admin.password))) {
        // const { password, ...adminWithoutPass } = admin;
        return new Response(JSON.stringify(admin));
    }
    else return new Response(JSON.stringify(null));
}