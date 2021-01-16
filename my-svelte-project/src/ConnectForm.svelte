<script>
    import { connectForm, errorMessage } from './stores';
    import { connect } from './connect-form-api';
</script>

<label>Connect To: <input bind:value="{$connectForm.ipAddress}"></label>
<label>Login: <input bind:value="{$connectForm.login}"></label>
<label>Password: <input bind:value="{$connectForm.password}" type="password"></label>
<button on:click={()=>connect($connectForm)}>Connect</button>
{#if $errorMessage}
<p>{$errorMessage}</p>
{/if}
