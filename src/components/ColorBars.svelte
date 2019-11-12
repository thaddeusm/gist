<script>
let content;
let showFullText = false;

function changeContent(section) {
	content = section;
	console.log('content changed: ', section);
}
</script>

<style>
#buttons {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-areas: "red orange yellow white";
}

div {
	height: 50px;
}

#red {
	grid-area: red;
	background: var(--plagiarism);
}

.red {
	border: .5em solid var(--plagiarism);
}

#orange {
	grid-area: orange;
	background: var(--substitute);
}

.orange {
	border: .5em solid var(--substitute);
}

#yellow {
	grid-area: yellow;
	background: var(--wordiness);
}

.yellow {
	border: .5em solid var(--wordiness);
}

#white {
	grid-area: white;
	background: var(--success);
}

.white {
	border: .5em solid var(--success);
}

.color-button {
	border: none;
	height: 100%;
	width: 100%;
	display: block;
}

.color-button:hover {
	background: none;
}

.content-area {

}

p {
	word-wrap: break-word;
	color: var(--darkest);
	background: var(--lightest);
	padding: 3% 6%;
}

.read-more-button {
	
}
</style>

<section id="buttons">
	<div id="red">
		<button class="action-button color-button" on:click={() => changeContent('red')}></button>
	</div>
	<div id="orange">
		<button class="action-button color-button" on:click={() => changeContent('orange')}></button>
	</div>
	<div id="yellow">
		<button class="action-button color-button" on:click={() => changeContent('yellow')}></button>
	</div>
	<div id="white">
		<button class="action-button color-button" on:click={() => changeContent('white')}></button>
	</div>
</section>
<section id="content">
	{#if content == 'red'}
		<div id="plagiarism" class="content-area">
			{#if showFullText == false}
				<p class="short-text red">
					This is a short sentence about plagiarism. <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text red">
					This is a short sentence about plagiarism. This is a short sentence about plagiarism. This is a short sentence about plagiarism. This is a short sentence about plagiarism. This is a short sentence about plagiarism. This is a short sentence about plagiarism. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>
	{:else if content == 'orange'}
		<div id="substitute" class="content-area">
			{#if showFullText == false}
				<p class="short-text orange">
					This is a short sentence about substitutive plagiarism. <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text orange">
					This is a short sentence about substitutive plagiarism. This is a short sentence about substitutive plagiarism. This is a short sentence about substitutive plagiarism. This is a short sentence about substitutive plagiarism. This is a short sentence about substitutive plagiarism. This is a short sentence about substitutive plagiarism. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>
	{:else if content == 'yellow'}
		<div id="substitute" class="content-area">
			{#if showFullText == false}
				<p class="short-text yellow">
					This is a short sentence about wordiness. <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text yellow">
					This is a short sentence about wordiness. This is a short sentence about wordiness. This is a short sentence about wordiness. This is a short sentence about wordiness. This is a short sentence about wordiness. This is a short sentence about wordiness. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>
	{:else if content == 'white'}
		<div id="substitute" class="content-area">
			{#if showFullText == false}
				<p class="short-text white">
					This is a short sentence about plagiarism. <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text white">
					This is a short sentence about success. This is a short sentence about success. This is a short sentence about success. This is a short sentence about success. This is a short sentence about success. This is a short sentence about success. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>	
	{/if}
</section>
