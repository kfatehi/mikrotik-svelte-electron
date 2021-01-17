<script>
    import { onMount } from "svelte";

    import ConnectForm from "./ConnectForm.svelte";
    import NeighborList from "./NeighborList.svelte";
    import ClientSession from "./ClientSession.svelte";
    import { mainProcessStateLoaded, connected, connectForm } from "./stores";
    import { fetchMainState } from './main-api';
    import { save as saveConnectForm } from './connect-form-api';

    function handleChooseNeighbor(event) {
        connectForm.set({
            ...$connectForm,
            ipAddress: event.detail.ipAddress,
        });
        saveConnectForm();
    }

    onMount(() => {
        // am i connected already?
        // what are my saved/managed connection profiles?

        fetchMainState();
    });
</script>

{#if $mainProcessStateLoaded}
    {#if $connected}
        <ClientSession />
    {:else}
        <ConnectForm />
        <hr />
        <NeighborList on:choose={handleChooseNeighbor} />
    {/if}
{:else}
    Loading...
{/if}
