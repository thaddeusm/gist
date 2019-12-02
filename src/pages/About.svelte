<script>
	import ColorBars from './../components/ColorBars.svelte';
	import TitleHeader from './../components/TitleHeader.svelte';
	import PrettyParagraph from './../components/PrettyParagraph.svelte';
</script>

<style>
@media screen and (max-width: 450px) {
	main {
		margin-top: 250px;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	main {
		margin-top: 300px;
	}
}

@media screen and (min-width: 801px) {
	main {
		margin-top: 350px;
	}
}

a {
	display: block;
	text-decoration: none;
	margin: 75px auto;
	width: 80px;
}

footer {
	margin: 50px auto 50px auto;
}
</style>

<TitleHeader subtitle={'by Thaddeus McCleary'} />
<main>
	<PrettyParagraph>
		Gist is a serious game to help students improve their ability to summarize texts they read, while avoiding inadvertent plagiarism.
	</PrettyParagraph>
	<PrettyParagraph>
		The game currently includes three levels that challenge the player to find the main idea and develop a concise summary from texts that are progressively difficult.  While text samples for the first level are original, texts for the second and third levels are adapted from Wikipedia articles.
	</PrettyParagraph>
	<PrettyParagraph>
		Click on the colors below to learn more about how Gist evaluates summaries.
	</PrettyParagraph>
</main>
<footer>
	<ColorBars />
	<a href="#/" class="action-button">BACK</a>
</footer>