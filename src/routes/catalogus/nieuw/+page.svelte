<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let showPlaystationOptions = $state(false);
	let showXboxOptions = $state(false);
	let showNintendoOptions = $state(false);
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

	<div class="formGroup formGroupPlatforms">
		<div class="platformGroup">
			<div class="platformGroupHeader">
				<input type="checkbox" id="Playstation" bind:checked={showPlaystationOptions}/>
				<label for="Playstation">Playstation</label>
			</div>

			{#if showPlaystationOptions}
				<div class="platformGroupOptions" id="platformGroupOptionsPlaystation">
					<div class="platformOption">
						<input type="checkbox" id="playstation-1" name="platforms[]" value="Playstation1">
						<label for="playstation-1">Playstation 1</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="playstation-2" name="platforms[]" value="Playstation2">
						<label for="playstation-2">Playstation 2</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="playstation-3" name="platforms[]" value="Playstation3">
						<label for="playstation-3">Playstation 3</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="playstation-4" name="platforms[]" value="Playstation4">
						<label for="playstation-4">Playstation 4</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="playstation-5" name="platforms[]" value="Playstation5">
						<label for="playstation-5">Playstation 5</label>
					</div>
				</div>
			{/if}
		</div>

		<div class="platformGroup">
			<div class="platformGroupHeader">
				<input type="checkbox" id="Xbox" bind:checked={showXboxOptions}>
				<label for="Xbox">Xbox</label>
			</div>

			{#if showXboxOptions}
				<div class="platformGroupOptions" id="platformGroupOptionsXbox">
					<div class="platformOption">
						<input type="checkbox" id="Xbox1" name="platforms[]" value="Xbox">
						<label for="Xbox1">Xbox</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="xbox-360" name="platforms[]" value="Xbox360">
						<label for="xbox-360">Xbox 360</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="xbox-one" name="platforms[]" value="XboxOne">
						<label for="xbox-one">Xbox One</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="xbox-series-xs" name="platforms[]" value="XboxSeriesS">
						<label for="xbox-series-xs">Xbox Series X / Series S</label>
					</div>
				</div>
			{/if}
		</div>

		<div class="platformGroup">
			<div class="platformGroupHeader">
				<input type="checkbox" id="nintendo" bind:checked={showNintendoOptions}>
				<label for="nintendo">Nintendo</label>
			</div>

			{#if showNintendoOptions}
				<div class="platformGroupOptions" id="platformGroupOptionsNintendo">
					<div class="platformOption">
						<input type="checkbox" id="nintendo-gamecube" name="platforms[]" value="NintendoGameCube">
						<label for="nintendo-gamecube">Nintendo GameCube</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="nintendo-wii" name="platforms[]" value="NintendoWii">
						<label for="nintendo-wii">Nintendo Wii</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="nintendo-wiiu" name="platforms[]" value="NintendoWiiU">
						<label for="nintendo-wiiu">Nintendo Wii U</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="nintendo-switch" name="platforms[]" value="NintendoSwitch">
						<label for="nintendo-switch">Nintendo Switch</label>
					</div>
					<div class="platformOption">
						<input type="checkbox" id="nintendo-switch-2" name="platforms[]" value="NintendoSwitch2">
						<label for="nintendo-switch-2">Nintendo Switch 2</label>
					</div>
				</div>
			{/if}
		</div>

		<div class="platformGroup">
			<div class="platformGroupHeader">
				<input type="checkbox" id="pc" name="platforms[]" value="PC">
				<label for="pc">PC</label>
			</div>
		</div>
	</div>

	<button type="submit">Opslaan</button>
</form>