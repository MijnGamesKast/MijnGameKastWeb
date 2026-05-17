<script lang="ts">
	import logo from '$lib/images/GameCoverPlaceholder.jpg';

	// let { data }: { data: { game: Game; gebruiker: Gebruiker } } = $props();
	let { data } = $props();

	const isModerator = data.gebruiker?.role === 1;
</script>

<div id="CatalogGameWrapper">
	<div class="catalogGameOptions">
		<a href="/catalogus">← Terug</a>

		{#if isModerator}
			<div>
				<form method="POST" action="?/delete">
					<button id="removeGame" type="submit">
						Delete
					</button>
				</form>
			</div>
		{/if}
	</div>

	<div id="catalogGameList">
		<div class="catalogGameGroup">
			<img src={logo} alt="Een placeholder image voor gamecover" />
		</div>

		<div class="catalogGameGroup">
			<h2>{data.game.title}</h2>
			<p>{data.game.description}</p>
		</div>

		<div class="catalogGameGroup">
			<h2>Platform(en)</h2>
			{#if data.game.platforms.length > 0}
				<ul>
					{#each data.game.platforms as platform}
						<li>{platform.platformName}</li>
					{/each}
				</ul>
			{:else}
				<p>Geen platformen toegevoegd</p>
			{/if}
		</div>

		<div class="catalogGameGroup">
			<h2>Genre(s)</h2>
			{#if data.game.genres.length > 0}
				<ul>
					{#each data.game.genres as genre}
						<li>{genre.genreName}</li>
					{/each}
				</ul>
			{:else}
				<p>Geen genres toegevoegd</p>
			{/if}
		</div>


	</div>
</div>