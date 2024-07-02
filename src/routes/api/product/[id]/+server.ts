import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function PATCH(req) {
	let id = req.params.id;
	let data = await req.request.json();
	if (data.count <= 0) {
		await prisma.product.delete({
			where: {
				id
			}
		});
		return new Response(null, { status: 204 });
	} else {
		let dbRes = await prisma.product.update({
			data: data,
			where: {
				id
			}
		});
		return json({ data: dbRes }, {});
	}
}
