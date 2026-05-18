<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Collectie wijzigen</h1>

{#if !data.collection}
	<p>Er is geen collectie gevonden.</p>
{:else}
	{#if form?.message}
		<p class="formError">{form.message}</p>
	{/if}

	<form method="POST" action="?/update">
		<div class="formGroup">
			<label for="name">Naam *</label>
			<input
				id="name"
				name="name"
				type="text"
				value={form?.values?.name ?? data.collection.name}
				required
			/>
		</div>

		<div class="formGroup">
			<label for="description">Beschrijving *</label>
			<textarea id="description" name="description" required>{form?.values?.description ?? data.collection.description}</textarea>
		</div>

		<div class="visibilityGroup">
			<p>Zichtbaarheid *</p>

			<label class="choiceCard">
				<input
					type="radio"
					name="isPublic"
					value="false"
					checked={form?.values?.isPublic !== undefined ? !form.values.isPublic : !data.collection.isPublic}
				/>
				<span>
					<strong>Privé</strong>
					<span style="font-weight: normal">Alleen jij kunt deze collectie bekijken.</span>
				</span>
			</label>

			<label class="choiceCard">
				<input
					type="radio"
					name="isPublic"
					value="true"
					checked={form?.values?.isPublic !== undefined ? form.values.isPublic : data.collection.isPublic}
				/>
				<span>
					<strong>Openbaar</strong>
					<span style="font-weight: normal">Andere gebruikers kunnen deze collectie bekijken.</span>
				</span>
			</label>
		</div>

		<div class="formActions">
			<a class="customButton customButtonSecondary" href="/profiel/collecties">Annuleren</a>
			<button class="customButton" type="submit">Collectie opslaan</button>
		</div>
	</form>

	<form method="POST" action="?/delete" class="deleteForm">
		<button class="customButtonDanger" type="submit">
			Collectie verwijderen
		</button>
	</form>
{/if}