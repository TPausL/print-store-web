import { PrismaClient } from '@prisma/client'
import { env } from "$env/dynamic/private"


const prisma = new PrismaClient({ datasourceUrl: env.DSN })

export default prisma