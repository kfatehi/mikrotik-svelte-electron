<script>
    import ConnectForm from "./ConnectForm.svelte";
    import NeighborList from "./NeighborList.svelte";
    import { connectForm } from "./stores";

    function handleChooseNeighbor(event) {
        connectForm.set({
            ...$connectForm,
            ipAddress: event.detail.ipAddress,
        });
    }

</script>

<ConnectForm />
<hr />
<NeighborList on:choose={handleChooseNeighbor} />
