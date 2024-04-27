<script lang="ts">
	import { onMount } from 'svelte';

	let modal: HTMLDivElement;
	let outerModal: HTMLDivElement;
	onMount(() => {
		outerModal.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target === outerModal) {
				outerModal.classList.remove('grid');
				outerModal.classList.add('hidden');
			}
		});
	});
</script>

<div
	bind:this={outerModal}
	class="fixed bottom-0 left-0 grid h-screen w-screen grid-cols-1 grid-rows-1 items-center justify-center"
>
	<div
		class="align trainsition-all m-auto grid h-1/2 w-3/4 grid-rows-7 overflow-auto rounded-md bg-gray-500 duration-200"
		bind:this={modal}
	></div>
</div>
