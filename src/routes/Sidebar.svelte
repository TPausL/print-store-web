<script lang="ts">
	import _ from 'lodash';
	import type { PageData } from './$types';
	export let data: PageData;
	let { products, colors, shapes, sizes } = data;
	console.log(colors);
	const { map, uniq, sumBy } = _;
</script>

<div class="card basis-1/4 shadow-xl">
	<h1 class="text-xl text-center font-bold">Zusammenfassung</h1>
	<div class="stats shadow m-5">
		<div class="stat">
			<div class="stat-figure">
				<i class="fa-solid fa-cubes fa-2xl" />
			</div>
			<div class="stat-title">Produkte im Lager</div>
			<div class="stat-value">{sumBy(products, 'count')}</div>
		</div>
		<div class="stat">
			<div class="stat-figure">
				<i class="fa-solid fa-swatchbook fa-2xl" />
			</div>
			<div class="stat-title">Farben im Lager</div>
			<div class="stat-value">{uniq(map(products, 'color_id')).length}</div>
			<div class="stat-desc">
				Das entspricht {((100 * uniq(map(products, 'color_id')).length) / colors.length) | 0} % aller
				Farben.
			</div>
		</div>
		<div class="stat">
			<div class="stat-figure">
				<i class="fa-solid fa-shapes fa-2xl" />
			</div>
			<div class="stat-title">Formen im Lager</div>
			<div class="stat-value">{uniq(map(products, 'shape_id')).length}</div>
			<div class="stat-desc">
				Das entspricht {((100 * uniq(map(products, 'color_id')).length) / shapes.length) | 0} % aller
				Formen.
			</div>
		</div>
	</div>
</div>
