<script>
import { push, pop, replace } from 'svelte-spa-router';
import { storedText, storedSummary } from './../stores.js';
import OriginalText from './../components/OriginalText.svelte';

let sampleText;
let summary;

const unsubscribe = storedText.subscribe(value => {
	sampleText = value;
});

let value = '';

$: summarized = value !== '';

function startAnalysis() {
	if (value !== '') {
		storedSummary.set({text: value});
		push('/analyze');
	}
}
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
		height: 350px;
	}
}	

header {
	display: grid;
	align-items: center;
	text-align: center;
}

main {
	margin-bottom: 50px;
}
</style>

<header>
	<textarea bind:value placeholder="Write your summary here."></textarea>
</header>
<main>
	<div class="right-button-area">
		<button class="action-button" on:click={startAnalysis} disabled={!summarized}>CHECK</button>
	</div>
	<OriginalText textSample={sampleText} loaded={true} hideable={true} />
</main>
