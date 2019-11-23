<script>
import { onDestroy } from 'svelte';

let currentColor = 'red';

function changeColor() {
	switch (currentColor) {
		case 'red':
			currentColor = 'orange';
			break;
		case 'orange':
			currentColor = 'yellow';
			break;
		case 'yellow':
			currentColor = 'white';
			break;
		case 'white':
			currentColor = 'red';
			break;
	}
}

let action = setInterval(changeColor, 1000);

onDestroy(() => {
	clearInterval(action);
});

</script>

<style>
.container {
	height: 150px;
	display: grid;
	grid-template-columns: 1fr auto auto auto auto 1fr;
	grid-template-areas: ". red orange yellow white .";
	align-items: center;
	justify-content: center;
}

section {
	transition: all .5s ease-in-out;
	width: 20px;
}

.selected {
	width: 30px;
	height: 40px!important;
}

.red {
	background: var(--plagiarism);
	grid-area: red;
	height: 30px;
}

.orange {
	background: var(--substitute);
	grid-area: orange;
	height: 30px;
}

.yellow {
	background: var(--wordiness);
	grid-area: yellow;
	height: 30px;
}

.white {
	background: var(--success);
	grid-area: white;
	height: 30px;
}
</style>

<div class="container">
	<section class="red" class:selected={currentColor == 'red'}></section>
	<section class="orange"  class:selected={currentColor == 'orange'}></section>
	<section class="yellow"  class:selected={currentColor == 'yellow'}></section>
	<section class="white"  class:selected={currentColor == 'white'}></section>
</div>
