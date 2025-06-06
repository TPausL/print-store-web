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
		SOLD = 'sold',
		TO_PRODUCE = 'to_produce'
	}

	import {
		faBoxesStacked,
		faBullseye,
		faDollarSign,
		faHashtag,
		faHourglassHalf,
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
	import type { ReturnStorageData } from '$lib/generated/client';
	let {
		products,
		storages = [],
		selectedStorage = $bindable()
	}: PageData & { selectedStorage: ReturnStorageData } = $props();
	let sortBy: { col: SortCol; dir: 'asc' | 'desc' }[] = $state([]);
	let search = $state('');
	let extended_prods = $derived(
		map(products, (prod) => {
			return {
				...prod,
				to_produce: prod.should - prod.is < 0 ? 0 : prod.should - prod.is
			};
		})
	);
	let filteredProds = $derived(
		orderBy(
			filter(extended_prods, (storageProd) => {
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

<div class="card shadow-2xl bg-gradient-to-tr from-secondary to-accent p-5 flex flex-col h-full">
	<div class="flex w-full justify-center items-center flex-shrink-0">
		<label
			class="input input-bordered flex flex-[9] items-center gap-2 focus-within:outline-none focus:outline-none"
		>
			<FontAwesomeIcon class="text-[#9ca3af]" size={'sm'} icon={faSearch} />
			<input bind:value={search} type="text" class="grow" placeholder="Search" />
		</label>

		<div class="dropdown dropdown-start flex-[3]">
			<div
				tabindex="-1"
				role="button"
				class={`btn m-1 w-full ${selectedStorage?.name ? 'bg-base-100' : 'btn-error'}`}
			>
				{selectedStorage?.name ?? 'No Storages exist yet!'}
			</div>
			{#if storages.length > 0}
				<ul
					tabindex="-1"
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
			{/if}
		</div>
	</div>
	<div class="flex-grow overflow-auto min-h-0">
		<table class="table table-pin-rows text-lg font-medium w-full bg-transparent px-1">
			<thead>
				<tr class="bg-transparent border-none text-base backdrop-blur-sm">
					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faRulerHorizontal} /> Größe
							<button onclick={() => toggleSort(SortCol.SIZE)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SIZE })?.dir} />
							</button>
						</div>
					</th>
					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faSwatchbook} />Farbe<button
								onclick={() => toggleSort(SortCol.COLOR)}
								class="btn btn-circle btn-ghost"
							>
								<SortIndicator sortDir={find(sortBy, { col: SortCol.COLOR })?.dir} />
							</button>
						</div></th
					>

					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faShapes} />Form<button
								onclick={() => toggleSort(SortCol.SHAPE)}
								class="btn btn-circle btn-ghost"
							>
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SHAPE })?.dir} />
							</button>
						</div>
					</th>

					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faBullseye} />Soll
							<button onclick={() => toggleSort(SortCol.SHOULD)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SHOULD })?.dir} />
							</button>
						</div>
					</th>
					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faBoxesStacked} />Ist
							<button onclick={() => toggleSort(SortCol.IS)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.IS })?.dir} />
							</button>
						</div>
					</th>
					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faHourglassHalf} />TBD
							<button
								onclick={() => toggleSort(SortCol.TO_PRODUCE)}
								class="btn btn-circle btn-ghost"
							>
								<SortIndicator sortDir={find(sortBy, { col: SortCol.TO_PRODUCE })?.dir} />
							</button>
						</div>
					</th>
					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faDollarSign} />Vkft.
							<button onclick={() => toggleSort(SortCol.SOLD)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SOLD })?.dir} />
							</button>
						</div>
					</th>

					<th class="p-0">
						<div class="flex xl:gap-2 items-center">
							<FontAwesomeIcon class="mr-1" icon={faPen} />Bearbeiten
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredProds as storageProd (storageProd)}
					{#if storageProd.product}
						<Row {storageProd} />
					{/if}
				{/each}
			</tbody>
			<tfoot class="border-none">
				<tr class="bg-transparent border-none text-base backdrop-blur-sm">
					<th>Gesamt: </th>
					<th></th>
					<th></th>
					<th class="p-0 pl-1">
						<span class="badge badge-lg badge-secondary ml-1">
							{sumBy(filteredProds, 'should')}
						</span>
					</th>
					<th>
						<span class="badge badge-lg badge-secondary ml-1">{sumBy(filteredProds, 'is')}</span>
					</th>
					<th>
						<span class="badge badge-lg badge-secondary ml-1">
							{sumBy(filteredProds, 'to_produce') < 0 ? 0 : sumBy(filteredProds, 'to_produce')}
						</span>
					</th>
					<th class="p-0 pl-1">
						<span class="badge badge-lg badge-secondary ml-1">{sumBy(filteredProds, 'sold')}</span>
					</th>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
