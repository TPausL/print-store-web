<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import { faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { colord } from 'colord';

	import type { Color } from '@prisma/client';
	import ColorPickerWrapper from './ColorPickerWrapper.svelte';
	import toast from 'svelte-french-toast';
	import { error, json } from '@sveltejs/kit';
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
						components={{ wrapper: ColorPickerWrapper }}
						hex={color.displayHex}
						label={''}
					/>
					<!-- <FontAwesomeIcon icon={faCircle} style="color: {color.hex}" /> -->
					<EditSpan text={color.text} onSave={(newText) => handleColorNameChange(color, newText)} />
					<button
						class="btn btn-circle btn-ghost btn-sm ml-2 text-primary"
						on:click={() => {
							fetch('/api/color/' + color.id, {
								method: 'DELETE'
							}).then(async (res) => {
								if (res.status > 400) {
									console.error('Failed to delete color.');
									toast.error((await res.json()).message, {
										style: 'background-color: #dc2626; color: white;'
									});
								} else {
									invalidate('app:db');
								}
							});
						}}
						><FontAwesomeIcon icon={faTrash} />
					</button>
				{/key}
			</td>
		</tr>
	{/each}
</table>
<div id="portal" />
