<script>
import { navigateTo } from 'svero';

import { storedText } from './../stores.js';
import { storedSummary } from './../stores.js';
import OriginalText from './../components/OriginalText.svelte';

let sampleText;
let summary;

const unsubscribe = storedText.subscribe(value => {
	sampleText = value;
});

let value;

function startAnalysis() {
	console.log(value);
	storedSummary.set({text: value});
	navigateTo('/game/analyze');
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
	<textarea bind:value placeholder="Write your summary here."></textarea>
</header>
<main>
	<div class="right-button-area">
		<button class="action-button" on:click={startAnalysis}>CHECK</button>
	</div>
	<OriginalText textSample={sampleText} loaded={true} hideable={true} />
</main>
