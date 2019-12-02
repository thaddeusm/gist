<script>
export let subtitle = 'Summarize better.';
</script>

<style>
@media screen and (max-width: 450px) {
	header {
		height: 200px;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	header {
		height: 250px;
	}
}

@media screen and (min-width: 801px) {
	header {
		height: 300px;
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
</style>

<header>
	<h1>Gist</h1>
	<h2>
		{subtitle}
	</h2>
</header>