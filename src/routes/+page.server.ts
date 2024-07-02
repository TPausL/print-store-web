// src/routes/+page.server.ts


import prisma from '$lib/prisma';

import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ fetch, depends }) => {
    const products = prisma.product.findMany({
        include: {
            color: true,
            size: true,
            shape: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },

    });
    const colors = await prisma.color.findMany();
    const sizes = await prisma.size.findMany();
    const shapes = await prisma.shape.findMany();

    depends("app:db")
    return { colors, sizes, shapes, products: await products };

} //satisfies PageServerLoad;