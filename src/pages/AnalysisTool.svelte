<script>
import { push, pop, replace } from 'svelte-spa-router';
import { storedMode, storedText, storedSummary } from './../stores.js';
import Loader from './../components/Loader.svelte';

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
	main {
		margin-top: 50px;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	main {
		margin-top: 100px;
	}
}

@media screen and (min-width: 801px) {
	main {
		margin-top: 150px;
	}
}

main {
	display: grid;
	align-items: center;
	text-align: center;
}
</style>

<main>
	<textarea bind:value={originalText} placeholder="Paste the original text here."></textarea>
	<textarea bind:value={summary} placeholder="Write your summary here."></textarea>
</main>
<footer>
	<div class="right-button-area">
		<button class="action-button" on:click={startAnalysis} disabled={!complete}>CHECK</button>
	</div>
</footer>