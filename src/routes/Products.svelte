<script lang="ts">
	import type { PageData } from './$types';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import _ from 'lodash';
	const { map, uniq, sumBy, capitalize, filter, find, remove, orderBy } = _;
	enum SortCol {
		SIZE = 'size.width',
		COLOR = 'color.text',
		SHAPE = 'shape.text',
		COUNT = 'count'
	}

	import {
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
	export let data: PageData;
	$: products = data.products;

	let sortBy: { col: SortCol; dir: 'asc' | 'desc' }[] = [];

	$: filteredProds = orderBy(
		filter(products, (prod) => {
			return (
				prod.size.text.toLowerCase().includes(search.toLowerCase()) ||
				prod.color.text.toLowerCase().includes(search.toLowerCase()) ||
				prod.shape.text.toLowerCase().includes(search.toLowerCase()) ||
				prod.count.toString().includes(search)
			);
		}),
		sortBy.map((s) => s.col),
		sortBy.map((s) => s.dir)
	);
	let search = '';
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
	$: sortSizeIcon = getSortIcon(SortCol.SIZE);
</script>

<div class="card shadow-2xl basis-8/12 bg-gradient-to-tr from-secondary to-accent p-5">
	<label
		class="input input-bordered flex items-center gap-2 focus-within:outline-none focus:outline-none"
	>
		<FontAwesomeIcon class="text-[#9ca3af]" size={'sm'} icon={faSearch} />
		<input bind:value={search} type="text" class="grow" placeholder="Search" />
	</label>
	<div class="h-full overflow-scroll">
		<table class="table table-pin-rows text-lg font-medium w-full bg-transparent">
			<thead>
				<tr class="bg-transparent border-none text-base backdrop-blur-sm">
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faRulerHorizontal} /> Größe
							<button on:click={() => toggleSort(SortCol.SIZE)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SIZE })?.dir} />
							</button>
						</div>
					</th>
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faSwatchbook} />Farbe<button
								on:click={() => toggleSort(SortCol.COLOR)}
								class="btn btn-circle btn-ghost"
							>
								<SortIndicator sortDir={find(sortBy, { col: SortCol.COLOR })?.dir} />
							</button>
						</div></th
					>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faShapes} />Form<button
								on:click={() => toggleSort(SortCol.SHAPE)}
								class="btn btn-circle btn-ghost"
							>
								<SortIndicator sortDir={find(sortBy, { col: SortCol.SHAPE })?.dir} />
							</button>
						</div></th
					>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faHashtag} />Anzahl
							<button on:click={() => toggleSort(SortCol.COUNT)} class="btn btn-circle btn-ghost">
								<SortIndicator sortDir={find(sortBy, { col: SortCol.COUNT })?.dir} />
							</button>
						</div></th
					>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faPen} />Bearbeiten
						</div></th
					>
				</tr>
			</thead>
			<tbody>
				{#each filteredProds as prod}
					<Row {prod} />
				{/each}
			</tbody>
		</table>
	</div>
</div>
