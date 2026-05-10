<script lang="ts">
  import logo from '$lib/images/GameCoverPlaceholder.jpg'
	let { data } = $props();
</script>

<div id="catalogWrapper">
	<div class="catalogHeader">
		<div>
			<h2>Catalogus pagina</h2>
			<p>Op deze pagina komen alle games te staan van de catalogus</p>
		</div>
		<a href="/catalogus/nieuw">Game toevoegen</a>
	</div>

	{#if data.catalog?.length}
		<div class="game-list">
			{#each data.catalog as game}
				<div class="game-card">
					<img src={logo} alt="Een placeholder image voor gamecover">
					<h3>{game.title}</h3>
					<p>{game.description}</p>
					<a href="/catalogus/{game.id}">Bekijk details</a>
					<a href="/catalogus/{game.id}/toevoegen-aan-collectie">Toevoegen aan collectie</a>

				</div>
			{/each}
		</div>
	{:else}
		<p>Geen games gevonden.</p>
	{/if}
</div>