import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function PATCH(req) {
    let id = req.params.id;
    let data = await req.request.json();
    let { is, should, sold, ...rest } = data;
    try {
        let dbRes = await prisma.$transaction(async (tx) => {
            // 1. Decrement amount from the sender.
            const prod = await tx.productsInStorages.update({
                data: {
                    is: { increment: data.is ?? 0 - (data.sold ?? 0) },
                    should: { increment: data.should ?? 0 },
                    sold: { increment: data.sold ?? 0 }
                },
                where: {
                    id
                }
            })

            // 2. Verify that the sender's balance didn't go below zero.
            if (prod.is < 0) {
                throw new Error(`There are no more products in the storage to delete!`);
            }
        });
        return json({ data: dbRes });
    } catch (error) {
        return json({ error: error.message }, { status: 400 });
    }

}
