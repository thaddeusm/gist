<script>
import ColorBars from './../components/ColorBars.svelte';
</script>

<style>
@media screen and (max-width: 450px) {
	header {
		height: 200px;
	}

	a {
		margin-top: 250px;
		margin-bottom: 100px;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	header {
		height: 250px;
	}

	a {
		margin-top: 300px;
		margin-bottom: 150px;
	}
}

@media screen and (min-width: 801px) {
	header {
		height: 300px;
	}

	a {
		margin-top: 350px;
		margin-bottom: 200px;
	}
}	

header {
	position: fixed;
	display: grid;
	align-items: center;
	width: 100%;
	top: 0;
	text-align: center;
	background: var(--darkest);
}

a {
	display: block;
	width: 100px;
	margin-left: auto;
	margin-right: auto;
	text-decoration: none;
}

main {
	text-align: center;
}
</style>

<header>
	<h1>Gist</h1>
	<h2>
		Summarize better.
	</h2>
</header>
<main>
	<a class="action-button" href="#/read">PLAY</a>
</main>
<footer>
	<ColorBars />
</footer>
