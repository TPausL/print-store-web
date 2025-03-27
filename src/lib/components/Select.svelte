<script lang="ts" generics="T">
	import clsx from 'clsx';
	import _ from 'lodash';
	import type { Snippet } from 'svelte';
	const { find } = _;
	interface SelectProps extends Record<string, any> {
		items: T[];
		placeholder?: string;
		textKey?: string;
		idKey?: string;
		onSelection?: (item: T) => void;
		selectedText?: Snippet<[T | undefined]>;
		itemText?: Snippet<[T]>;
		selected?: T;
		class?: string;
	}
	let {
		items,
		textKey = 'text',
		idKey = 'id',
		onSelection,
		selectedText,
		itemText,
		placeholder,
		class: classProp,
		selected = $bindable(),
		...rest
	}: SelectProps = $props();
	//let selected: T | undefined = $state();
</script>

<div class={clsx('dropdown dropdown-start w-full', classProp)} {...rest}>
	<div
		tabindex="-1"
		role="button"
		class={`btn m-1 w-full ${selected ? ' bg-base-100' : 'bg-base-200 text-error'}`}
	>
		{#if selectedText}
			{@render selectedText(selected)}
		{:else}
			{selected ? selected[textKey] : placeholder ?? 'Bitte auswählen'}
		{/if}
	</div>
	<ul
		tabindex="-1"
		class="dropdown-content menu bg-base-100 rounded-box z-50 w-full p-2 shadow-sm overflow-scroll max-h-48 flex-nowrap"
	>
		{#each items as i}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<li>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					onclick={() => {
						//@ts-ignore
						document.activeElement.blur();
						selected = find(items, { [idKey]: i[idKey] });
					}}
					>{#if itemText}
						{@render itemText(i)}
					{:else}
						{i[textKey]}
					{/if}</a
				>
			</li>
		{/each}
	</ul>
</div>
