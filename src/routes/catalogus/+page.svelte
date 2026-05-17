<script lang="ts">
	import logo from '$lib/images/GameCoverPlaceholder.jpg';

	type Game = {
		id: number;
		title: string;
		description: string;
		platforms?: { id: number; platformName: string }[];
		genres?: { id: number; genreName: string }[];
	};

	let { data }: { data: { games: Game[] } } = $props();

	function truncateText(text: string, maxLength: number) {
		if (text.length <= maxLength) return text;
		return `${text.slice(0, maxLength)}...`;
	}
</script>

<section id="catalogWrapper">
	<div class="catalogHero">
		<div>
			<h1>Gamecatalogus</h1>
			<p>Ontdek games en voeg ze toe aan jouw collecties.</p>
		</div>

		<a class="primaryButton" href="/catalogus/nieuw">+ Game toevoegen</a>
	</div>

	<div class="catalogToolbar">
		<label class="searchBox">
			<span>Zoeken</span>
			<input type="text" placeholder="Zoek game..." />
		</label>

		<button class="filterButton" type="button">Filters</button>
	</div>

	<p class="catalogCount">{data.games.length} games gevonden</p>

	{#if data.games?.length}
		<div class="game-list">
			{#each data.games as game}
				<article class="game-card">
					<img src={logo} alt="Placeholder voor {game.title}" />

					<div class="game-card-content">
						<h2>{game.title}</h2>
						<p>{truncateText(game.description, 120)}</p>

						{#if game.platforms?.length}
							<div class="tagList">
								{#each game.platforms.slice(0, 3) as platform}
									<span>{platform.platformName}</span>
								{/each}
							</div>
						{/if}

						<div class="game-card-actions">
							<a class="secondaryButton" href={`/catalogus/${game.id}`}>Bekijk details</a>
							<a class="textButton" href={`/catalogus/${game.id}/toevoegen-aan-collectie`}>
								Toevoegen aan collectie +
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="emptyState">
			<h2>Geen games gevonden</h2>
			<p>Er staan nog geen games in de catalogus.</p>
		</div>
	{/if}
</section>