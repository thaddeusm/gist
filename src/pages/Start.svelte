<script>
import { onMount } from "svelte";
import { gameProgress, storedScore } from './../stores.js';

import TitleHeader from './../components/TitleHeader.svelte';
import ColorBars from './../components/ColorBars.svelte';

let progress;
let score;

const unsubscribeGameProgress = gameProgress.subscribe(value => {
	progress = value;
});

const unsubscribeStoredScore = storedScore.subscribe(value => {
	score = value;
});

function checkProgress() {
	let storedLevel = localStorage.getItem('level');

	let levelInt = parseInt(storedLevel);

	let localScore = localStorage.getItem('score');

	let scoreInt = parseInt(storedScore);

	console.log('Level retrieved from storage: ', levelInt);
	console.log('Score retrieved from storage: ', scoreInt);

	if (levelInt && scoreInt) {
		gameProgress.set(levelInt);
		storedScore.set(scoreInt);
	} else {
		gameProgress.set(1);
	}
}

onMount(async () => {
	checkProgress();

	let res = await fetch(`/api/getScoreboard.js`);
	let scores = await res.json();
	
	console.log(scores)
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
