<script>
import { onMount } from "svelte";
import { storedText } from './../stores.js';
import OriginalText from './../components/OriginalText.svelte';
import Loader from './../components/Loader.svelte';

let textSample = '';
$: loaded = textSample !== '';

onMount(async () => {
	const res = await fetch("/api/getTextSample.js?level=1");
	textSample = await res.json();
	storedText.set(textSample);
});

</script>

<style>
@media screen and (max-width: 450px) {
	header {
		height: 150px;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	header {
		height: 200px;
	}
}

@media screen and (min-width: 801px) {
	header {
		height: 250px;
	}
}	

header {
	display: grid;
	align-items: center;
	text-align: center;
}

footer {
	height: 150px;
}

footer > a {
	text-decoration: none;
	text-align: center;
}
</style>

<header>
	{#if loaded}
		<h2>
			Find the Main Idea
		</h2>
	{:else}
		<Loader />
	{/if}
</header>
<main>
	<OriginalText {textSample} {loaded} />
</main>
<footer class="right-button-area">
	<a class="action-button" href="#/summarize">SUMMARIZE</a>
</footer>
