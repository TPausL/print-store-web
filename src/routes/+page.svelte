<script lang="ts">
	import Colors from './Colors.svelte';
	import Products from './Products.svelte';
	import Stats from './Stats.svelte';
	export let data;
</script>

<div class="flex flex-row dir justify-center gap-5 h-[calc(100%-88px)] p-5">
	<div class="flex flex-col basis-5/12 gap-5">
		<Stats {data} />
		<Colors colors={data.colors} />
	</div>
	<Products {data} />
</div>
