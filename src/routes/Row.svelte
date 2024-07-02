<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { faCheck, faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { Product } from '@prisma/client';
	import type { PageData } from './$types';
	type Prod = PageData['products'][0];

	export let prod: Prod;
	$: console.log('prod', prod.color.text);
	$: colorText = prod.color.text;
	let editColor = false;

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

	async function handleColorNameChange() {
		console.log('colorText', colorText);
		const res = await fetch('/api/color/' + prod.colorId, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: colorText
			})
		});
		console.log('res', await res.json());
		invalidate('app:db');
	}
</script>

<tr class="p-1 border-none">
	<td>{prod.size.text}</td>
	<td>
		<i class="fa-solid fa-circle mr-2" style="color: {prod.color.hex}" />

		<span
			class={'input focus:outline-none focus-within:outline-none ' +
				(editColor ? '' : 'input-ghost')}
			contenteditable={editColor}
			role="textbox"
			tabindex="0"
			on:keydown={(e) => {
				colorText = e.target.innerText;

				if (e.key === 'Enter') {
					editColor = false;
					e.target.blur();
					e.preventDefault();
					e.stopImmediatePropagation();
					e.stopPropagation();
					handleColorNameChange();
					return;
				}
			}}>{colorText}</span
		><button
			on:click={() => {
				editColor = !editColor;
				if (!editColor) handleColorNameChange();
			}}
			class="btn btn-ghost btn-circle btn-sm"
		>
			{#if editColor}
				<FontAwesomeIcon icon={faCheck} />
			{:else}
				<FontAwesomeIcon icon={faPen} />
			{/if}
		</button>
	</td>
	<td>{prod.shape.text} </td>
	<td><span class="badge badge-primary badge-secondary">{prod.count}</span></td>
	<td>
		<button on:click={() => handleMinus(prod)} class="btn btn-sm btn-primary btn-circle">
			<FontAwesomeIcon icon={faMinus} />
		</button>
	</td>
</tr>
