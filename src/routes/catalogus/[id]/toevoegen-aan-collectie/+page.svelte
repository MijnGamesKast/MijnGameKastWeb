<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div id="AddGameToCollectionWrapper">
	<div class="gameInformation card">
		<h2>{data.game.title}</h2>
		<p>{data.game.description}</p>

		{#if data.game.platforms?.length}
			<div class="tagList">
				{#each data.game.platforms as platform}
					<span>{platform.platformName}</span>
				{/each}
			</div>
		{/if}

		{#if data.game.genres?.length}
			<div class="tagList">
				{#each data.game.genres as genre}
					<span>{genre.genreName}</span>
				{/each}
			</div>
		{/if}

		<a href={`/catalogus/${data.game.id}`} class="customButton">Bekijk details</a>
	</div>

	<div class="chooseCollections card">
		<h2>Kies collectie</h2>

		{#if data.collections.length > 0}
			<p>Kies een of meerdere collecties waarin je het spel wilt toevoegen.</p>

			{#if form?.message}
				<p class="formError">{form.message}</p>
			{/if}

			<form method="POST" class="collections">
				{#each data.collections as collection}
					<div class="collection">
						<input
							type="checkbox"
							id={`collection-${collection.id}`}
							name="collectionId[]"
							value={collection.id}
						/>
						<label for={`collection-${collection.id}`}>{collection.name}</label>
					</div>
				{/each}

				<div class="collectionButtons">
					<a class="customButton" href={`/catalogus/${data.game.id}`}>Annuleren</a>
					<button class="customButton" type="submit">Toevoegen</button>
				</div>
			</form>
		{:else}
			<p>Er zijn geen collecties gevonden.</p>
			<a class="customButton" href="/profiel/collecties/nieuw">Collectie aanmaken</a>
		{/if}
	</div>
</div>