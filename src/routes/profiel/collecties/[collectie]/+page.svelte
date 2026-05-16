<script lang="ts">
	import type { PageData } from '../../../../../.svelte-kit/types/src/routes';
	import logo from '$lib/images/GameCoverPlaceholder.jpg';

	let { data }: { data: PageData } = $props();
</script>

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
	{#each data.games as game}
		<div class="collectionGame">
			<div class="gameInformation">
				<img src={logo} alt="Een placeholder image voor gamecover">
				<div class="collectionNameDescription">
					<h3 class="gameTitle">{game.title}</h3>
					<p class="gameDescription">{game.description}</p>
				</div>
			</div>
			<a href="/catalogus/{game.id}">Bekijk details</a>
		</div>
	{/each}
{/if}