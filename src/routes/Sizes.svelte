<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
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
		const res = await fetch('/api/size/' + size.id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				[prop]: value
			})
		});
		console.log('res', await res.json());
		if (prop == 'text') invalidate('app:db');
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
						on:click={() => {
							fetch('/api/size/' + size.id, {
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
				</td>
			</tr>
		{/each}
	</tbody>
</table>
