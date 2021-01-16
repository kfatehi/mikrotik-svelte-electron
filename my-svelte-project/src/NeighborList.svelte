<script>
	import { onMount, onDestroy } from 'svelte';
	import { neighbors } from './stores.js'
    import { refresh, start, stop } from './neighbor-list-api';
	
	onMount(()=> start());
	onDestroy(() => stop());
</script>

<label>Connect To: <input type="text" /></label>
<button on:click="{() => refresh()}">Refresh</button>
<table>
	<thead>
		<tr>
			<th>MAC Address</th>
		</tr>
	</thead>
	<tbody>
		{#each $neighbors as neighbor}
			<tr>
				<td>{neighbor.macAddress}</td>
			</tr>
		{/each}
	</tbody>
</table>