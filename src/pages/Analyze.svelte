<script>
import { onMount } from "svelte";
import { storedText } from './../stores.js';
import { storedSummary } from './../stores.js';
import { storedAnalysis } from './../stores.js';
import ColorBars from './../components/ColorBars.svelte';
import OriginalText from './../components/OriginalText.svelte';

let sampleText;
let summary;
let analyzedText = {};

$: loaded = analyzedText.hasOwnProperty('words');

const unsubscribeStoredText = storedText.subscribe(value => {
	sampleText = value;
});

const unsubscribeStoredSummary = storedSummary.subscribe(value => {
	summary = value;
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
	<ColorBars />
</header>
<main>
	{#if loaded}
		<section id="result">
			{#if analyzedText.score < 60}
				<div class="score-area">
					<h3>
						Your score is 
							<span 
								class:red={analyzedText.score == 12.5}
								class:orange={analyzedText.score == 37.5}
								class:yellow={analyzedText.score == 62.5}
								class:white={analyzedText.score == 87.5}
							>
								{analyzedText.score}
							</span>%.
					</h3>
					<a href="#/" class="action-button">TRY AGAIN</a>
				</div>
			{:else}
				<div class="score-area">
					<h2>Your score is 
						<span
							class:red={analyzedText.score == 12.5}
							class:orange={analyzedText.score == 37.5}
							class:yellow={analyzedText.score == 62.5}
							class:white={analyzedText.score == 87.5}
						>
							{analyzedText.score}
						</span>%.
					</h2>
				</div>
			{/if}
		</section>
		<p>
			{#each analyzedText.words as obj}
				<span class:red={obj.plagiarized} class:orange={obj.substitute}>{obj.text}</span>
			{/each}
		</p>
	{/if}
</main>
<footer>
	<OriginalText textSample={sampleText} loaded={true} />
</footer>
