<script>
import ColorBars from './../components/ColorBars.svelte';
</script>

<style>
@media screen and (max-width: 450px) {
	header {
		height: 200px;
	}

	h2 {
		margin-top: 250px;
		margin-bottom: 100px;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	header {
		height: 250px;
	}

	h2 {
		margin-top: 300px;
		margin-bottom: 150px;
	}
}

@media screen and (min-width: 801px) {
	header {
		height: 300px;
	}

	h2 {
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

header > a {
	display: block;
	margin: 0 auto;
	text-decoration: none;
}

main {
	text-align: center;
}
</style>

<header>
	<h1>Gist</h1>
	<a class="action-button" href="#/read">PLAY</a>
</header>
<main>
	<h2>
		Summarize better.
	</h2>
</main>
<footer>
	<ColorBars />
</footer>
