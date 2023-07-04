import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    try {
        const typeInit = await prisma.type.createMany({
            data: [
                {
                    name: "truck",
                    price: 9
                },
                {
                    name: "7-seaters",
                    price: 7
                },
                {
                    name: "4-seaters",
                    price: 5
                }
            ]
        })
    } catch (error) {
        console.log(error);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })