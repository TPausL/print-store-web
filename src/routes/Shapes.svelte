<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
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
		const res = await fetch('/api/shape/' + shape.id, {
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
		</tr>
	</thead>
	<tbody>
		{#each shapes as shape}
			<tr>
				<td
					><div class="flex items-center">
						<EditSpan onSave={(val) => handleChange('text', shape, val)} text={shape.text} />
						<button
							class="btn btn-circle btn-ghost btn-sm ml-2 text-primary"
							on:click={() => {
								fetch('/api/shape/' + shape.id, {
									method: 'DELETE'
								}).then(async (res) => {
									if (res.status > 400) {
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
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
