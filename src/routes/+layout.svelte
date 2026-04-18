<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<h1>Portfolio Jeroen</h1>

	<input type="checkbox" class="menu-toggle" id="menu-toggle">

	<label for="menu-toggle" class="hamburger">
		<span class="line1"></span>
		<span class="line2"></span>
		<span class="line3"></span>
	</label>

	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/catalogus">Catalogus</a></li>
			<li><a href="/login">Login</a></li>
			<li><a href="/registreren">registreren</a></li>
			<li><a href="/profiel">Profiel</a></li>
		</ul>
	</nav>
</header>
<main>
{@render children()}
</main>
<footer>
	&copy; MijnGameKast 2026
</footer>