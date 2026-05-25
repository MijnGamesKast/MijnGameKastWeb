<script lang="ts">
	let { data, children } = $props();
</script>

<div id="GenrePlatformWrapper">
	<aside class="genrePlatforms card">
		<div class="genrePlatformHeader">
			<h2>Genres</h2>
			<a class="customButton" href="/moderatie/genre">Nieuw genre</a>
		</div>

		{#if data.message}
			<p class="formError">{data.message}</p>
		{/if}

		{#if data.genres.length === 0}
			<p>Er zijn nog geen genres beschikbaar.</p>
		{:else}
			<div class="genrePlatformList">
				{#each data.genres as genre}
					<div class="genrePlatform">
						<p>{genre.genreName}</p>
						<a class="customButton customButtonSmall" href={`/moderatie/genre/${genre.id}`}>
							Wijzigen
						</a>
					</div>
				{/each}
			</div>
		{/if}
	</aside>

	<section class="genrePlatformContent card">
		{@render children()}
	</section>
</div>