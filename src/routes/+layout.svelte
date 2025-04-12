<script lang="ts">
	import '../app.css';
	import MoveRight from '../components/move-right.svelte';
	import { page } from '$app/stores';
	import { goto, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Common meta tags
	const defaultMeta = {
		title: 'Mohanasundaram',
		description: "Mohanasundaram's personal website"
	};

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

<svelte:head>
	<title>{defaultMeta.title}</title>
	<meta name="description" content={defaultMeta.description} />
</svelte:head>

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
		<div style="view-transition-name: page" class="flex-1 w-full md:w-3/4 overflow-y-auto pb-20 md:pb-0 mt-[20%]">
			<div class="flex w-full flex-col items-start justify-end px-4 md:px-0">
				<div class="w-full md:w-[85%] p-[5%]">
					<div class="flex flex-col items-start gap-4">
						{@render children()}
					</div>
				</div>
			</div>
		</div>
		
		<!-- Mobile Navigation - Always visible at bottom -->
		<div class="fixed bottom-0 left-0 right-0 z-50 shadow-lg md:hidden" style="background-color: var(--nav-bg);">
			<nav class="mx-auto max-w-[1000px] flex items-center justify-around p-4">
				{#each routes as route}
					<a
						href={route.path}
						class="group flex cursor-pointer items-center justify-center gap-1 text-lg font-thin transition-all duration-300 px-3 py-1"
						style="color: var(--nav-text);"
						class:active={$page.url.pathname === route.path}
					>
						{route.name}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Desktop Navigation -->
		<div class="hidden md:absolute md:right-[5%] md:flex md:h-[50%] md:max-h-[900px] md:w-1/5 md:flex-col md:items-end md:justify-end p-4 rounded-lg" style="background-color: var(--nav-bg);">
			{#each routes as route}
				<a
					href={route.path}
					class="group flex cursor-pointer items-end justify-end gap-2 text-4xl font-thin transition-all duration-300 hover:text-4xl hover:font-black"
					style="color: var(--nav-text);"
					class:active={$page.url.pathname === route.path}
				>
					&nbsp; {route.name}
					<span
						class="opacity-0 transition-all duration-300"
						class:opacity-100={$page.url.pathname === route.path || false}
					>
						<MoveRight color="currentColor" />
					</span>
				</a>
			{/each}
			<div class="h-[10%]"></div>
		</div>
	</div>
</div>

<style>
	.active {
		background-color: var(--nav-active-bg);
		color: var(--nav-active-text) !important;
		font-weight: bold;
	}

	::view-transition-old(page) {
		animation: slide-out 500ms ease-in-out;
	}

	::view-transition-new(page) {
		animation: slide-in 500ms ease-in-out;
	}

	@keyframes slide-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes slide-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
