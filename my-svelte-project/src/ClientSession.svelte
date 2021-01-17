<script>
    import ipc from './ipc';
	import { onMount, onDestroy } from "svelte";
	import { addresses } from "./stores.js";

    let pollingIntervalId = null;

    let onData = (event, data)=>{
        console.log(data);
        addresses.set(data);
    }

    let poll = ()=>ipc.invoke('routerosclient:get-addresses');

    onMount(() => {
        ipc.on('routerosclient:set-addresses', onData);
        pollingIntervalId = setInterval(poll, 1000);
            
	});
	onDestroy(() => {
        clearInterval(pollingIntervalId);
        ipc.removeListener('routerosclient:set-addresses');
    });
</script>

<table>
	<thead>
		<tr>
			<th>Address</th>
			<th>Network</th>
			<th>Interface</th>
		</tr>
	</thead>
	<tbody>
		{#each $addresses as address}
			<tr>
				<td>{address.address}</td>
				<td>{address.network}</td>
				<td>{address.interface}</td>
			</tr>
		{/each}
	</tbody>
</table>
