<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Platform toevoegen</h1>

{#if form?.message}
	<p class="formError">{form.message}</p>
{/if}

<form method="POST">
	<div class="formGroup">
		<label for="platformName">Naam *</label>
		<input
			id="platformName"
			name="platformName"
			type="text"
			value={form?.values?.platformName ?? ''}
			required
		/>
	</div>

	<div class="formActions">
		<button class="customButton" type="submit">Platform toevoegen</button>
	</div>
</form>