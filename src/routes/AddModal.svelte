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
		faPlusMinus,
		faRuler,
		faRulerHorizontal,
		faShapes,
		faSwatchbook,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import _ from 'lodash';
	import Svelecte from 'svelecte';
	import toast, { Toaster } from 'svelte-french-toast';
	import Shapes from './Shapes.svelte';
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
	let storage: ReturnStorageData | undefined = $state();
	let cont: boolean = $state(false);
	$effect(() => {
		console.log('size: ', size);
	});
	const updateStorage = (value: ReturnStorageData) => {
		storage = value;
	};

	let is = $state(0);
	let should = $state(0);
	let hex = $derived(color?.displayHex);

	const clear = () => {
		size = null;
		shape = null;
		color = null;
		is = 0;
		should = 0;
	};
	const submit = async () => {
		console.log(color);
		const res = await createStorageProductAndProduct({
			body: {
				is: is,
				should: should,
				product: {
					colorId: color?.id,
					shapeId: shape?.id,
					sizeId: size?.id
				},
				storageId: selectedStorage?.id
			}
		});
		if (res.status < 400) {
			if (!cont) {
				modalRef?.close();
				clear();
			}
			invalidate('app:db');
			is = 0;
			should = 0;
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
	class="btn btn-lg btn-circle btn-primary fixed bottom-5 right-5 z-10"
	onclick={() => modalRef?.showModal()}
>
	<FontAwesomeIcon size="2xl" icon={faPlus} />
</button>
<dialog
	bind:this={modalRef}
	class="modal"
	onkeypress={(e) => {
		if (e.key == 'Enter' && e.ctrlKey) submit();
	}}
>
	<div class="modal-box overflow-hidden flex flex-col">
		<button
			class="btn btn-xs btn-circle mb-4 self-end"
			onclick={() => {
				modalRef?.close();
				clear();
			}}
		>
			<FontAwesomeIcon icon={faX} />
		</button>
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
				bind:selected={selectedStorage}
				{selectedText}
			/>
		</div>
		<input type="hidden" name="_method" value="_PATCH" />
		<fieldset class="fieldset mb-8">
			<legend class="fieldset-legend text-lg mb-1"
				><FontAwesomeIcon icon={faRulerHorizontal} /> Größe</legend
			>

			<Svelecte
				valueAsObject
				bind:value={size}
				valueField={'id'}
				labelField={'text'}
				options={sizes}
			/>

			<legend class="fieldset-legend text-lg mb-1"
				><FontAwesomeIcon icon={faSwatchbook} /> Farbe</legend
			>
			<Svelecte
				valueAsObject
				bind:value={color}
				valueField={'id'}
				labelField={'text'}
				options={colors}
			/>
			<legend class="fieldset-legend text-lg mb-1"><FontAwesomeIcon icon={faShapes} /> Form</legend>
			<Svelecte
				valueAsObject
				bind:value={shape}
				valueField={'id'}
				labelField={'text'}
				options={shapes}
			/>
			<div class="flex mt-8">
				<div class="flex-6">
					<legend class="fieldset-legend text-lg mb-1"
						><FontAwesomeIcon icon={faPlusMinus} /> Menge</legend
					>
					<input
						onwheel={(e) => (is += e.deltaY < 0 ? 1 : -1)}
						type="number"
						bind:value={is}
						class="input validator input-secondary w-10/12"
						required
						placeholder="Im Lager ..."
					/>
				</div>
				<div class="flex-6">
					<legend class="fieldset-legend text-lg mb-1"
						><FontAwesomeIcon icon={faBullseye} /> Soll</legend
					>
					<input
						onwheel={(e) => (should += e.deltaY < 0 ? 1 : should >= 1 ? -1 : 0)}
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
			<div class="flex items-center mr-4">
				<label class="mr-2">Weiter hinzufügen</label>
				<input type="checkbox" bind:checked={cont} class="checkbox checkbox-primary" />
			</div>
			<button class="btn btn-primary w-fit" onclick={submit}>Hinzufügen</button>
		</div>
	</div>
	<Toaster position="top-right" />
</dialog>
