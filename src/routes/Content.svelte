<script lang="ts">
	import type {PageData} from './$types';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
	import { faHashtag, faPen, faRulerHorizontal, faShapes, faSwatchbook } from '@fortawesome/free-solid-svg-icons'
	export let data: PageData;
	let { products, colors, shapes, sizes } = data;
	import _ from 'lodash';
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	const { map, uniq, sumBy, capitalize } = _; 
	import type {Product} from '@prisma/client';

	function handleMinus(e) {
		console.log(e);
	}
</script>

<div class="card shadow-2xl basis-3/4 p-5 bg-gradient-to-tr from-secondary to-accent">

	<div class="h-full overflow-scroll">

	<table class="table table-pin-rows text-lg font-medium w-full bg-transparent">
		<thead>
			<tr class="bg-transparent border-none text-base backdrop-blur-sm">
				<th><FontAwesomeIcon class="mr-1" icon={faRulerHorizontal} /> Größe</th>
				<th><FontAwesomeIcon class="mr-1" icon={faSwatchbook} />Farbe</th>
				<th><FontAwesomeIcon class="mr-1" icon={faShapes} />Form</th>
				<th><FontAwesomeIcon class="mr-1" icon={faHashtag} />Anzahl</th>
				<th><FontAwesomeIcon class="mr-1" icon={faPen} />Bearbeiten</th>
			</tr>
		</thead>
		<tbody>
		{#each products as prod}
		<tr class="p-1 border-none">
			<td>{prod.size.text}</td>
			<td><i class="fa-solid fa-circle mr-2" style="color: {prod.color.hex}"/>{prod.color.text}</td>
			<td>{prod.shape.text}</td>
			<td>{prod.count}</td>
			
		</tr>
		{/each}
	</tbody>
		
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
	@import "./page.css";
</style>
