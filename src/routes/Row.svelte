<script lang="ts">
	import { invalidate } from '$app/navigation';
	import {
		faCashRegister,
		faCross,
		faMinus,
		faPlus,
		faTrash,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { PageData } from './$types';
	import toast from 'svelte-french-toast';
	import { deleteStorageProducts, incrementStorageProductsAmounts } from '$lib/generated/client';

	let { storageProd }: { storageProd: PageData['products'][0] } = $props();
	const prod = $derived(storageProd?.product);
	$effect(() => console.log(storageProd.id));
	async function handleChange({ is, sold = 0 }: { is?: number; sold?: number }) {
		try {
			const res = await incrementStorageProductsAmounts({
				path: { id: storageProd.id },
				body: { is, sold }
			});

			if (res.status >= 400) {
				const msg = res.response.data.message ?? res.response.data.message[0] ?? res.message;
				toast.error(msg, {
					style: 'background-color: #dc2626; color: white;'
				});
				return;
			} else {
				invalidate('app:db');
			}
		} catch (e) {
			console.log("Couldn't delete product", e);
		}
	}
	async function deleteStorageProd() {
		try {
			const res = await deleteStorageProducts({ path: { id: storageProd.id } });

			if (res.status >= 400) {
				const msg = res.response.data.message ?? res.response.data.message[0] ?? res.message;
				toast.error(msg, {
					style: 'background-color: #dc2626; color: white;'
				});
				return;
			} else {
				invalidate('app:db');
			}
		} catch (e) {
			console.log("Couldn't delete product", e);
		}
	}
</script>

<tr class="p-1 py-2 border-none">
	<td class="p-0 pl-1">{prod.size.text}</td>
	<td class="p-0 pl-1">
		<i class="fa-solid fa-circle mr-2" style="color: {prod.color.displayHex}"></i>
		<span>{prod.color.text}</span>
	</td>
	<td class="p-0 pl-1">{prod.shape.text} </td>
	<td class="p-0 pl-1"
		><span class="badge badge-lg badge-secondary ml-1">{storageProd.should}</span></td
	>
	<td
		><h1
			class={`badge ml-1 badge-lg ${storageProd.is < storageProd.should ? 'badge-error' : 'badge-secondary'}`}
		>
			{storageProd.is}
		</h1></td
	>
	<td class="p-0 pl-1"
		><span class="badge ml-1 badge-lg badge-secondary">{storageProd.sold}</span></td
	>
	<td class="text-nowrap join p-0 pl-1">
		<button onclick={() => handleChange({ sold: 1 })} class="btn btn-md join-item">
			<FontAwesomeIcon icon={faCashRegister} />
		</button>
		<button onclick={() => handleChange({ is: 1 })} class="btn btn-md join-item">
			<FontAwesomeIcon icon={faPlus} />
		</button>
		<button onclick={() => handleChange({ is: -1 })} class="btn btn-md join-item">
			<FontAwesomeIcon icon={faMinus} />
		</button>
		<button onclick={() => deleteStorageProd()} class="btn btn-md join-item">
			<FontAwesomeIcon icon={faTrash} />
		</button>
	</td>
</tr>
