// src/routes/+page.server.ts

import prisma from '$lib/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, depends }) => {
	const products = prisma.product.findMany({
		include: {
			color: true,
			size: true,
			shape: true
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});
	let colors;
	try {
		colors = await prisma.color.findMany({ orderBy: { text: 'asc' } });
	} catch (error) {
		console.log('error', error);
	}

	const sizes = await prisma.size.findMany({ orderBy: { width: 'asc' } });
	const shapes = await prisma.shape.findMany();

	depends('app:db');
	return { colors, sizes, shapes, products: await products };
}; //satisfies PageServerLoad;
