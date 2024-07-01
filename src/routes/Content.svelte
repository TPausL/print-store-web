<script lang="ts">
	import type { PageData } from './$types';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import _ from 'lodash';
	const { map, uniq, sumBy, capitalize, filter, find, remove, orderBy } = _;
	enum SortCol {
		SIZE = 'size.text',
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
	export let data: PageData;
	let { products, colors, shapes, sizes } = data;

	let sortBy: { col: SortCol; dir: 'asc' | 'desc' } | [] = [];

	$: filtered_prods = orderBy(
		filter(products, (prod) => {
			return (
				prod.size.text.toLowerCase().includes(search.toLowerCase()) ||
				prod.color.text.toLowerCase().includes(search.toLowerCase()) ||
				prod.shape.text.toLowerCase().includes(search.toLowerCase()) ||
				prod.count.toString().includes(search)
			);
		}),
		[sortBy.map((s) => s.col)],
		[sortBy.map((s) => s.dir)]
	);
	$: console.log(sortBy.map((s) => s.col));
	$: console.log(sortBy.map((s) => s.dir));
	let search = '';
	let icons = [faSort, faSortUp, faSortDown];
	$: test = 0;
	//$: console.log(sortBy);
	//$: console.log(sortBy);
	function toggleSort(col: SortCol) {
		let sort = find(sortBy, { col: col });
		if (!sort) {
			test = 1;
			sortBy = [{ col, dir: 'asc' }, ...filter(sortBy, (s) => s.col !== col)];
		} else {
			if (sort.dir === 'asc') {
				test = 2;
				let new_SortBy = [{ col, dir: 'desc' }, ...filter(sortBy, (s) => s.col !== col)];
				sortBy = [...new_SortBy];
			} else {
				test = 0;
				sortBy = [...filter(sortBy, (s) => s.col !== col)];
			}
		}
	}

	function handleMinus(e) {
		console.log(e);
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

<div class="card shadow-2xl basis-3/4 bg-gradient-to-tr from-secondary to-accent p-5">
	<label
		class="input input-bordered flex items-center gap-2 focus-within:outline-none focus:outline-none"
	>
		<FontAwesomeIcon icon={faSearch} />
		<input bind:value={search} type="text" class="grow" placeholder="Search" />
	</label>
	{search}
	<div class="h-full overflow-scroll">
		<table class="table table-pin-rows text-lg font-medium w-full bg-transparent">
			<thead>
				<tr class="bg-transparent border-none text-base backdrop-blur-sm">
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faRulerHorizontal} /> Größe
							<button
								on:click={() => toggleSort(SortCol.SIZE)}
								class="btn btn-circle btn-ghost ml-auto"
							>
								{#if find(sortBy, { col: SortCol.SIZE })}
									{#if find(sortBy, { col: SortCol.SIZE }).dir === 'asc'}
										<FontAwesomeIcon icon={faSortUp} />
									{:else}
										<FontAwesomeIcon icon={faSortDown} />
									{/if}
								{:else}
									<FontAwesomeIcon icon={faSort} />
								{/if}
							</button>
						</div>
					</th>
					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faSwatchbook} />Farbe<button
								on:click={() => toggleSort(SortCol.COLOR)}
								class="btn btn-circle btn-ghost ml-auto"
							>
								{#if find(sortBy, { col: SortCol.COLOR })}
									{#if find(sortBy, { col: SortCol.COLOR }).dir === 'asc'}
										<FontAwesomeIcon icon={faSortUp} />
									{:else}
										<FontAwesomeIcon icon={faSortDown} />
									{/if}
								{:else}
									<FontAwesomeIcon icon={faSort} />
								{/if}
							</button>
						</div></th
					>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faShapes} />Form<button
								on:click={() => toggleSort(SortCol.SHAPE)}
								class="btn btn-circle btn-ghost ml-auto"
							>
								{#if find(sortBy, { col: SortCol.SHAPE })}
									{#if find(sortBy, { col: SortCol.SHAPE }).dir === 'asc'}
										<FontAwesomeIcon icon={faSortUp} />
									{:else}
										<FontAwesomeIcon icon={faSortDown} />
									{/if}
								{:else}
									<FontAwesomeIcon icon={faSort} />
								{/if}
							</button>
						</div></th
					>

					<th>
						<div class="flex items-center gap-2">
							<FontAwesomeIcon class="mr-1" icon={faHashtag} />Anzahl<button
								on:click={() => toggleSort(SortCol.COUNT)}
								class="btn btn-circle btn-ghost ml-auto"
							>
								{#if find(sortBy, { col: SortCol.COUNT })}
									{#if find(sortBy, { col: SortCol.COUNT }).dir === 'asc'}
										<FontAwesomeIcon icon={faSortUp} />
									{:else}
										<FontAwesomeIcon icon={faSortDown} />
									{/if}
								{:else}
									<FontAwesomeIcon icon={faSort} />
								{/if}
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
				{#each filtered_prods as prod}
					<tr class="p-1 border-none">
						<td>{prod.size.text}</td>
						<td
							><i class="fa-solid fa-circle mr-2" style="color: {prod.color.hex}" />{prod.color
								.text}</td
						>
						<td>{prod.shape.text}</td>
						<td><span class="badge badge-primary badge-secondary">{prod.count}</span></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- <Grid
		
		data={products}
		fixedHeader
		style={{
			container: {
				height: "100%"
			}
		}}
		height="calc(100% - 59px)"
		sort
		search= {{
			selector: (cell, rowIndex, cellIndex) => {
				if (cellIndex === 1) {
					return cell.text;
				} else {
					return cell;
				}
			}
		  }},
		language={{
			search: {
				placeholder: '🔎 Durchsuchen'
			},
			language: 'de'
		}}
		columns={[
			{
				name: html(
					'<i class="fa-solid fa-ruler-horizontal fa-xl" style="padding-right: 8px"></i>  Größe'
				),
				data: (prod) => prod.size.text
			},
			{
				name: html(
					'<i class="fa-solid fa-swatchbook fa-xl" style="padding-right: 8px"></i>  Farbe'
				),
				data: (prod) => prod.color,
				sort: {
					compare: (a, b) => {
						if (a.text < b.text) return -1;
						if (a.text > b.text) return 1;
						return 0;
					}
				},
				formatter: (cell, row, col) => {
					return html(
						`<span style="color: ${row.cells[1].data}"><i class="fa-solid fa-circle fa-xl" style="color: ${cell.hex}"></i> ${cell.text}</span>`
					);
				}
			},
			{
				name: html('<i class="fa-solid fa-shapes fa-xl" style="padding-right: 8px"></i>  Form'),
				data: (prod) => prod.shape.text,
				formatter: (cel) => capitalize(cel)
			},
			{
				name: html('<i class="fa-solid fa-hashtag fa-xl" style="padding-right: 8px"></i>  Anzahl'),
				data: (prod) => prod.count
			}, {
				name: "Bearbeiten",
				data: (prod) => prod,
				formatter: (cell) => {
					return html(
						`<button onClick={handleMinus} class="btn btn-primary">Minus</a>`
					);
				}
			}
		]}
	/> -->
</div>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.css';
	@import './page.css';
</style>
