<script lang="ts">
	import Content from './Content.svelte';
	import Sidebar from './Sidebar.svelte';
	export let data;
</script>

<div class="flex flex-row dir justify-center gap-5 h-[calc(100%-68px)] p-5">
	<Sidebar {data} />
	<Content {data} />
</div>
