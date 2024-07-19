<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import type { Shape } from '@prisma/client';
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
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
