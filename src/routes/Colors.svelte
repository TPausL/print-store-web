<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import { faCircle } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { colord } from 'colord';

	import type { Color } from '@prisma/client';
	export let colors;

	async function handleColorNameChange(color: Color, newText: string) {
		const res = await fetch('/api/color/' + color.id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: newText
			})
		});
		console.log('res', await res.json());
		invalidate('app:db');
	}

	async function handleColorHexChange(color: Color, newHex: string) {
		const res = await fetch('/api/color/' + color.id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				displayHex: newHex
			})
		});
		console.log('res', await res.json());
		invalidate('app:db');
	}

	let saveTimeout: number;
</script>

<table>
	{#each colors as color}
		<tr>
			<td class="flex items-center">
				{#key color}
					<ColorPicker
						on:input={(e) => {
							clearTimeout(saveTimeout);
							saveTimeout = setTimeout(() => {
								handleColorHexChange(color, e.detail.hex);
							}, 1000);
						}}
						hex={color.displayHex}
						label={''}
					/>
					<!-- <FontAwesomeIcon icon={faCircle} style="color: {color.hex}" /> -->
					<EditSpan text={color.text} onSave={(newText) => handleColorNameChange(color, newText)} />
				{/key}
			</td>
		</tr>
	{/each}
</table>
