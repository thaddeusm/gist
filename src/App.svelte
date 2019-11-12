<script>
	import { Router, Route } from 'svero';
	import Start from './pages/Start.svelte';
	import Read from './pages/Read.svelte';
	import Summarize from './pages/Summarize.svelte';
	import Analyze from './pages/Analyze.svelte';
</script>

<style>
	
</style>

<Router>
	<Route path="*" component={Start} />
	<Route exact path="/" component={Start} />
	<Route exact path="/read" component={Read} />
	<Route exact path="/summarize" component={Summarize} />
	<Route exact path="/analyze" component={Analyze} />
</Router>
