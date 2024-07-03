<script lang="ts">
	import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	export let sortDir: 'asc' | 'desc' | undefined = undefined;
</script>

{#if sortDir}
	{#if sortDir == 'asc'}
		<FontAwesomeIcon icon={faSortUp} />
	{:else}
		<FontAwesomeIcon icon={faSortDown} />
	{/if}
{:else}
	<FontAwesomeIcon icon={faSort} />
{/if}
