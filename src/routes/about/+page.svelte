<script>
	import TextLine from '$lib/components/TextLine.svelte';

	const content = [
		{
			text: "A coder by craft, weaving tech's magic in moments of muse.",
			highlights: ['A coder by craft'],
		},
		{
			text: "My tech journey kicked off with flashing custom-ROMs on phones, igniting my passion for programming and pushing me to hone my coding skills.",
			highlights: ["custom-ROMs"],
		},
		{
			text: "Fueled by curiosity and grit, I dove into a self-taught programming adventure, which led me to Zoho Schools.",
			highlights: ["self-taught", "Zoho Schools"],
		}
	];

	// worked on front-end backend and aws devops,
	// I have build few apps using react, built few years back,
	// svelte I love svelte and build apps with it and this also built with it only
	// vue, I'm actively working with vue and building a new app with it.
	// I'm not front-end expertise, am the junior developer in my team and completely taking care of front end.

</script>

<svelte:head>
	<title>Mohanasundaram</title>
	<meta name="description" content="Mohanasundaram's personal website" />
</svelte:head>

<p class="text-xl">
	{#each content as line}
		<TextLine 
			text={line.text}
			highlightTerms={line.highlights}
		/>
	{/each}
</p>
