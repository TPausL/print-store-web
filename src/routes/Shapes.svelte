<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import { createShape, deleteShape, updateShape } from '$lib/generated/client';
	import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { Shape } from '@prisma/client';
	import toast from 'svelte-french-toast';
	const { shapes } = $props();

	const handleChange = async (
		prop: 'text' | 'width' | 'height',
		shape: Shape,
		value: string | number
	) => {
		const res = await updateShape({ path: { id: shape.id }, body: { [prop]: value } });
		if (res.status >= 400) {
			toast.error(res.response.data.message ?? res.response.data.message[0] ?? res.message, {
				style: 'background-color: #dc2626; color: white;'
			});
		} else {
			toast.success('Größe aktualisiert', {
				style: 'background-color: #16a085; color: white;'
			});
			if (prop == 'text') invalidate('app:db');
		}
	};

	let addValue = $state('');
</script>

<table>
	<tbody>
		{#each shapes as shape}
			<tr>
				<td
					><div class="flex items-center">
						<EditSpan onSave={(val) => handleChange('text', shape, val)} text={shape.text} />
						<button
							class="btn btn-circle btn-ghost btn-sm ml-2 text-error"
							onclick={() => {
								deleteShape({ path: { id: shape.id } }).then(async (res) => {
									if (res.status > 400) {
										toast.error(res.response.data.message, {
											style: 'background-color: #dc2626; color: white;'
										});
									} else {
										toast.success('Form gelöscht', {
											style: 'background-color: #16a085; color: white;'
										});
										invalidate('app:db');
									}
								});
							}}
							><FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				</td>
			</tr>
		{/each}
		<tr>
			<td class="flex items-center flex-row join">
				<input bind:value={addValue} placeholder="Name der Form" class="input input-sm mx-2" />
				<button
					class="btn btn-circle btn-ghost btn-sm ml-8"
					onclick={async () => {
						const res = await createShape({
							body: {
								text: addValue
							}
						});
						if (res.status >= 400) {
							const msg = res.response.data.message ?? res.response.data.message[0] ?? res.message;
							toast.error(msg, {
								style: 'background-color: #dc2626; color: white;'
							});
							return;
						} else {
							addValue = '';
							invalidate('app:db');
							toast.success('Successfully added color!', {
								style: 'background-color: #16a085; color: white;'
							});
						}
					}}
				>
					<FontAwesomeIcon size="xl" icon={faPlus} />
				</button>
			</td>
		</tr>
	</tbody>
</table>
