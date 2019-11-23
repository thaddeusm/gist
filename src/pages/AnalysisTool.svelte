<script>
import { push, pop, replace } from 'svelte-spa-router';
import { storedMode, storedText, storedSummary } from './../stores.js';

storedMode.set('tool');

let originalText,
	summary

const unsubscribeStoredText = storedText.subscribe(value => {
	originalText = value.text;
});

$: complete = summary !== '' && originalText !== ''

function startAnalysis() {
	if (complete) {
		storedText.set({text: originalText});
		storedSummary.set({text: summary});
		push('/analyze')
	}
}
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
</style>

<header>
	<textarea bind:value={originalText} placeholder="Paste the original text here."></textarea>
	<textarea bind:value={summary} placeholder="Write your summary here."></textarea>
</header>
<main>
	<div class="right-button-area">
		<button class="action-button" on:click={startAnalysis} disabled={!complete}>CHECK</button>
	</div>
</main>