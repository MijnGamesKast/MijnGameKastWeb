<script lang="ts">
	import logo from '$lib/images/GameCoverPlaceholder.jpg';

	type Game = {
		id: number;
		title: string;
		description: string;
	};

	type Gebruiker = {
		userId: number | null;
		username: string | null;
		email: string | null;
		role: number | null;
		expiresAt: string | null;
	} | null;

	let { data }: { data: { game: Game; gebruiker: Gebruiker } } = $props();

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
			<h2>Platform</h2>
			<p>-</p>
		</div>

		<div class="catalogGameGroup">
			<h2>Genre</h2>
			<p>-</p>
		</div>


	</div>
</div>