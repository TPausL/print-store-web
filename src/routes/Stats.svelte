<script lang="ts">
	import _ from 'lodash';
	import type { PageData } from './$types';
	export let data: PageData;
	let { colors, shapes, sizes } = data;
	$: products = data.products;
	const { map, uniq, sumBy } = _;
</script>

<div class="stats stats-vertical shadow bg-gradient-to-tr from-secondary to-accent">
	<div class="stat">
		<div class="stat-figure">
			<i class="fa-solid fa-cubes fa-2xl" />
		</div>
		<div class="stat-title">Produkte im Lager</div>
		<div class="stat-value">{sumBy(products, 'count')}</div>
		<div class="stat-desc">In {products.length} versch. Kombinationen</div>
	</div>
	<div class="stat">
		<div class="stat-figure">
			<i class="fa-solid fa-swatchbook fa-2xl" />
		</div>
		<div class="stat-title">Farben im Lager</div>
		<div class="stat-value">{uniq(map(products, 'colorId')).length}</div>
		<div class="stat-desc">
			Das entspricht {((100 * uniq(map(products, 'colorId')).length) / colors.length) | 0} % aller Farben.
		</div>
	</div>
	<div class="stat">
		<div class="stat-figure">
			<i class="fa-solid fa-shapes fa-2xl" />
		</div>
		<div class="stat-title">Formen im Lager</div>
		<div class="stat-value">{uniq(map(products, 'shapeId')).length}</div>
		<div class="stat-desc">
			Das entspricht {((100 * uniq(map(products, 'shapeId')).length) / shapes.length) | 0} % aller Formen.
		</div>
	</div>
</div>
