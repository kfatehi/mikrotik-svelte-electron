<script>
	import { onMount, onDestroy } from "svelte";
	import { neighbors } from "./stores.js";
	import { refresh, start, stop } from "./neighbor-list-api";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	onMount(() => {
		start();
		refresh();
	});
	onDestroy(() => stop());

	function choose(item) {
		dispatch("choose", item);
	}
</script>

<button on:click={() => refresh()}>Refresh</button>
<table>
	<thead>
		<tr>
			<th>MAC Address</th>
			<th>IP Address</th>
			<th>Identity</th>
			<th>Version</th>
			<th>Board</th>
			<th>Uptime</th>
		</tr>
	</thead>
	<tbody>
		{#each $neighbors as neighbor}
			<tr on:click={() => choose(neighbor)}>
				<td>{neighbor.macAddress}</td>
				<td>{neighbor.ipAddress}</td>
				<td>{neighbor.identity}</td>
				<td>{neighbor.version}</td>
				<td>{neighbor.board}</td>
				<td>{neighbor.uptime}</td>
			</tr>
		{/each}
	</tbody>
</table>
