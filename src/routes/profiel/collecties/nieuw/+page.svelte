<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Nieuwe collectie maken</h1>

{#if form?.message}
	<p class="formError">{form.message}</p>
{/if}

<form method="POST">
	<div class="formGroup">
		<label for="name">Naam *</label>
		<input id="name" name="name" type="text" value={form?.values?.name ?? ''} required />
	</div>

	<div class="formGroup">
		<label for="description">Beschrijving *</label>
		<textarea id="description" name="description" required>{form?.values?.description ?? ''}</textarea>
	</div>

	<div class="visibilityGroup">
		<p>Zichtbaarheid *</p>

		<label class="choiceCard">
			<input type="radio" name="isPublic" value="false" checked />
			<span>
			<strong>Privé</strong>
			<span style="font-weight: normal">Alleen jij kunt deze collectie bekijken.</span>
		</span>
		</label>

		<label class="choiceCard">
			<input type="radio" name="isPublic" value="true" />
			<span>
			<strong>Openbaar</strong>
			<span style="font-weight: normal">Andere gebruikers kunnen deze collectie bekijken.</span>
		</span>
		</label>
	</div>

	<button class="customButton" type="submit">Collectie opslaan</button>
</form>