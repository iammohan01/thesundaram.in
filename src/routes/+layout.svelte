<script lang="ts">
	import '../app.css';
	import MoveRight from '../components/move-right.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children } = $props();
	let routes = [
		{ name: 'me', path: '/' },
		// { name: 'about', path: '/about' },
		// { name: 'projects', path: '/projects' },
		{ name: 'thoughts', path: '/thoughts' }
	];
</script>

<div class="container relative mx-auto flex h-screen max-w-[1000px] bg-pattern bg-contain">
	<div style="view-transition-name: page" class="h-full w-3/4 bg-c-grey">
		{@render children()}
	</div>
	<div class="absolute right-[5%] flex h-[50%] max-h-[900px] w-1/5 flex-col items-end justify-end">
		{#each routes as route}
			<a
				href={route.path}
				class="{page.url.pathname === route.path && 'inverted bg-black text-white'}
					 inverted group flex cursor-pointer items-end justify-end gap-2 text-4xl font-thin transition-all duration-300 hover:text-4xl hover:font-black"
			>
				&nbsp; {route.name}
				<span
					class="opacity-0 transition-all duration-300 {page.url.pathname !== route.path &&
						'group-hover:opacity-100'}"
				>
					<MoveRight />
				</span>
			</a>
		{/each}
		<div class="h-[10%]"></div>
	</div>
</div>

<style>
	::view-transition-old(page) {
		animation: slide-out 500ms ease-in-out;
	}

	::view-transition-new(page) {
		animation: slide-in 500ms ease-in-out;
	}

	@keyframes slide-out {
		from {
			/* transform: translateY(0); */
			opacity: 1;
		}
		to {
			/* transform: translateY(25px); */
			opacity: 0;
		}
	}

	@keyframes slide-in {
		from {
			/* transform: translateY(-25px); */
			opacity: 0;
		}
		to {
			/* transform: translateY(0); */
			opacity: 1;
		}
	}
</style>
