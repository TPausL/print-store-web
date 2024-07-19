<script lang="ts">
	import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { KeyboardEventHandler } from 'svelte/elements';
	export let text;
	export let onSave: (newText: string) => void = () => {};
	export let number: boolean = false;
	export let suffix = '';

	let edit = false;
	$: editText = text;

	const handleKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e) => {
		//editText = e?.target?.innerText;
		//console.log(e.key);
		//console.log(number, !/^\d+$/.test(e.key), e.key != 'Backspace', e.key != 'Delete');
		switch (true) {
			case e.key == 'Enter':
				edit = false;
				e?.target?.blur();
				onSave(editText);
				break;
			case e.key == 'Escape':
				edit = false;
				e?.target?.blur();
				break;
			case number && !/^\d+$/.test(e.key) && e.key != 'Backspace' && e.key != 'Delete':
				e.preventDefault();
				break;
		}
	};
</script>
<div style={`width: ${String(editText).length * (number ? 1.5 : 1.1) + 0.5}ch`}>
<input
	class={$$props.class +
		' input p-1 focus:outline-none focus-within:outline-none flex items-center h-fit mh-1 w-full ' +
		(edit ? '' : 'input-ghost')}
	contenteditable={edit}
	role="textbox"
	tabindex="0"
	on:mousedown={(e) => {
		if (!edit) e.preventDefault();
	}}
	on:keydown={handleKeyDown}
	bind:value={editText}
/>
</div>
<span>{suffix}</span><button
	on:click={() => {
		if (edit) onSave(editText);
		edit = !edit;
	}}
	class="btn btn-ghost btn-circle btn-sm"
>
	{#if edit}
		<FontAwesomeIcon icon={faCheck} />
	{:else}
		<FontAwesomeIcon icon={faPen} />
	{/if}
</button>
