<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Genre toevoegen</h1>

{#if form?.message}
	<p class="formError">{form.message}</p>
{/if}

<form method="POST">
	<div class="formGroup">
		<label for="genreName">Naam *</label>
		<input
			id="genreName"
			name="genreName"
			type="text"
			value={form?.values?.genreName ?? ''}
			required
		/>
	</div>

	<div class="formActions">
		<button class="customButton" type="submit">Genre toevoegen</button>
	</div>
</form>