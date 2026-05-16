<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Inloggen</h1>

<div id="loginRegisterWrapper">
	{#if form?.message}
		<p style="color: red; font-weight: bold;">{form.message}</p>
	{/if}

	<form method="POST">
		<div class="formGroup" style="margin-bottom: 1rem;">
			<label for="identifier">Gebruikersnaam of e-mailadres</label><br />
			<input
				id="identifier"
				name="identifier"
				type="text"
				value={form?.values?.identifier ?? ''}
			/>

			{#if form?.fieldErrors?.identifier?.length}
				<ul style="color: red; margin-top: 0.5rem;">
					{#each form.fieldErrors.identifier as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="formGroup" style="margin-bottom: 1rem;">
			<label for="password">Wachtwoord</label><br />
			<input
				id="password"
				name="password"
				type="password"
			/>

			{#if form?.fieldErrors?.password?.length}
				<ul style="color: red; margin-top: 0.5rem;">
					{#each form.fieldErrors.password as error}
						<li>{error}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<p>Nog geen account? Registreer je <a href="/registreren">hier.</a></p>

		<button type="submit">Inloggen</button>
	</form>
</div>