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

<h1>welcome to the checkout page</h1>
<h1>welcome to the checkout page</h1>
<h1>welcome to the checkout page</h1>
<h1>welcome to the checkout page</h1>
<h1>welcome to the checkout page</h1>
<h1>welcome to the checkout page</h1>
<h1>welcome to the checkout page</h1>
<h1>welcome to the checkout page</h1>
