<script lang="ts">
	import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	export let text;
	export let save: (newText: string) => void;

	let edit = false;
	$: editText = text;
</script>

<span
	class={$$props.class +
		' input p-1 focus:outline-none focus-within:outline-none ' +
		(edit ? '' : 'input-ghost')}
	contenteditable={edit}
	role="textbox"
	tabindex="0"
	on:mousedown={(e) => {
		if (!edit) e.preventDefault();
	}}
	on:keydown={(e) => {
		editText = e.target.innerText;

		if (e.key === 'Enter') {
			edit = false;
			e.target.blur();
			e.preventDefault();
			save(editText);
		}
	}}>{editText}</span
><button
	on:click={() => {
		edit = !edit;
		if (!edit) save(editText);
	}}
	class="btn btn-ghost btn-circle btn-sm"
>
	{#if edit}
		<FontAwesomeIcon icon={faCheck} />
	{:else}
		<FontAwesomeIcon icon={faPen} />
	{/if}
</button>
