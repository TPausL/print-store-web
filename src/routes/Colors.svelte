<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import { faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { colord } from 'colord';

	import ColorPickerWrapper from './ColorPickerWrapper.svelte';
	import toast from 'svelte-french-toast';
	import { error, json } from '@sveltejs/kit';
	import { deleteColor, updateColor, type Color } from '$lib/generated/client';

	const { colors } = $props();

	async function handleColorNameChange(color: Color, newText: string) {
		await updateColor({ path: { id: color.id }, body: { text: newText } });
		invalidate('app:db');
	}

	async function handleColorHexChange(color: Color, newHex: string) {
		const res = await updateColor({ path: { id: color.id }, body: { displayHex: newHex } });
		if (res.data?.data?.displayHex != color.displayHex) {
			invalidate('app:db');
		}
	}

	let saveTimeout: unknown;
</script>

<table>
	<tbody>
		{#each colors as color}
			<tr>
				<td class="flex items-center">
					{#key color}
						<ColorPicker
							on:input={(e) => {
								clearTimeout(saveTimeout);
								saveTimeout = setTimeout(() => {
									console.log('change');

									handleColorHexChange(color, e.detail.hex as string);
								}, 1000);
							}}
							components={{ wrapper: ColorPickerWrapper }}
							hex={color.displayHex}
							label={''}
						/>
						<!-- <FontAwesomeIcon icon={faCircle} style="color: {color.hex}" /> -->
						<EditSpan
							text={color.text}
							onSave={(newText) => handleColorNameChange(color, newText)}
						/>
						<button
							class="btn btn-circle btn-ghost btn-sm ml-2 text-primary"
							onclick={() => {
								deleteColor({ path: { id: color.id } }).then(async (res) => {
									if (res.status >= 400) {
										console.error('Failed to delete color.');
										toast.error(res.response.data.message, {
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
	</tbody>
</table>
<div id="portal" />
