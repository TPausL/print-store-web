<script>
    export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<ul>
    {#each data.products as product}
        <li>
            <p>{product.color.hex}</p>
        </li>
        <button class="btn">Hello</button>
    {/each}
</ul>
