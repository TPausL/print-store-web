import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function PATCH(req) {
    let id = req.params.id;
    let data = await req.request.json();
    let dbRes = await prisma.color.update({
        data,
        where: {
            id
        }
    });

    return json({ data: dbRes }, {});
}

export async function DELETE(req) {
    let id = req.params.id;
    let dbRes = await prisma.color.delete({
        where: {
            id
        }
    });
    return new Response(null, { status: 204 });
}

