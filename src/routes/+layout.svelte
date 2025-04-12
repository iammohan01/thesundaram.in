<script lang="ts">
	import '../app.css';
	import MoveRight from '../components/move-right.svelte';
	import { page } from '$app/stores';
	import { goto, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

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
		{ name: 'about', path: '/about' },
		{ name: 'tech', path: '/tech' },
		{ name: 'work', path: '/work' }
	];

	let lastScrollTime = 0;
	const scrollThreshold = 1000; // Increased to 1 second
	let isNavigating = false;
	let lastZoomLevel = 1;

	let touchStartX = 0;
	let touchEndX = 0;
	const minSwipeDistance = 50; // minimum distance for a swipe to be registered

	onMount(() => {
		if (browser) {
			lastZoomLevel = window.devicePixelRatio;
		}
	});

	const handleZoom = async (e: WheelEvent) => {
		if (!browser) return;
		if (e.ctrlKey || e.metaKey) {  // Check if it's a zoom event (Ctrl/Cmd + scroll)
			const now = Date.now();
			if (now - lastScrollTime < scrollThreshold || isNavigating) return;
			lastScrollTime = now;

			const currentZoomLevel = window.devicePixelRatio;
			const isZoomingIn = currentZoomLevel > lastZoomLevel;
			lastZoomLevel = currentZoomLevel;

			const currentIndex = routes.findIndex(route => route.path === $page.url.pathname);
			const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

			if (isZoomingIn && isAtBottom && currentIndex < routes.length - 1) {
				isNavigating = true;
				await goto(routes[currentIndex + 1].path);
				isNavigating = false;
			}
		}
	};

	const handleScroll = async (e: WheelEvent) => {
		if (!browser) return;
		if (e.ctrlKey || e.metaKey) return; // Skip if it's a zoom event
		
		const now = Date.now();
		if (now - lastScrollTime < scrollThreshold || isNavigating) return;
		lastScrollTime = now;

		const currentIndex = routes.findIndex(route => route.path === $page.url.pathname);
		
		// Check if we're at the bottom of the page
		const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
		
		if (e.deltaY > 0 && currentIndex < routes.length - 1 && isAtBottom) {
			// Scroll down - go to next route only if at bottom
			isNavigating = true;
			await goto(routes[currentIndex + 1].path);
			isNavigating = false;
		} else if (e.deltaY < 0 && currentIndex > 0) {
			// Scroll up - go to previous route
			isNavigating = true;
			await goto(routes[currentIndex - 1].path);
			isNavigating = false;
		}
	};

	const kk = async (e: KeyboardEvent) => {
		if (isNavigating) return;
		
		const currentIndex = routes.findIndex(route => route.path === $page.url.pathname);
		if(e.code == "ArrowUp" && currentIndex > 0){
			isNavigating = true;
			await goto(routes[currentIndex - 1].path);
			isNavigating = false;
		}
		else if(e.code == "ArrowDown" && currentIndex < routes.length - 1){
			isNavigating = true;
			await goto(routes[currentIndex + 1].path);
			isNavigating = false;
		}
	};

	const kkk = (e: any) => {
		console.log(e);
	};

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.touches[0].clientX;
	};

	const handleTouchEnd = async (e: TouchEvent) => {
		if (isNavigating) return;
		
		touchEndX = e.changedTouches[0].clientX;
		const swipeDistance = touchEndX - touchStartX;
		
		if (Math.abs(swipeDistance) < minSwipeDistance) return;

		const currentIndex = routes.findIndex(route => route.path === $page.url.pathname);
		
		if (swipeDistance > 0 && currentIndex > 0) {
			// Swipe right - go to previous route
			isNavigating = true;
			await goto(routes[currentIndex - 1].path);
			isNavigating = false;
		} else if (swipeDistance < 0 && currentIndex < routes.length - 1) {
			// Swipe left - go to next route
			isNavigating = true;
			await goto(routes[currentIndex + 1].path);
			isNavigating = false;
		}
	};
</script>

<svelte:window 
	on:keydown={kk} 
	on:wheel={handleScroll} 
	on:wheel|preventDefault={handleZoom}
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchEnd}
/>

<div class="container relative mx-auto flex min-h-[100dvh] w-full max-w-[1000px] bg-pattern bg-contain">
	<div class="relative flex w-full flex-col">
		<!-- Main content area -->
		<div style="view-transition-name: page" class="flex-1 w-full bg-c-grey md:w-3/4 overflow-y-auto pb-20 md:pb-0">
			{@render children()}
		</div>
		
		<!-- Mobile Navigation - Always visible at bottom -->
		<div class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg md:hidden">
			<nav class="mx-auto max-w-[1000px] flex items-center justify-around p-4">
				{#each routes as route}
					<a
						href={route.path}
						class="inverted group flex cursor-pointer items-center justify-center gap-1 text-lg font-thin transition-all duration-300 px-3 py-1 {$page.url.pathname === route.path && 'inverted bg-black text-white !font-bold'}"
					>
						{route.name}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Desktop Navigation -->
		<div class="hidden md:absolute md:right-[5%] md:flex md:h-[50%] md:max-h-[900px] md:w-1/5 md:flex-col md:items-end md:justify-end">
			{#each routes as route}
				<a
					href={route.path}
					class="{$page.url.pathname === route.path && 'inverted bg-black text-white'}
						inverted group flex cursor-pointer items-end justify-end gap-2 text-4xl font-thin transition-all duration-300 hover:text-4xl hover:font-black"
				>
					&nbsp; {route.name}
					<span
						class="opacity-0 transition-all duration-300 {$page.url.pathname !== route.path &&
							'group-hover:opacity-100'} {$page.url.pathname === route.path &&
							'opacity-100'}"
					>
						<MoveRight color={$page.url.pathname === route.path ? 'white' : 'currentColor'} />
					</span>
				</a>
			{/each}
			<div class="h-[10%]"></div>
		</div>
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
