<script lang="ts">
	let { data, children } = $props();
</script>

<div id="GenrePlatformWrapper">
	<aside class="genrePlatforms card">
		<div class="genrePlatformHeader">
			<h2>Platformen</h2>
			<a class="customButton" href="/moderatie/platform">Nieuw platform</a>
		</div>

		{#if data.message}
			<p class="formError">{data.message}</p>
		{/if}

		{#if data.platforms.length === 0}
			<p>Er zijn nog geen genres beschikbaar.</p>
		{:else}
			<div class="genrePlatformList">
				{#each data.platforms as platform}
					<div class="genrePlatform">
						<p>{platform.platformName}</p>
						<a class="customButton customButtonSmall" href={`/moderatie/platform/${platform.id}`}>
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