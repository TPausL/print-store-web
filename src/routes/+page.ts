// src/routes/+page.server.ts


import type { PageLoad } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

import { client } from "$lib/generated/client/client.gen";
import { getColors, getProductsInStorage, getShapes, getSizes, getStorageProducts, getStorages } from '$lib/generated/client';

client.setConfig({
	baseURL: PUBLIC_API_HOST,
});

export const load: PageLoad = async ({ fetch, depends, params, url }) => {
	const products = (await getStorageProducts()).data?.data;
	const colors = (await getColors()).data?.data;
	const sizes = (await getSizes()).data?.data;
	const shapes = (await getShapes()).data?.data;
	const storages = (await getStorages()).data?.data;

	depends('app:db');
	return { colors, sizes, shapes, products, storages };
}; //satisfies PageServerLoad;
