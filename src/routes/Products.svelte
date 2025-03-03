<script lang="ts">
	import type { PageData } from './$types';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import _ from 'lodash';
	const { map, uniq, sumBy, capitalize, filter, find, remove, orderBy } = _;
	enum SortCol {
		SIZE = 'product.size.width',
		COLOR = 'product.color.text',
		SHAPE = 'product.shape.text',
		SHOULD = 'should',
		IS = 'is',
		SOLD = 'sold'
	}

	import {
		faBoxesStacked,
		faBullseye,
		faDollarSign,
		faHashtag,
		faPen,
		faRulerHorizontal,
		faSearch,
		faShapes,
		faSort,
		faSortDown,
		faSortUp,
		faSwatchbook
	} from '@fortawesome/free-solid-svg-icons';
	import Row from './Row.svelte';
	import SortIndicator from '$lib/components/SortIndicator.svelte';
	let { products, storages = [] }: PageData = $props();
	let sortBy: { col: SortCol; dir: 'asc' | 'desc' }[] = $state([]);
	let search = $state('');

	let selectedStorage = $state(storages[0] ?? { name: 'Loading...' });
	$effect(() =>
		console.log(
			sortBy.map((s) => s.col),
			sortBy.map((s) => s.dir)
		)
	);
	let filteredProds = $derived(
		orderBy(
			filter(products, (storageProd) => {
				return (
					(storageProd.product.size.text.toLowerCase().includes(search.toLowerCase()) ||
						storageProd.product.color.text.toLowerCase().includes(search.toLowerCase()) ||
						storageProd.product.shape.text.toLowerCase().includes(search.toLowerCase())) &&
					storageProd.storageId === selectedStorage.id
				);
			}),
			sortBy.map((s) => s.col),
			sortBy.map((s) => s.dir)
		)
	);
	$effect(() => console.log(map(filteredProds, (p) => p.product.id)));
	function toggleSort(col: SortCol) {
		let sort = find(sortBy, { col: col });
		if (!sort) {
			sortBy = [...filter(sortBy, (s) => s.col !== col), { col, dir: 'asc' }];
		} else {
			if (sort.dir === 'asc') {
				sortBy = [...filter(sortBy, (s) => s.col !== col), { col, dir: 'desc' }];
			} else {
				sortBy = [...filter(sortBy, (s) => s.col !== col)];
			}
		}
	}

	function getSortIcon(col: SortCol) {
		let pref = 'fa-solid fa-sort';
		let sort = find(sortBy, { col: col });
		if (sort) {
			return pref + (sort.dir === 'asc' ? '-up' : '-down');
		} else {
			return pref;
		}
	}
</script>

<div class="card shadow-2xl basis-8/12 bg-gradient-to-tr from-secondary to-accent p-5">
	<div class="flex w-full justify-center items-center">
		<label
			class="input input-bordered flex flex-[9] items-center gap-2 focus-within:outline-none focus:outline-none"
		>
			<FontAwesomeIcon class="text-[#9ca3af]" size={'sm'} icon={faSearch} />
			<input bind:value={search} type="text" class="grow" placeholder="Search" />
		</label>

		<div class="dropdown dropdown-start flex-[3]">
			<div tabindex="0" role="button" class="btn m-1 w-full bg-base-100">
				{selectedStorage.name}
			</div>
			<ul
				tabindex="0"
				class="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm"
			>
				{#each storages as storage}
					<li>
						<a
							onclick={() => {
								//@ts-ignore
								document.activeElement.blur();
								selectedStorage = find(storages, { id: storage.id });
							}}>{storage.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="h-full overflow-scroll">
		<table class="table table-pin-rows text-lg font-medium w-full bg-transparent">
			<thead>
				<tr class="bg-transparent border-none text-base backdrop-blur-sm">
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faRulerHorizontal} /> Größe
							<button onclick={() => toggleSort(SortCol.SIZE)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SIZE })?.dir} />
							</button>
						</div>
					</th>
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faSwatchbook} />Farbe<button
								onclick={() => toggleSort(SortCol.COLOR)}
								class="btn btn-circle btn-ghost"
							>
								<SortIndicator sortDir={find(sortBy, { col: SortCol.COLOR })?.dir} />
							</button>
						</div></th
					>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faShapes} />Form<button
								onclick={() => toggleSort(SortCol.SHAPE)}
								class="btn btn-circle btn-ghost"
							>
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SHAPE })?.dir} />
							</button>
						</div>
					</th>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faBullseye} />Soll
							<button onclick={() => toggleSort(SortCol.SHOULD)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SHOULD })?.dir} />
							</button>
						</div>
					</th>
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faBoxesStacked} />Ist
							<button onclick={() => toggleSort(SortCol.IS)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.IS })?.dir} />
							</button>
						</div>
					</th>
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faDollarSign} />Verkauft
							<button onclick={() => toggleSort(SortCol.SOLD)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SOLD })?.dir} />
							</button>
						</div>
					</th>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faPen} />Bearbeiten
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredProds as storageProd (storageProd.id)}
					{#if storageProd.product}
						<Row {storageProd} />
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>
