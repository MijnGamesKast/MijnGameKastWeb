<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Nieuwe game toevoegen</h1>

{#if form?.message}
	<p style="color: red; font-weight: bold;">{form.message}</p>
{/if}

<form method="POST">
	<div class="formGroup">
		<label for="titel">Titel *</label><br />
		<input
			id="titel"
			name="title"
			type="text"
			value={form?.values?.title ?? ''}
		/>

		{#if form?.fieldErrors?.title?.length}
			<ul style="color: red; margin-top: 0.5rem;">
				{#each form.fieldErrors.title as error}
					<li>{error}</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="formGroup" style="margin-bottom: 1rem;">
		<label for="beschrijving">Beschrijving *</label><br />
		<textarea
			id="beschrijving"
			name="description"
			rows="5"
		>{form?.values?.description ?? ''}</textarea>

		{#if form?.fieldErrors?.description?.length}
			<ul style="color: red; margin-top: 0.5rem;">
				{#each form.fieldErrors.description as error}
					<li>{error}</li>
				{/each}
			</ul>
		{/if}
	</div>

	<button type="submit">Opslaan</button>
</form>