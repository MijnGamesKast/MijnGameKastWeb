<script lang="ts">
	let { children } = $props();
</script>

<div id="CollectionWrapper">
	<div class="collections card">
		<h2>Collecties</h2>
		<a href="/collecties/5" class="collection">
			<span class="collectieNaam">Alle games</span> <span class="collectieEigenaar">Openbaar</span>
		</a>
		<a href="/collecties/6" class="collection">
			<span class="collectieNaam">Backlog</span> <span class="collectieEigenaar">Privé</span>
		</a>
		<a href="/collecties/7" class="collection">
			<span class="collectieNaam">Favorieten</span> <span class="collectieEigenaar">Privé</span>
		</a>
	</div>


	<div class="collectionGames card">
		{@render children()}
	</div>
</div>

<!--<div class="collections-public-wrapper">-->
<!--	<div class="page-header">-->
<!--		<h1>Openbare collecties</h1>-->
<!--		<p>Ontdek collecties van andere gamers.</p>-->
<!--	</div>-->
<!--	-->
<!--</div>-->