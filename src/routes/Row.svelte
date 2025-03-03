<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { faMinus } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { PageData } from './$types';
	import toast from 'svelte-french-toast';
	type Prod = PageData['products'][0]['product'];

	let { storageProd }: { storageProd: PageData['products'][0] } = $props();
	const prod = storageProd?.product;
	$effect(() => console.log(storageProd.id));
	async function handleTrash(prod: Prod) {
		try {
			const res = await fetch('/api/storageProduct/' + storageProd.id + '/increment', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					is: -1
				})
			});
			console.log(res);
			if (res.status >= 400) {
				console.log("Couldn't delete product", res);
				toast.error((await res.json()).message, {
					style: 'background-color: #dc2626; color: white;'
				});
				return;
			}
			invalidate('app:db');
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
	<td><span class="badge badge-primary badge-secondary">{storageProd.should}</span></td>
	<td
		><span
			class={`badge ${storageProd.is < storageProd.should ? 'badge-error' : 'badge-primary'} badge-secondary`}
			>{storageProd.is}</span
		></td
	>
	<td><span class="badge badge-success badge-secondary">{storageProd.sold}</span></td>
	<td>
		<button on:click={() => handleTrash(prod)} class="btn btn-sm btn-primary btn-circle">
			<FontAwesomeIcon icon={faMinus} />
		</button>
	</td>
</tr>
