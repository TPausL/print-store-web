<script lang="ts">
	import toast, { Toaster } from 'svelte-french-toast';
	import { browser } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import Colors from './Colors.svelte';
	import Products from './Products.svelte';
	import Shapes from './Shapes.svelte';
	import Sizes from './Sizes.svelte';
	import Stats from './Stats.svelte';
	export let data;
	if (browser) {
		let source = new EventSource('http://localhost:5000/stream');
		source.addEventListener(
			'new_product',
			function (event) {
				invalidate('app:db');
				toast.success('New Product added', {
					style: 'background-color: #00b0b8; color: white',
					duration: 5000
				});
			},
			false
		);
		source.addEventListener(
			'new_color',
			function (event) {
				invalidate('app:db');
				toast.success('New color added', {
					style: 'background-color: #00b0b8; color: white',
					duration: 5000
				});
			},
			false
		);
		source.addEventListener(
			'error',
			function (event) {
				console.log('Failed to connect to event stream.');
			},
			false
		);
	}
</script>

<Toaster position={'top-right'} />

<div class="flex flex-row dir justify-center gap-5 h-[calc(100%-88px)] p-5">
	<div class="flex flex-col gap-5 basis-4/12">
		<div class="card basis-5/12">
			<Stats {data} />
		</div>
		<div class="card shadow-2xl bg-gradient-to-tr from-secondary to-accent p-5 grow shrink min-h-0">
			<div role="tablist" class="tabs tabs-boxed tabs-md bg-transparent relative max-h-full">
				<input
					type="radio"
					name="category_tabs"
					role="tab"
					class="tab !rounded-lg"
					aria-label="Farben"
					checked
				/>
				<div role="tabpanel" class="tab-content overflow-scroll border-0 h-[calc(100%-0.5rem)] m-1">
					<Colors colors={data.colors} />
				</div>

				<input
					type="radio"
					name="category_tabs"
					role="tab"
					class="tab !rounded-lg"
					aria-label="Größen"
				/>
				<div role="tabpanel" class="tab-content">
					<Sizes sizes={data.sizes} />
				</div>

				<input
					type="radio"
					name="category_tabs"
					role="tab"
					class="tab !rounded-lg"
					aria-label="Formen"
				/>
				<div role="tabpanel" class="tab-content">
					<Shapes shapes={data.shapes} />
				</div>
			</div>
		</div>
	</div>
	<Products {data} />
</div>
