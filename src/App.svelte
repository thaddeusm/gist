<script>
	import Router from 'svelte-spa-router'

	import Start from './pages/Start.svelte';
	import Read from './pages/Read.svelte';
	import Summarize from './pages/Summarize.svelte';
	import Analyze from './pages/Analyze.svelte';
	import AnalysisTool from './pages/AnalysisTool.svelte';
	import About from './pages/About.svelte';

	const routes = {
	    '/': Start,
	    '/read': Read,
	    '/summarize': Summarize,
	    '/analyze': Analyze,
	    '/tool': AnalysisTool,
	    '/about': About,
	    '*': Start
	}
</script>

<style>
	
</style>

<Router {routes} />