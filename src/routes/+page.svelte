<script>
	import mohanImage from '../../static/mohan-1.jpg?enhanced';
	import { Github, Linkedin, Mail } from 'lucide-svelte';
	import ThemeToggle from '../components/theme-toggle.svelte';

	let urls = [
		{ name: 'Email', url: 'mailto:mohanasundaram.j@zohomail.in' , icon: Mail },
		{ name: 'Github', url: 'https://github.com/iammohan01' , icon : Github },
		{ name: 'Linkedin', url: 'https://www.linkedin.com/in/mohanasundaram-j-061bb7218/' , icon : Linkedin }
	];
</script>

<svelte:head>
  <title>Mohanasundaram</title>
  <meta name="description" content="Mohanasundaram's personal website" />
</svelte:head>
<!--<ThemeToggle />-->

<enhanced:img
	src={mohanImage}
	class="aspect-square w-32 max-w-[182px] rounded-full md:w-auto"
	alt="mohan profile image"
/>
<h1 class="text-3xl md:text-4xl font-black">Mohanasundaram</h1>
<p class="inverted bg-black font-arrnay text-xl md:text-2xl font-semibold text-white px-3">
	Hey! I'm a hobbyist software tinkerer and developer.
</p>
<div class="flex flex-wrap gap-4 p-4">
	{#each urls as url}
		<a
			class="font-base inline-block font-array transition-all duration-300 hover:underline"
			href={url.url}
		>
			<svelte:component this={url.icon} size="16"/> {url.name}
		</a>
	{/each}


	<!-- add location, current tech stack, and a short intro -->
</div>
