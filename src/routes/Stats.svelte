<script lang="ts">
	import _ from 'lodash';
	let { products, selectedStorage } = $props();
	const { map, uniq, sumBy, uniqWith, uniqBy, filter, sum, max } = _;
	$effect(() => {
		console.log('products', selectedStorage.id);
	});

	let should = $derived(
		sumBy(
			filter(products, (o) => o.storageId == selectedStorage.id),
			'should'
		)
	);
	let is = $derived(
		sumBy(
			filter(products, (o) => o.storageId == selectedStorage.id),
			'is'
		)
	);
	let sold = $derived(
		sumBy(
			filter(products, (o) => o.storageId == selectedStorage.id),
			'sold'
		)
	);
	let toProduce = $derived(
		sum(
			map(
				filter(products, (o) => o.storageId == selectedStorage.id),
				(o) => {
					return max([0, o.should - o.is]);
				}
			)
		)
	);
	let soldAll = $derived(sumBy(products, 'sold'));
</script>

<div class="stats stats-vertical shadow bg-gradient-to-tr from-secondary to-accent">
	<div class="stat">
		<div class="stat-figure">
			<i class="fa-solid fa-cubes fa-2xl" />
		</div>
		<div class="stat-title text-wrap">Produkte in allen Lagern zusammen:</div>
		<div class="stat-value">{sumBy(products, 'is')}</div>
		<div class="stat-desc">In {uniqBy(products, 'productId').length} versch. Kombinationen</div>
	</div>
	<div class="stat">
		<div class="stat-figure">
			<i class="fa-solid fa-dollar fa-2xl" />
		</div>
		<div class="stat-title">Verkaufte Produkte insgesamt:</div>
		<div class="stat-value">{soldAll}</div>
		<div class="stat-desc">
			Davon {sold} aus {selectedStorage.name} ({((100 * sold) / soldAll) | 0} %)
		</div>
	</div>
	<div class="stat">
		<div class="stat-figure">
			<i class="fa-solid fa-bullseye fa-2xl" />
		</div>
		<div class="stat-title text-wrap">
			Produkte die für Lager {selectedStorage.name} hergestellt werden müssen:
		</div>
		<div class="stat-value">
			{toProduce}
		</div>
		<div class="stat-desc">
			{((100 * is) / should) | 0} % der Produkte sind also vorhanden.
		</div>
	</div>
</div>
