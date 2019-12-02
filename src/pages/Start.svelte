<script>
import { onMount } from "svelte";
import { gameProgress } from './../stores.js';

import TitleHeader from './../components/TitleHeader.svelte';
import ColorBars from './../components/ColorBars.svelte';

let progress;

const unsubscribeGameProgress = gameProgress.subscribe(value => {
	progress = value;
});

function checkProgress() {
	let storedLevel = localStorage.getItem('level');

	let levelInt = parseInt(storedLevel);

	console.log('Level retrieved from storage: ', levelInt);

	if (levelInt) {
		gameProgress.set(levelInt);
	} else {
		gameProgress.set(1);
	}
}

onMount(async () => {
	checkProgress();
});
</script>

<style>
@media screen and (max-width: 450px) {
	main {
		margin-top: 250px;
		margin-bottom: 100px;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	main {
		margin-top: 300px;
		margin-bottom: 150px;
	}
}

@media screen and (min-width: 801px) {
	main {
		margin-top: 350px;
		margin-bottom: 200px;
	}
}	

a {
	display: block;
	text-decoration: none;
	margin: 30px auto;
}

.continue {
	width: 140px;
}

.play {
	width: 100px;
}

main {
	text-align: center;
}

footer {
	margin: 50px auto 50px auto;
}
</style>

<TitleHeader />
<main>
	{#if progress == 1}
		<a class="action-button play" href="#/read">PLAY</a>
	{:else}
		<a class="action-button continue" href="#/read">CONTINUE</a>
	{/if}
	<a class="simple-button" href="#/about">about the game</a>
</main>
<footer>
	<ColorBars />
</footer>
