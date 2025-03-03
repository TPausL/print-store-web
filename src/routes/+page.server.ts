// src/routes/+page.server.ts

import prisma from '$lib/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, depends, params, url }) => {
	const products = await prisma.productsInStorages.findMany({
		include: {
			product: {
				include: {
					color: true,
					size: true,
					shape: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
	console.log('products', products.length);
	let colors;
	try {
		colors = await prisma.color.findMany({ orderBy: { text: 'asc' } });
	} catch (error) {
		console.log('error', error);
	}

	const sizes = await prisma.size.findMany({ orderBy: { width: 'asc' } });
	const shapes = await prisma.shape.findMany();
	const storages = await prisma.storage.findMany();


	depends('app:db');
	return { colors, sizes, shapes, products, storages };
}; //satisfies PageServerLoad;
