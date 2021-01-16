<script>
    import { connectForm } from './stores';
</script>

<label>Connect To: <input bind:value="{$connectForm.ipAddress}"></label>
<label>Login: <input bind:value="{$connectForm.login}"></label>
<label>Password: <input bind:value="{$connectForm.password}"></label>
<button>Connect</button>