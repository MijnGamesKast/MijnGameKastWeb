<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Registreren</h1>

<div id="loginRegisterWrapper">
	{#if form?.message}
		<p class="formError">{form.message}</p>
	{/if}

	<form method="POST">
		<div class="formGroup">
			<label for="username">Gebruikersnaam *</label>
			<input
				id="username"
				name="username"
				type="text"
				value={form?.values?.username ?? ''}
				required
			/>
		</div>

		{#if form?.fieldErrors?.username?.length}
			<ul class="fieldErrors">
				{#each form.fieldErrors.username as error}
					<li>{error}</li>
				{/each}
			</ul>
		{/if}

		<div class="formGroup">
			<label for="email">E-mailadres *</label>
			<input
				id="email"
				name="email"
				type="email"
				value={form?.values?.email ?? ''}
				required
			/>
		</div>

		{#if form?.fieldErrors?.email?.length}
			<ul class="fieldErrors">
				{#each form.fieldErrors.email as error}
					<li>{error}</li>
				{/each}
			</ul>
		{/if}

		<div class="formGroup">
			<label for="password">Wachtwoord *</label>
			<input id="password" name="password" type="password" required />

			<p class="formHelp">
				Minimaal één kleine letter, één hoofdletter, één cijfer en één speciaal teken.
			</p>
		</div>

		{#if form?.fieldErrors?.password?.length}
			<ul class="fieldErrors">
				{#each form.fieldErrors.password as error}
					<li>{error}</li>
				{/each}
			</ul>
		{/if}

		<div class="formGroup">
			<label for="passwordRepeat">Wachtwoord herhalen *</label>
			<input id="passwordRepeat" name="passwordRepeat" type="password" required />
		</div>

		{#if form?.fieldErrors?.passwordRepeat?.length}
			<ul class="fieldErrors">
				{#each form.fieldErrors.passwordRepeat as error}
					<li>{error}</li>
				{/each}
			</ul>
		{/if}

		<p>Al een account? Login via <a href="/login">hier</a>.</p>

		<button class="customButton" type="submit">Registreren</button>
	</form>
</div>