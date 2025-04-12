<script>
	import TextLine from '$lib/components/TextLine.svelte';

	// #past
	// initially i was working as chemical engineer,
	// in childhood i was always interested in computers,
	// I switched few companies in chemical industry for around 2 years,
	// I was not happy with this, heart wanted me to do something else,
	// I started to learn programming,
	// then i got to know about zoho school,

	// #present
	// initially i was working completly backend,
	// then i want to build some things cool with frontend,
	// i learned frontend, but my job was only backend, so eventually i started to do some admin pannels and stuffs when i'm free,

	const linkReferences = {
		'ZOHO' : 'https://zoho.com',
		'Zoho Health care': 'https://www.zoho.com/healthcare/',
		'Trainercentral' : 'https://www.trainercentral.com/'
	};
	const ff = {
			past: [
				{
					text: 'My journey into technology began with a background in Chemical Engineering, but my childhood fascination with computers never waned.',
					highlights: ['Chemical Engineering']
				},
				{
					text: 'After two years in the chemical industry, I realized my true passion lay elsewhere.',
					highlights: []
				}
			],
			present: [
				{
					text: 'Currently I\'m working as a backend engineer in Trainercentral\'s (a division of ZOHO) live class infrastructure,',
					highlights: ['Trainercentral','ZOHO']
				},
				{
					text: 'And, At the same moment I\'m building on Zoho Health care system\'s one of products, Not yet released',
					highlights: ['Zoho Health care']
				}
			]
		}
	;

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
	<span class="text-4xl font-black block">Past (till 2021)</span>
	{#each ff.past as line}
		<TextLine
			text={line.text}
			highlightTerms={line.highlights}
			{linkReferences}
		/>
	{/each}
	<span class="text-4xl font-black block mt-8 mb-4">Present (2025)</span>
	{#each ff.present as line}
		<TextLine
			text={line.text}
			highlightTerms={line.highlights}
			{linkReferences}
		/>
	{/each}
</p>
