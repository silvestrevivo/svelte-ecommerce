<script>
    import { onMount } from 'svelte';
    import { navigate, link } from 'svelte-routing';
    import user from '../stores/user';
    import { cartTotal } from '../stores/cart';

    onMount(() => {
        if (!$user.jwt) {
            navigate('/');
        }
    });
</script>

{#if $cartTotal > 0}
    <h1>form</h1>
{:else}
    <div class="checkout-empty">
        <h2>your cart is empty</h2>
        <a href="/products" use:link class="btn btn-primary">fill it</a>
    </div>
{/if}
