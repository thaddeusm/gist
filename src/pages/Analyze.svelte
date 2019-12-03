<script>
import { onMount } from "svelte";
import { storedMode, storedText, storedSummary, storedAnalysis, gameProgress } from './../stores.js';
import { push, pop, replace } from 'svelte-spa-router';

import ColorBars from './../components/ColorBars.svelte';
import OriginalText from './../components/OriginalText.svelte';
import Loader from './../components/Loader.svelte';

let sampleText;
let summary;
let mode;
let progress;
let analyzedText = {};
let infoPanelToShow = null;

$: loaded = analyzedText.hasOwnProperty('words');

const unsubscribeStoredText = storedText.subscribe(value => {
	sampleText = value;
});

const unsubscribeStoredSummary = storedSummary.subscribe(value => {
	summary = value;
});

const unsubscribeStoredMode = storedMode.subscribe(value => {
	mode = value;
});

const unsubscribeGameProgress = gameProgress.subscribe(value => {
	progress = value;
});

onMount(async () => {
	let data = {
		originalText: sampleText,
		summary: summary
	};

	let res = await fetch('/api/analyzeText.js', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});

	analyzedText = await res.json();
	storedAnalysis.set(analyzedText);

	setGameProgress(analyzedText);
});

function openInfoPanel(color) {
	infoPanelToShow = color;
}

function setGameProgress(analyzedText) {
	if (analyzedText.score > 80) {
		gameProgress.update((n) => n + 1);
		localStorage.setItem('level', progress);
	}
}

function startNextLevel() {
	storedText.set('');
	push('/read');
}

function endGame() {
	storedText.set('');
	storedAnalysis.set('');
	localStorage.setItem('level', 1);
	push('/');
}
</script>

<style>
@media screen and (max-width: 450px) {
	header {
		height: 250px;
	}

	p {
		padding: 0 3%;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	header {
		height: 265px;
	}

	p {
		padding: 0 3%;
	}
}

@media screen and (min-width: 801px) {
	header {
		height: 275px;
	}
}

p {
	color: var(--lightest);
	max-width: 650px;
	margin: 50px auto;
}

.red {
	color: var(--plagiarism);
}

.orange {
	color: var(--substitute);
}

.yellow {
	color: var(--wordiness);
}

.white {
	color: var(--success);
}

.score-area {
	text-align: center;
}

h2 {
	margin: -20px auto 40px auto;
}

a {
	text-decoration: none;
}

footer {
	margin: 50px auto 50px auto;
}
</style>

<header>
	<ColorBars {infoPanelToShow} />
</header>
<main>
	{#if loaded}
		<section id="result">
			{#if mode == 'game'}
				{#if analyzedText.score < 60}
					<div class="score-area">
						<a href="#/summarize" class="action-button">TRY AGAIN</a>
					</div>
				{:else if analyzedText.score > 60 && progress !== 4}
					<div class="score-area">
						<button on:click={startNextLevel} class="action-button">CONTINUE</button>
					</div>
				{:else}
					<div class="score-area">
						<h2>You have finished the game!</h2>
						<button on:click={endGame} class="action-button">END</button>
					</div>
				{/if}
			{:else}
				{#if analyzedText.score > 80}
					<div class="score-area">
						<h2>Great!</h2>
						<p>No major problems were found.</p>
					</div>
				{:else}
					<div class="score-area">
						<h2>This needs improvement.</h2>
						<p>Hover over the summary text to learn more.</p>
					</div>
				{/if}
			{/if}
		</section>
		<p class:yellow={analyzedText.score == 62.5}>
			{#each analyzedText.words as obj}
				{#if obj.plagiarized}
					<span class="red" on:mouseover={() => {openInfoPanel('red')}}>
						{obj.text}
					</span>
				{:else if obj.substitute}
					<span class="orange" on:mouseover={() => {openInfoPanel('orange')}}>
						{obj.text}
					</span>
				{:else if analyzedText.lengthRatio > .7}
					<span class="yellow" on:mouseover={() => {openInfoPanel('yellow')}}>
						{obj.text}
					</span>
				{:else}
					<span on:mouseover={() => {openInfoPanel('white')}}>
						{obj.text}
					</span>
				{/if}
			{/each}
		</p>
	{:else}
		<Loader />
	{/if}
</main>
<footer>
	<OriginalText textSample={sampleText} loaded={true} />
</footer>
