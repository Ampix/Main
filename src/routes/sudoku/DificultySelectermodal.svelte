<script lang="ts">
	import { onMount } from "svelte";

let modal: HTMLDivElement;
let outerModal:HTMLDivElement;
onMount(()=>{

    
})
</script>

<div bind:this={outerModal} class="h-screen w-screen hidden items-center grid grid-cols-1 grid-rows-1 justify-center fixed bottom-0 left-0">
	<div class="align trainsition-all duration-200 h-3/4 w-1/2 bg-gray-500 rounded-md grid grid-rows-7 overflow-auto m-auto" bind:this={modal}>
    
    
    </div>
</div>
