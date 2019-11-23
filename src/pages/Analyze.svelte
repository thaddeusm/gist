<script>
import { onMount } from "svelte";
import { storedMode, storedText, storedSummary, storedAnalysis } from './../stores.js';
import ColorBars from './../components/ColorBars.svelte';
import OriginalText from './../components/OriginalText.svelte';
import Loader from './../components/Loader.svelte';

let sampleText;
let summary;
let mode;
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
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});

	analyzedText = await res.json();
	storedAnalysis.set(analyzedText);

	console.log(analyzedText);
});

function openInfoPanel(color) {
	infoPanelToShow = color;
}
</script>

<style>
@media screen and (max-width: 450px) {
	header {
		height: 325px;
	}

	p {
		padding: 0 3%;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	header {
		height: 275px;
	}

	p {
		padding: 0 3%;
	}
}

@media screen and (min-width: 801px) {
	header {
		height: 250px;
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

h3 {
	margin: 30px auto;
}

a {
	text-decoration: none;
}
</style>

<header>
	<ColorBars {infoPanelToShow} />
</header>
<main>
	{#if loaded}
		<section id="result">
			{#if analyzedText.score < 60}
				<div class="score-area">
					{#if mode == 'game'}
						<a href="#/" class="action-button">TRY AGAIN</a>
					{:else}
						<a href="#/tool" class="action-button">TRY AGAIN</a>
					{/if}
				</div>
			{:else}
				<div class="score-area">
					{#if mode == 'game'}
						<h2>Great!</h2>
					{:else}
						<h2>No instances of plagiarism found.</h2>
					{/if}
				</div>
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
					<span>
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
