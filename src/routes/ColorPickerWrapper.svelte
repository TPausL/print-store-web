<script>
	import { portal } from 'svelte-portal';

	export let wrapper;
	export let isOpen;
	export let isDialog;
</script>

<div
	use:portal={'#portal'}
	bind:this={wrapper}
	class="wrapper"
	class:is-open={isOpen}
	role={isDialog ? 'dialog' : undefined}
	aria-label="color picker"
>
	<slot />
</div>

<style>
	div {
		padding: 8px;
		background-color: var(--cp-bg-color, white);
		margin: 0 10px 10px;
		border: 1px solid var(--cp-border-color, black);
		border-radius: 12px;
		display: none;
		width: max-content;
	}
	.is-open {
		display: inline-block;
	}
	[role='dialog'] {
		position: absolute;
		top: calc(var(--input-size, 25px) + 36px);
		left: 8px;
		z-index: var(--picker-z-index, 2);
	}
</style>
