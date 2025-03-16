<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import { deleteShape, updateShape } from '$lib/generated/client';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { Shape } from '@prisma/client';
	import toast from 'svelte-french-toast';
	export let shapes;

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
</script>

<table>
	{#each shapes as shape}
		<tr>
			<td
				><div class="flex items-center">
					<EditSpan onSave={(val) => handleChange('text', shape, val)} text={shape.text} />
					<button
						class="btn btn-circle btn-ghost btn-sm ml-2 text-primary"
						on:click={() => {
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
</table>
