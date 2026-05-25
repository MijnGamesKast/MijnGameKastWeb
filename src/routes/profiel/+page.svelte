<script lang="ts">
	let { data } = $props();

	const gebruiker = data.gebruiker;
</script>

<section id="ProfileWrapper">
	<div class="profileHero card">
		<div class="profileAvatar">
			{gebruiker?.username?.charAt(0).toUpperCase() ?? '?'}
		</div>

		<div class="profileInfo">
			<p class="profileLabel">MijnGameKast profiel</p>
			<h1>{gebruiker?.username ?? 'Gebruiker'}</h1>
			<p>{gebruiker?.email ?? 'Geen e-mailadres bekend'}</p>

			{#if gebruiker?.role === 1}
				<span class="profileRole">Moderator</span>
			{:else}
				<span class="profileRole">Gamer</span>
			{/if}
		</div>
	</div>

	<div class="profileGrid">
		<a class="profileAction card" href="/profiel/collecties">
			<h2>Mijn privécollecties</h2>
			<p>Bekijk en beheer je eigen gamecollecties.</p>
			<span>Bekijk collecties →</span>
		</a>

		<a class="profileAction card" href="/catalogus/nieuw">
			<h2>Game toevoegen</h2>
			<p>Voeg een nieuwe game toe aan de centrale catalogus.</p>
			<span>Game toevoegen →</span>
		</a>

		<a class="profileAction card" href="/collecties">
			<h2>Openbare collecties</h2>
			<p>Bekijk collecties die door andere gamers gedeeld zijn.</p>
			<span>Bekijk openbaar →</span>
		</a>

		{#if gebruiker?.role === 1}
			<a class="profileAction card" href="/moderatie/genre">
				<h2>Genre Beheer</h2>
				<p>Beheer de genres voor de catalogus</p>
				<span>Ga naar genre beheerpagina →</span>
			</a>

			<a class="profileAction card" href="/moderatie/platform">
				<h2>Platform Beheer</h2>
				<p>Beheer de platformen voor de catalogus</p>
				<span>Ga naar platform beheerpagina →</span>
			</a>

		{/if}
	</div>
</section>