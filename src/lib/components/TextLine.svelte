<script lang="ts">
	export let text = '';
	export let highlightTerms: string[] = [];
</script>


<span class="text-line block py-2">
	{#each text.split(' ') as word, i}
		{#if highlightTerms.includes(word)}
			<span class="bg-black text-white px-2 font-semibold">{word}</span>
		{:else}
			{word}
		{/if}
		{#if i < text.split(' ').length - 1}
			{' '}
		{/if}
	{/each}
</span>