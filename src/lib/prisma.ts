import { PrismaClient } from '@prisma/client'
import { DSN } from "$env/static/private"


const prisma = new PrismaClient({ datasourceUrl: DSN })

export default prisma