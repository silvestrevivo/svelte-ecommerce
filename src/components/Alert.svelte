<script>
    import { fly } from 'svelte/transition';
    import globalStore from '../stores/globalStore';
    import { onMount, onDestroy } from 'svelte';

    function handleClose() {
        globalStore.toggleItem('alert', false);
    }

    let timeout;
    onMount(() => {
        timeout = setTimeout(() => {
            globalStore.toggleItem('alert', false);
        }, 3000);
    });

    onDestroy(() => {
        clearTimeout(timeout);
    });
</script>

<div
    class="alert-container"
    in:fly={{ y: -200, duration: 1000 }}
    class:alert-danger={$globalStore.alertDanger}>
    <div class="alert">
        <p>{$globalStore.alertText}</p>
        <button on:click={handleClose} class="alert-close">
            <i class="fas fa-window-close" />
        </button>
    </div>
</div>
