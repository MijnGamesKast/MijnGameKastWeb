<script lang="ts">
	import type { PageData } from '../../../../../.svelte-kit/types/src/routes';

	let { data }: { data: PageData } = $props();
</script>

<a href="/profiel/collecties">Terug naar collecties</a>

{#if data.collectie}
	<h1>{data.collectie.name}</h1>
	<p>{data.collectie.description}</p>
{:else}
	<h1>Collectie</h1>
{/if}

{#if data.message}
	<p style="color: red; font-weight: bold;">{data.message}</p>
{/if}

{#if data.games.length === 0}
	<p>Er zitten nog geen games in deze collectie.</p>
{:else}
	<ul style="list-style: none; padding: 0;">
		{#each data.games as game}
			<li style="margin-bottom: 1rem; border: 1px solid #ccc; padding: 1rem;">
				<h2>{game.title}</h2>
				<p>{game.description}</p>
			</li>
		{/each}
	</ul>
{/if}