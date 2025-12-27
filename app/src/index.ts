import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

const connectionString: string = process.env.DATABASE_URL!;

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main(): Promise<void> {
    console.log('WRITE')
    await prisma.user.create({ data: { name: 'Alice' } })

    console.log('READ')
    const users = await prisma.user.findMany()
    console.log(users)
}

main()
    .finally(() => prisma.$disconnect())
