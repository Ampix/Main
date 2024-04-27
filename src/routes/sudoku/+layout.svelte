<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/settings.svg';
	import Modal from './DificultySelectermodal.svelte';

	let shown = false;
	let navigationBar: HTMLDivElement;
	let NewMatch: HTMLDivElement;
	let Settings: HTMLDivElement;
	let Solver: HTMLDivElement;
	onMount(() => {
		NewMatch.addEventListener('click', (e) => {
			e.preventDefault();
			shown = true;
		});
	});
</script>

<div class="">
	<div class="fixed bottom-0 left-0 flex h-10 w-screen justify-center bg-black">
		<div
			class=" group fixed bottom-5 grid h-20 w-screen grid-cols-3 items-center rounded-xl bg-blue-700 transition-all duration-200 hover:bottom-6 hover:h-24"
			bind:this={navigationBar}
		>
			<div
				class="relative m-auto size-10 rounded-xl bg-slate-700 transition-all duration-200 group-hover:size-16"
				bind:this={Settings}
			></div>
			<div
				class="relative m-auto size-14 rounded-2xl bg-slate-700 transition-all duration-200 group-hover:size-20"
				bind:this={NewMatch}
			></div>
			<div
				class="relative m-auto size-10 rounded-xl bg-slate-700 transition-all duration-200 group-hover:size-16"
				bind:this={Solver}
			></div>
		</div>
	</div>
	<slot></slot>
	<Modal bind:shown></Modal>
</div>
