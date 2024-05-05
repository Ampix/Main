<script lang="ts">
	import { onMount } from 'svelte';
	export let shown: boolean;
	export let output: number;
	let modal: HTMLDivElement;
	let outerModal: HTMLDivElement;
	let Easy: HTMLDivElement;
	let Normal: HTMLDivElement;
	let Hard: HTMLDivElement;
	let Extreme: HTMLDivElement;
	onMount(() => {
		outerModal.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target === outerModal) {
				shown = false;
				output = 0;
			}
		});
		Easy.addEventListener('click', (e) => {
			output = 1;
			shown = false;
		});

		Normal.addEventListener('click', (e) => {
			output = 2;
			shown = false;
		});

		Hard.addEventListener('click', (e) => {
			output = 3;
			shown = false;
		});

		Extreme.addEventListener('click', (e) => {
			output = 4;
			shown = false;
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
		class="trainsition-all m-auto grid h-1/2 w-3/4 grid-rows-4 content-stretch overflow-auto rounded-md bg-blue-600 duration-200"
		bind:this={modal}
	>
		<div
			bind:this={Easy}
			class="m-4 flex items-center justify-center rounded-2xl bg-green-600 py-2 text-center text-4xl text-white hover:bg-green-800"
		>
			Easy
		</div>
		<div
			bind:this={Normal}
			class=" m-4 flex items-center justify-center rounded-2xl bg-yellow-500 py-2 text-center text-4xl text-white hover:bg-yellow-700"
		>
			Normal
		</div>
		<div
			bind:this={Hard}
			class=" m-4 flex items-center justify-center rounded-2xl bg-orange-600 py-2 text-center text-4xl text-white hover:bg-orange-800"
		>
			Hard
		</div>
		<div
			bind:this={Extreme}
			class=" m-4 flex items-center justify-center rounded-2xl bg-red-700 py-2 text-center text-4xl text-white hover:bg-red-900"
		>
			Extreme
		</div>
	</div>
</div>
