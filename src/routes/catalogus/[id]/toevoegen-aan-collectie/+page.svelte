<script lang="ts">
	let { data } = $props();
</script>

<div id="AddGameToCollectionWrapper">
	<div class="gameInformation card">
		<h2>Game</h2>
		<p>Beschrijvijng van de game</p>
		<div class="platforms">
			<p class="platform box">Platform 1</p>
			<p class="platform box">Platform 2</p>
			<p class="platform box">Platform 3</p>
			<p class="platform box">Platform 4</p>
		</div>

		<div class="genres">
			<p class="genre box">Genre 1</p>
			<p class="genre box">Genre 2</p>
			<p class="genre box">Genre 3</p>
			<p class="genre box">Genre 4</p>
		</div>
		<a href="/catalogus/{data.gameId}" class="box">Bekijk details</a>
	</div>

	<div class="chooseCollections card">
		<h2>Kies collectie</h2>
		<form action="#" method="get" class="collections">
			<div class="collection">
				<input type="checkbox" id="collection1" name="collectionId[]" value="1">
				<label for="collection1">Collectienaam</label>
			</div>
			<div class="collection">
				<input type="checkbox" id="collection2" name="collectionId[]" value="2">
				<label for="collection2">Collectienaam</label>
			</div>
			<div class="collection">
				<input type="checkbox" id="collection3" name="collectionId[]" value="3">
				<label for="collection3">Collectienaam</label>
			</div>
			<div class="collectionButtons">
				<a href="/catalogus/{data.gameId}">Annuleren</a>
				<button type="submit">Toevoegen</button>
			</div>
		</form>
	</div>
</div>