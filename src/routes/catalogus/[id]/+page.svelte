<!--<script lang="ts">-->
<!--	let { data } = $props();-->
<!--</script>-->

<script lang="ts">
	type Game = {
		id: number;
		title: string;
		description: string;
	};

	let { data }: { data: { game: Game } } = $props();
</script>

<a href="/catalogus">← Terug</a>

<h2>{data.game.title}</h2>
<p>{data.game.description}</p>

<!--<h2>Game detail</h2>-->
<!--<p>ID: {data.gameId}</p>-->

<!--<a href="/catalogus/{data.gameId}/toevoegen-aan-collectie">Toevoegen aan collectie</a>-->