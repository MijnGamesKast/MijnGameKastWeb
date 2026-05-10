<!--<script lang="ts">-->
<!--	let { data } = $props();-->
<!--</script>-->

<script lang="ts">
	import logo from '$lib/images/GameCoverPlaceholder.jpg';

		type Game = {
		id: number;
		title: string;
		description: string;
	};

	let { data }: { data: { game: Game } } = $props();
</script>

<a href="/catalogus">← Terug</a>

<div id="catalogGameWrapper">
	<div class="catalogGameGroup">
		<img src={logo} alt="Een placeholder image voor gamecover">
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


<!--<h2>Game detail</h2>-->
<!--<p>ID: {data.gameId}</p>-->

<!--<a href="/catalogus/{data.gameId}/toevoegen-aan-collectie">Toevoegen aan collectie</a>-->