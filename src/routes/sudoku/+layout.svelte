<script lang="ts">
	import { onMount } from 'svelte';

	let navigationBar: HTMLDivElement;
	let NewMatch: HTMLDivElement;

	
	onMount(() => {
		// navigationBar.onmouseenter = function hoverNavigationBar(e) {
		// 	navigationBar.classList.remove('bg-blue-700');
		// 	navigationBar.classList.add('bg-black');
		// };
	});
</script>

<div class="">
	<div class="fixed bottom-0 left-0 flex h-10 w-screen justify-center bg-black">
		<div
			class=" items-center fixed grid grid-cols-5 bottom-5  h-20 w-1/3 rounded-xl bg-blue-700 transition-all duration-200 hover:bottom-6 hover:h-24 hover:w-1/2"
			bind:this={navigationBar}
		>
	<div class="bg-slate-700 w-10 h-10 rounded-xl" bind:this={NewMatch}></div>
	
	</div>
	</div>
	<slot class=""></slot>
</div>
