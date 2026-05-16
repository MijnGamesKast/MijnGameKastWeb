<script>
</script>

<h1>Registreren</h1>

<div id="loginRegisterWrapper">
	<form method="POST">
		<div class="formGroup">
			<label for="username">Gebruikersnaam *</label><br />
			<input id="username" name="username" type="text" required/>
		</div>

		<div class="formGroup">
			<label for="email">E-mailadres *</label><br />
			<input id="email" name="email" type="email" required/>
		</div>

		<div class="formGroup">
			<label for="password">Wachtwoord *</label><br />
			<input id="password" name="password" type="password" required/>
		</div>

		<div class="formGroup">
			<label for="passwordRepeat">Wachtwoord herhalen *</label><br />
			<input id="passwordRepeat" name="passwordRepeat" type="password" required/>
		</div>
		<p>Al een account? login via <a href="/registreren">hier.</a></p>

		<button type="submit">Registreren</button>
	</form>
</div>