<script>
	import TextLine from '$lib/components/TextLine.svelte';
	import mohanImage from '../../../static/mohan-1.jpg?enhanced';

	const content = [
		{
			text: "Developer with technology as a Hobby.",
			highlights: ['technology']
		},
		{
			text: "Self-taught programmer, later trained at Zoho Schools.",
			highlights: ["Self-taught", "Zoho"]
		},
		{
			text: "Experienced in Java REST APIs and Node.js.",
			highlights: ['Java', 'REST', 'APIs', 'Node.js']
		},
		{
			text: "I'm deeply rooted in exploring and tinkering with the products I work on,",
			highlights: []
		},
		{
			text: "constantly finding ways to optimize and enhance existing systems rather than building from scratch.",
			highlights: []
		},
		{
			text: "My full-stack experience spans front-end, back-end, and AWS DevOps.",
			highlights: ['full-stack', 'front-end', 'back-end', 'AWS', 'DevOps']
		},
		{
			text: "Though I'm the junior developer on my team, I've taken complete ownership of front-end development.",
			highlights: []
		},
		{
			text: "I've built applications with React in the past, currently work with Vue on a new project, and have a particular fondness for Svelte which I've used to build several applications, including this.",
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

<div class="flex h-[50%] w-full flex-col items-start justify-end">
	<div class="h-full">
		<div class="flex h-[50%] w-full flex-col items-start justify-end">
			<p class="h-[10%] px-[5%] w-full text-xl">
				{#each content as line}
					<TextLine 
						text={line.text}
						highlightTerms={line.highlights}
					/>
				{/each}
			</p>
		</div>
	</div>
	<!-- <div class="h-[10%] ee w-full"> -->
	<!-- </div> -->
</div>
<!-- </div> -->
