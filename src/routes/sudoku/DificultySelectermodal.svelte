<script lang="ts">
	import { onMount } from 'svelte';
	export let shown: boolean;
	export let errorMesseage: string;
	let modal: HTMLDivElement;
	let outerModal: HTMLDivElement;
	onMount(() => {
		outerModal.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target === outerModal) {
				shown = false;
				errorMesseage = 'Nem választottál semmilyen módot';
			}
		});
	});
</script>

<div
	bind:this={outerModal}
	class:grid={shown}
	class:hidden={!shown}
	class="fixed bottom-0 left-0 grid h-screen w-screen grid-cols-1 grid-rows-1 items-center justify-center"
>
	<div
		class="{shown
			? 'h-1/2 w-3/4'
			: 'h-0 w-0'} trainsition-all m-auto grid grid-rows-4 content-stretch overflow-auto rounded-md bg-gray-500 duration-200"
		bind:this={modal}
	>
		<div
			class="mx-1 my-4 flex items-center justify-center rounded-2xl bg-gray-400 py-2 text-center text-4xl text-white"
		>
			Easy
		</div>
		<div
			class=" mx-1 my-4 flex items-center justify-center rounded-2xl bg-gray-400 py-2 text-center text-4xl text-white"
		>
			Normal
		</div>
		<div
			class=" mx-1 my-4 flex items-center justify-center rounded-2xl bg-gray-400 py-2 text-center text-4xl text-white"
		>
			Hard
		</div>
		<div
			class=" mx-1 my-4 flex items-center justify-center rounded-2xl bg-gray-400 py-2 text-center text-4xl text-white"
		>
			Extreme
		</div>
	</div>
</div>
