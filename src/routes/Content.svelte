<script>
	export let products;
	import _ from 'lodash';
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	const { map, uniq, sumBy, capitalize } = _;
	+console.log(products);
</script>

<div class=" card shadow-2xl basis-3/4 p-5">
	<h1 class="text-xl text-center font-bold">Produkte</h1>

	<Grid
		data={products}
		fixedHeader
		sort
		search
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

				formatter: (cell, row, col) => {
					console.log(cell, row, col);
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
			}
		]}
	/>
</div>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
</style>
