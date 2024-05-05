<script lang="ts">
	import { getPossibleDigits } from './solver';
	import { onMount } from 'svelte';
	onMount(() => {
		console.log(
			getPossibleDigits([
				{
					value: 1,
					pos: [0, 0],
					section: [0, 0],
					posibility: []
				},
				{
					value: 0,
					pos: [0, 1],
					section: [0, 0],
					posibility: []
				}
			])
		);
	});
</script>
