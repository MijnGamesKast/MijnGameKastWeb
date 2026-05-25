<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Platform wijzigen</h1>

{#if !data.platform}
	<p>Platform niet gevonden.</p>
{:else}
	{#if form?.message}
		<p class="formError">{form.message}</p>
	{/if}

	<form method="POST" action="?/update">
		<div class="formGroup">
			<label for="platformName">Naam *</label>
			<input
				id="platformName"
				name="platformName"
				type="text"
				value={form?.values?.platformName ?? data.platform.platformName}
				required
			/>
		</div>

		<div class="formActions">
			<a class="customButton customButtonSecondary" href="/moderatie/platform">
				Annuleren
			</a>
			<button class="customButton" type="submit">Platform opslaan</button>
		</div>
	</form>

	<form method="POST" action="?/delete" class="deleteForm">
		<button class="customButtonDanger" type="submit">
			Platform verwijderen
		</button>
	</form>
{/if}