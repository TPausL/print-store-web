import prisma from '$lib/prisma.js';
import { Prisma } from '@prisma/client';
import { json } from '@sveltejs/kit';

export async function PATCH(req) {
	let id = req.params.id;
	let data = await req.request.json();

	let dbRes = await prisma.shape.update({
		data: data,
		where: {
			id
		}
	});
	return json({ data: dbRes }, {});
}

export async function DELETE(req) {
	let id = req.params.id;
	try {
		let dbRes = await prisma.shape.delete({
			where: {
				id
			}
		});
	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2003') {
				return json({ message: "Form kann nicht gelöscht werden, da Produkte in dieser Farbe existieren." }, { status: 409 });
			}
		}
		return json({ message: "Ein Fehler ist aufgetreten." }, { status: 500 });
	}
	return new Response(null, { status: 204 });
}

