<script>
    import { connectForm, errorMessage } from './stores';
    import { connect, save } from './connect-form-api';
</script>

<label>Connect To: <input on:keyup={save} bind:value="{$connectForm.ipAddress}"></label>
<label>Login: <input on:keyup={save} bind:value="{$connectForm.login}"></label>
<label>Password: <input on:keyup={save} bind:value="{$connectForm.password}" type="password"></label>
<button on:click={connect}>Connect</button>
{#if $errorMessage}
<p>{$errorMessage}</p>
{/if}
