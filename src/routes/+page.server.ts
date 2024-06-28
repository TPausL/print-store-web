// src/routes/+page.server.ts


import prisma from '$lib/prisma';

import type { PageServerLoad } from './$types';


export const load = (async () => {
    const products = await prisma.product.findMany({
        include: {
            color: true,
            size: true,
            shape: true,
        },

        orderBy: [
            {
                size: {
                    width: 'asc'
                }
            },
            {
                color: {
                    hex: 'asc'
                }
            },
            {
                shape: {
                    text: 'asc'
                }
            }
        ]
    });
    const colors = await prisma.color.findMany();
    console.log(colors)
    const sizes = await prisma.size.findMany();
    const shapes = await prisma.shape.findMany();
    return { products, colors, sizes, shapes };

}) satisfies PageServerLoad;