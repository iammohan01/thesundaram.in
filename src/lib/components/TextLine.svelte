<script lang="ts">
	export let text: string;
	export let highlightTerms: string[] = [];

	export let  linkReferences: { [key: string]: string } = {
		'Zoho Schools' : 'https://www.zohoschools.com/'
	};

	// Function to wrap highlighted terms in spans
	function wrapHighlights(text: string): string {
		let result = text;
		highlightTerms.forEach(term => {
			const regex = new RegExp(`(${term})`, 'gi');
			if (linkReferences[term]) {
				result = result.replace(regex, `<a href="${linkReferences[term]}" class="bg-black text-white px-2 font-semibold hover:bg-gray-800 border-dotted border-b-2 border-white">$1</a>`);
			} else {
				result = result.replace(regex, '<span class="bg-black text-white px-2 font-semibold">$1</span>');
			}
		});
		return result;
	}
</script>

<span class="inline-block">
	{@html wrapHighlights(text)}
</span>