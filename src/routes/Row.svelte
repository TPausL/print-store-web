<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { faCashRegister, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { PageData } from './$types';
	import toast from 'svelte-french-toast';
	import { incrementStorageProductsAmounts } from '$lib/generated/client';

	let { storageProd }: { storageProd: PageData['products'][0] } = $props();
	const prod = storageProd?.product;
	$effect(() => console.log(storageProd.id));
	async function handleChange({ is = 0, sold = 0 }: { is?: number; sold?: number }) {
		try {
			const res = incrementStorageProductsAmounts({
				path: { id: storageProd.id },
				body: { is, sold }
			});

			console.log(res);
			if (res.status >= 400) {
				const msg = res.response.data.message ?? res.response.data.message[0] ?? res.message;
				console.log("Couldn't delete product", msg);
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

<tr class="p-1 border-none">
	<td>{prod.size.text}</td>
	<td>
		<i class="fa-solid fa-circle mr-2" style="color: {prod.color.displayHex}" />
		<span>{prod.color.text}</span>
	</td>
	<td>{prod.shape.text} </td>
	<td><span class="badge badge-lg badge-secondary ml-1">{storageProd.should}</span></td>
	<td
		><h1
			class={`badge ml-1 badge-lg ${storageProd.is < storageProd.should ? 'badge-error' : 'badge-secondary'}`}
		>
			{storageProd.is}
		</h1></td
	>
	<td><span class="badge ml-1 badge-lg badge-success">{storageProd.sold}</span></td>
	<td class="text-nowrap">
		<button onclick={() => handleChange({ is: -1 })} class="btn btn-md btn-error btn-circle mr-1">
			<FontAwesomeIcon icon={faTrash} />
		</button>
		<button onclick={() => handleChange({ sold: 1 })} class="btn btn-md btn-error btn-circle mr-1">
			<FontAwesomeIcon icon={faCashRegister} />
		</button>
		<button onclick={() => handleChange({ is: 1 })} class="btn btn-md btn-success btn-circle mr-1">
			<FontAwesomeIcon icon={faPlus} />
		</button>
	</td>
</tr>
