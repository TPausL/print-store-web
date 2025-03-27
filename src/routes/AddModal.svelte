<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { PUBLIC_API_HOST } from '$env/static/public';
	import Select from '$lib/components/Select.svelte';
	import {
		createStorageProductAndProduct,
		type Color,
		type ReturnColorData,
		type ReturnShapeData,
		type ReturnSizeData,
		type ReturnStorageData,
		type Shape,
		type Size
	} from '$lib/generated/client';
	import {
		faBoxesPacking,
		faBoxesStacked,
		faBullseye,
		faC,
		faCircle,
		faCirclePlus,
		faPaintBrush,
		faPlus,
		faRuler,
		faRulerHorizontal,
		faShapes,
		faSwatchbook
	} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import _ from 'lodash';
	import toast, { Toaster } from 'svelte-french-toast';
	const { map, find } = _;

	interface AddModalProps extends Record<string, any> {
		colors: ReturnColorData[];
		sizes: ReturnSizeData[];
		shapes: ReturnShapeData[];
		storages: ReturnStorageData[];
		selectedStorage: ReturnStorageData;
	}
	let { colors, sizes, shapes, storages, selectedStorage, ...rest }: AddModalProps = $props();

	let modalRef;
	let size: ReturnSizeData | undefined = $state();
	let shape: ReturnShapeData | undefined = $state();
	let color: ReturnColorData | undefined = $state();
	let storage: ReturnStorageData | undefined = $state(selectedStorage);
	let is = $state(0);
	let should = $state(0);
	let hex = $derived(color?.displayHex);

	const clear = () => {
		size = undefined;
		shape = undefined;
		color = undefined;
		storage = undefined;
		is = 0;
		should = 0;
	};
	const submit = async () => {
		const res = await createStorageProductAndProduct({
			body: {
				is: is,
				should: should,
				product: {
					colorId: color?.id,
					shapeId: shape?.id,
					sizeId: size?.id
				},
				storageId: storage?.id
			}
		});
		if (res.status < 400) {
			modalRef?.close();
			invalidate('app:db');
			clear();
			toast.success('Produkt hinzugefügt', {
				style: 'background-color: #16a085; color: white;'
			});
		} else {
			const msg = res.response.data.message ?? res.response.data.message[0] ?? res.message;
			toast.error(msg, {
				style: 'background-color: #dc2626; color: white;'
			});
		}
	};
</script>

<button
	class="btn btn-lg btn-circle btn-primary fixed bottom-5 right-5"
	onclick={() => {
		console.log(modalRef);
		modalRef?.showModal();
	}}
>
	<FontAwesomeIcon size="2xl" icon={faPlus} />
</button>
<dialog bind:this={modalRef} class="modal">
	<div class="modal-box overflow-hidden flex flex-col">
		<div class="flex justify-between">
			<h3 class="text-lg font-bold mb-8">
				<FontAwesomeIcon size="xl" icon={faCirclePlus} /> Produkt hinzufügen
			</h3>
			{#snippet selectedText(item: Storage)}
				<div class="flex items-center gap-2">
					{#if item}
						<FontAwesomeIcon icon={faBoxesPacking} />
						<span>{item?.name}</span>
					{:else}
						<span>Lager auswählen</span>
					{/if}
				</div>
			{/snippet}
			<Select
				class="!w-1/3"
				items={storages}
				textKey="name"
				bind:selected={storage}
				{selectedText}
			/>
		</div>
		<input type="hidden" name="_method" value="_PATCH" />
		<fieldset class="fieldset mb-8">
			<legend class="fieldset-legend text-lg mb-1"
				><FontAwesomeIcon icon={faRulerHorizontal} /> Größe</legend
			>

			<Select items={sizes} bind:selected={size} placeholder="Größe auswählen" />
			<legend class="fieldset-legend text-lg mb-1"
				><FontAwesomeIcon icon={faSwatchbook} /> Farbe</legend
			>
			{#snippet colorSelected(color: Color | undefined)}
				<div class="flex items-center gap-2">
					{#if color}
						<div class="w-5 h-5 rounded-full" style="background-color: {color?.displayHex}"></div>
						<span>{color?.text}</span>
					{:else}
						<span>Farbe auswählen</span>
					{/if}
				</div>
			{/snippet}
			{#snippet colorItem(c: Color)}
				<div class="w-5 h-5 rounded-full" style="background-color: {c.displayHex}"></div>
				<span>{c.text}</span>
			{/snippet}
			<Select
				items={colors}
				bind:selected={color}
				selectedText={colorSelected}
				itemText={colorItem}
			/>
			<legend class="fieldset-legend text-lg mb-1"><FontAwesomeIcon icon={faShapes} /> Form</legend>
			<Select items={shapes} bind:selected={shape} placeholder="Form auswählen" />
			<div class="flex mt-8">
				<div class="flex-6">
					<legend class="fieldset-legend text-lg mb-1"
						><FontAwesomeIcon icon={faBoxesStacked} /> Ist</legend
					>
					<input
						onwheel={(e) => (is += e.deltaY < 0 ? 1 : is >= 1 ? -1 : 0)}
						type="number"
						bind:value={is}
						class="input validator input-secondary w-10/12"
						required
						placeholder="Im Lager ..."
						min="0"
					/>
				</div>
				<div class="flex-6">
					<legend class="fieldset-legend text-lg mb-1"
						><FontAwesomeIcon icon={faBullseye} /> Soll</legend
					>
					<input
						onwheel={(e) => (should += e.deltaY < 0 ? 1 : should >= 1 ? -1 : 0)}
						onscroll={(e) => console.log(e)}
						bind:value={should}
						type="number"
						class="input validator input-secondary w-10/12"
						required
						placeholder="Sollwert ..."
						min={0}
					/>
				</div>
			</div>
		</fieldset>

		<div class="flex justify-end">
			<button class="btn btn-primary w-fit" onclick={submit}>Add product</button>
		</div>
	</div>
	<Toaster position="top-right" />
</dialog>
