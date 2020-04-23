<script>
    import user from '../stores/user';
    import { link } from 'svelte-routing';
    import globalStore from '../stores/globalStore';
    import { logoutUser } from '../stores/user';
</script>

{#if $user.jwt}
    <a
        href="/"
        use:link
        class="logout-btn"
        on:click={() => {
            globalStore.toggleItem('sidebar', false);
            logoutUser();
        }}>
        logout
    </a>
{:else}
    <a
        href="/login"
        use:link
        on:click={() => {
            globalStore.toggleItem('sidebar', false);
        }}>
        login
    </a>
{/if}
