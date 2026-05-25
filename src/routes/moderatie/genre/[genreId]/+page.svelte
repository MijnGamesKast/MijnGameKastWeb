<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Genre wijzigen</h1>

{#if !data.genre}
	<p>Genre niet gevonden.</p>
{:else}
	{#if form?.message}
		<p class="formError">{form.message}</p>
	{/if}

	<form method="POST" action="?/update">
		<div class="formGroup">
			<label for="genreName">Naam *</label>
			<input
				id="genreName"
				name="genreName"
				type="text"
				value={form?.values?.genreName ?? data.genre.genreName}
				required
			/>
		</div>

		<div class="formActions">
			<a class="customButton customButtonSecondary" href="/moderatie/genre">
				Annuleren
			</a>
			<button class="customButton" type="submit">Genre opslaan</button>
		</div>
	</form>

	<form method="POST" action="?/delete" class="deleteForm">
		<button class="customButtonDanger" type="submit">
			Genre verwijderen
		</button>
	</form>
{/if}