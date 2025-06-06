<script lang="ts">
	import { invalidate } from '$app/navigation';
	import EditSpan from '$lib/components/EditSpan.svelte';
	import { createSize, deleteSize, updateSize } from '$lib/generated/client';
	import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { Size } from '@prisma/client';
	import _ from 'lodash';
	const { isArray } = _;
	import toast from 'svelte-french-toast';
	let { sizes } = $props();

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

	let addValue = $state('');
	let addWidth = $state('');
	let addHeight = $state('');
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
						class="btn btn-circle btn-ghost btn-sm ml-2 text-error"
						onclick={async () => {
							const res = await deleteSize({ path: { id: size.id } });
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
		<tr>
			<td>
				<input bind:value={addValue} placeholder="Text" class="input input-sm mx-2 w-9/12" />
			</td>
			<td>
				<input
					bind:value={addWidth}
					type="number"
					min="1"
					placeholder="Breite"
					class="input input-sm mx-2 w-9/12"
				/>
			</td>
			<td class="flex items-center flex-row join">
				<input
					bind:value={addHeight}
					type="number"
					min="1"
					placeholder="Höhe"
					class="input input-sm mx-2 w-9/12"
				/>

				<button
					class="btn btn-circle btn-ghost btn-sm ml-8"
					onclick={async () => {
						const res = await createSize({
							body: {
								text: addValue,
								width: addWidth,
								height: addHeight
							}
						});
						if (res.status >= 400) {
							const msg = isArray(res.response.data.message)
								? res.response.data.message[0]
								: res.response.data.message ?? res.message;
							console.log(msg);
							toast.error(msg, {
								style: 'background-color: #dc2626; color: white;'
							});
							return;
						} else {
							addHeight = 0;
							addWidth = 0;
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
