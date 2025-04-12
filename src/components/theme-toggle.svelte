<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let isDark = false;

	onMount(() => {
		if (browser) {
			// Check for saved theme preference or system preference
			const savedTheme = localStorage.getItem('theme');
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			
			isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
			updateTheme();
		}
	});

	function toggleTheme() {
		isDark = !isDark;
		updateTheme();
	}

	function updateTheme() {
		if (browser) {
			document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		}
	}
</script>

<button
	on:click={toggleTheme}
	class="fixed top-4 right-4 z-50 p-2 rounded-full transition-colors duration-300"
	aria-label="Toggle dark mode"
>
	{#if isDark}
		<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
		</svg>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
		</svg>
	{/if}
</button> 