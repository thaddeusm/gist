<script>
export let infoPanelToShow = null;

$: if (infoPanelToShow !== null) {
	changeContent(infoPanelToShow);
}

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
	display: grid;
	align-items: center;
	height: 175px;
	overflow: auto;
	background: var(--lightest);
}

p {
	word-wrap: break-word;
	color: var(--darkest);
	background: var(--lightest);
	padding: 1% 4%;
	max-width: 950px;
	margin: 0 auto;
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
		<div id="plagiarism" class="content-area red">
			{#if showFullText == false}
				<p class="short-text">
					Plagiarism is borrowing words and phrases without attribution. <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text">
					Plagiarism is borrowing words and ideas without attribution. While common words and essential vocabulary are expected to be shared, summaries should reflect the writer's understanding of another text. The writer's own voice, sentence style, and lexicon should be apparent. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>
	{:else if content == 'orange'}
		<div id="substitute" class="content-area orange">
			{#if showFullText == false}
				<p class="short-text">
					Finding close synonyms for words is not going far enough. <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text">
					Finding close synonyms for words is not going far enough. Writing a good summary involves sharing your own understanding of what you have read. It may be easier to write your summary without the original text in view. This will make it less likely that your summary will closely match the original sentence structures. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>
	{:else if content == 'yellow'}
		<div id="wordiness" class="content-area yellow">
			{#if showFullText == false}
				<p class="short-text">
					Summaries should be much shorter than the original text. <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text">
					Summaries should be much shorter than the original text. Trying to avoid plagiarism sometimes places too much emphasis on changing the style of writing as opposed to communicating the main idea of the passage. A good summary omits secondary details in favor of clarity and conciseness. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>
	{:else if content == 'white'}
		<div id="success" class="content-area white">
			{#if showFullText == false}
				<p class="short-text">
					Avoiding plagiarism, simple word substitutions, and wordiness are big steps... <button class="simple-button read-more-button" on:click={() => showFullText = true}>read more</button>
				</p>
			{:else}
				<p class="full-text">
					Avoiding plagiarism, simple word substitutions, and wordiness are big steps in the process of writing better summaries. Though a computer can help identify many potential weaknesses in writing, you should always ask a friend or teacher for feedback. This is particularly true in terms of evaluating how well you have captured the main idea. <button class="simple-button read-more-button" on:click={() => showFullText = false}>read less</button>
				</p>
			{/if}
		</div>	
	{/if}
</section>
