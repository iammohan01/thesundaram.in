<script>
	let urls = [
		{ name: 'Email', url: 'mailto:mohanasundaram.j@zohomail.in' },
		{ name: 'Github', url: 'https://github.com/iammohan01' },
		{ name: 'Linkedin', url: 'https://www.linkedin.com/in/mohanasundaram-j-061bb7218/' }
	];
</script>

<div class="h-full w-3/4 bg-c-grey">
	<div class="flex h-[50%] w-full flex-col items-start justify-end">
		<div class="w-[85%] p-[5%]">
			<img src="/mohan-1.jpg" class="aspect-square max-w-[182px] rounded-full" alt="" />
			<h1 class="text-4xl font-black">Mohanasundaram</h1>
			<p class="text-2xl font-semibold">Hey! I'm a hobbyist software developer and tinkerer.</p>
			<div class="flex h-[10%]">
				{#each urls as url}
					<a
						class="font-base inline-block w-[65px] font-array transition-all duration-300 hover:underline"
						href={url.url}
					>
						{url.name}
					</a>
				{/each}
			</div>
		</div>
		<!-- <div class="h-[10%] ee w-full"> -->
		<!-- </div> -->
	</div>
</div>
