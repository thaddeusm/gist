<script>
export let textSample;
export let loaded;
export let hideable = false;

let hide;
if (hideable) {
	hide = true;
} else {
	hide = false;
}
</script>

<style>
@media screen and (max-width: 450px) {
	section {
		border-radius: 0;
	}
}

@media screen and (min-width: 451px) and (max-width: 800px) {
	section {
		border-radius: 0;
	}
}

@media screen and (min-width: 801px) {
	section {
		border-radius: .2em;
	}
}

section {
	background: var(--lightest);
	color: var(--darkest);
	max-width: 750px;
	margin: 0 auto;
	padding: 2% 3%;
}

p {
	
}
</style>

{#if hide}
	<section>
		<p>
			Need to look again? <button class="simple-button" on:click="{() => hide = false}">reveal text</button> 
		</p>
	</section>
{:else}
	<section>
		{#if loaded}
			<p>
				{textSample.text} 
				{#if hideable}
					<button class="simple-button" on:click="{() => hide = true}">hide text</button>
				{/if}
			</p>
		{:else}
			<p>
				loading...
			</p>
		{/if}
	</section>
{/if}
