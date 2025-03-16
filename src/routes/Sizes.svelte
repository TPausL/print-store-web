<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import { deleteSize, updateSize } from '$lib/generated/client';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { Size } from '@prisma/client';
	import toast from 'svelte-french-toast';
	export let sizes;

	const handleChange = async (
		prop: 'text' | 'width' | 'height',
		size: Size,
		value: string | number
	) => {
		const res = await updateSize({ path: { id: size.id }, body: { [prop]: value } });
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
	<thead>
		<tr>
			<th>Text</th>
			<th>Breite</th>
			<th>Höhe</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each sizes as size}
			<tr>
				<td
					><div class="flex items-center">
						<EditSpan onSave={(val) => handleChange('text', size, val)} text={size.text} />
					</div>
				</td>
				<td
					><div class="flex items-center">
						<EditSpan
							onSave={(val) => handleChange('width', size, parseInt(val))}
							number
							suffix={'mm'}
							text={size.width}
						/>
					</div>
				</td>
				<td
					><div class="flex items-center">
						<EditSpan
							onSave={(val) => handleChange('height', size, parseInt(val))}
							number
							suffix={'mm'}
							text={size.height}
						/>
					</div>
				</td>
				<td>
					<button
						class="btn btn-circle btn-ghost btn-sm ml-2 text-primary"
						onclick={async () => {
							const res = await deleteSize({ path: { id: size.id } });
							console.log(res.status);
							if (res.status >= 400) {
								toast.error(
									res.response.data.message ?? res.response.data.message[0] ?? res.message,
									{
										style: 'background-color: #dc2626; color: white;'
									}
								);
								if (prop == 'text') invalidate('app:db');
							} else {
								invalidate('app:db');
								toast.success('Größe gelöscht', {
									style: 'background-color: #16a085; color: white;'
								});
							}
						}}
						><FontAwesomeIcon icon={faTrash} />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
