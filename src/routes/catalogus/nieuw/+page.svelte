<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<section id="AddCatalogGameWrapper">
	<div class="formHeader">
		<h1>Nieuwe game toevoegen</h1>
		<p>Voeg een game toe aan de centrale catalogus. Platformen en genres kun je alvast selecteren.</p>
	</div>

	{#if form?.message}
		<p class="formError">{form.message}</p>
	{/if}

	<form method="POST" class="gameForm">
		<div class="formGroup">
			<label for="titel">Titel *</label>
			<input id="titel" name="title" type="text" value={form?.values?.title ?? ''} />

			{#if form?.fieldErrors?.title?.length}
				<ul class="fieldErrors">
					{#each form.fieldErrors.title as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="formGroup">
			<label for="beschrijving">Beschrijving *</label>
			<textarea id="beschrijving" name="description" rows="5">{form?.values?.description ?? ''}</textarea>

			{#if form?.fieldErrors?.description?.length}
				<ul class="fieldErrors">
					{#each form.fieldErrors.description as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="formSection">
			<h2>Platformen</h2>

			<div class="choiceGrid">
				{#each data.platforms as platform}
					<label class="choiceCard">
						<input type="checkbox" name="platformIds[]" value={platform.id} />
						<span>{platform.platformName}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="formSection">
			<h2>Genres</h2>

			<div class="choiceGrid">
				{#each data.genres as genre}
					<label class="choiceCard">
						<input type="checkbox" name="genreIds[]" value={genre.id} />
						<span>{genre.genreName}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="formActions">
			<a class="customButton customButtonSecondary" href="/catalogus">Annuleren</a>
			<button class="customButton" type="submit">Opslaan</button>
		</div>
	</form>
</section>