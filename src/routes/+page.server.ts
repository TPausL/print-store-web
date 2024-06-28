// src/routes/+page.server.ts


import prisma from '$lib/prisma';

//import type { PageServerLoad } from './$types';


export const load = (async () => {
    const response = await prisma.product.findMany({
        include: {
            color: true,
            size: true,
            shape: true
        }
    });
    return { products: response };

}) //satisfies PageServerLoad;