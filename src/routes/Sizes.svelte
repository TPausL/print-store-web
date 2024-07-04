<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import type { Size } from '@prisma/client';
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
			</tr>
		{/each}
	</tbody>
</table>
