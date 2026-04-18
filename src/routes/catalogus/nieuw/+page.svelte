<script lang="ts">
	let title = '';
	let description = '';
	let message = '';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		try {
			const response = await fetch('https://localhost:7199/api/catalog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, description })
			});

			console.log('Status:', response.status);
			console.log('Status text:', response.statusText);

			const responseText = await response.text();
			console.log('Response body:', responseText);

			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status} - ${responseText}`);
			}

			message = `Game succesvol toegevoegd: ${responseText}`;
			title = '';
			description = '';
		} catch (err) {
			console.error(err);
			message = 'Er ging iets mis bij het opslaan';
		}
	}
</script>

<a href="/catalogus">Terug naar catalogus</a>
<h1>New</h1>

<form on:submit={handleSubmit}>
	<div class="formGroup">
		<label for="title">Game title</label>
		<input id="title" type="text" bind:value={title} placeholder="Enter the game title" />
	</div>

	<div class="formGroup">
		<label for="description">Description</label>
		<input id="description" type="text" bind:value={description} placeholder="Enter the description" />
	</div>

	<button type="submit">Submit</button>
</form>

{#if message}
	<p>{message}</p>
{/if}