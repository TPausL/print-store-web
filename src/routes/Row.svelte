<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { faMinus } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { PageData } from './$types';
	type Prod = PageData['products'][0];

	export let prod: Prod;
	async function handleMinus(prod: Prod) {
		const res = await fetch('/api/product/' + prod.id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				count: prod.count - 1
			})
		});
		invalidate('app:db');
	}
</script>

<tr class="p-1 border-none">
	<td>{prod.size.text}</td>
	<td>
		<i class="fa-solid fa-circle mr-2" style="color: {prod.color.displayHex}" />
		<span>{prod.color.text}</span>
	</td>
	<td>{prod.shape.text} </td>
	<td><span class="badge badge-primary badge-secondary">{prod.count}</span></td>
	<td>
		<button on:click={() => handleMinus(prod)} class="btn btn-sm btn-primary btn-circle">
			<FontAwesomeIcon icon={faMinus} />
		</button>
	</td>
</tr>
