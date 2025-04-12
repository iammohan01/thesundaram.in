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

	const content = [
		{
			text: 'Skilled in crafting Java rest api\'s with Spring Boot and Play framework and tinkering with Node.js.',
			highlights: ['Java', 'Node.js', 'Spring Boot', 'Play framework']
		},
		{
			text: 'I\'m all about diving deep into the products I work on, tweaking and boosting existing systems to make them shine.',
			highlights: []
		},
		{
			text: 'Started my career as a backend developer, laser-focused on solid server-side solutions.',
			highlights: ['backend']
		},
		{
			text: 'Curiosity pulled me toward frontend development, where I started crafting admin panels and side projects in my spare time.',
			highlights: []
		},
		{
			text: 'Today, I juggle backend and frontend, always leveling up my skills in both worlds.',
			highlights: ['backend', 'frontend']
		},
		{
			text: 'My full-stack journey covers front-end, back-end, and AWS DevOps.',
			highlights: ['full-stack', 'AWS']
		},
		{
			text: 'As the junior dev on my team, I\'ve grabbed the reins of front-end development with both hands.',
			highlights: []
		},
		{
			text: 'I\'ve built apps with React, currently play with Vue on a new project, and have a soft spot for Svelte, which I\'ve used for several projects, including this one.',
			highlights: ['React', 'Vue', 'Svelte']
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
