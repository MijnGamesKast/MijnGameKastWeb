<script lang="ts">

	let { data, children } = $props();
</script>

<div id="CollectionWrapper">
	<div class="collections card">
		<h2>Collecties</h2>
		{#if data.collecties.length === 0}
			<p>Er zijn geen openbare collectie beschikbaar</p>
		{:else}
			{#each data.collecties as collectie}
				<a href="/collecties/{collectie.id}" class="collection">
					<span class="collectieNaam">{collectie.name}</span> <span class="collectieEigenaar">{collectie.username}</span>
				</a>
			{/each}
		{/if}
	</div>


	<div class="collectionGames card">
		{@render children()}
	</div>
</div>