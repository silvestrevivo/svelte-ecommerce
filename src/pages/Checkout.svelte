<script>
    import { onMount } from 'svelte';
    import { navigate, link } from 'svelte-routing';
    import user from '../stores/user';
    import { cartTotal } from '../stores/cart';

    let name;
    $: isEmpty = !name;
    // stripe vars
    let cardElement, cardErrors, card, stripe, elements;

    onMount(() => {
        if (!$user.jwt) {
            navigate('/');
            return;
        }
        stripe = Stripe(process.env.API_STRIPE);
        elements = stripe.elements();
        card = elements.create('card');
        card.mount(cardElement);
        card.addEventListener('change', e => {
            if (e.error) {
                cardErrors.textContent = e.error.message;
            } else {
                cardErrors.textContent = '';
            }
        });
    });

    function handleSubmit() {
        console.log('form submitted');
    }
</script>

{#if $cartTotal > 0}
    <section class="form">
        <h2 class="section-title">checkout</h2>
        <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
            <h3>order total: ${$cartTotal}</h3>
            <!-- single input -->
            <div class="form-control">
                <label for="name">your name</label>
                <input type="text" id="name" bind:value={name} />
            </div>
            <!-- stripe stuff -->
            <label for="card-element">Credit or Debit Card</label>
            <p class="stripe-info">
                test using this credit card:
                <span>4242 4242 4242 4242</span>
                <br />
                enter any 5 digits for the zip code
                <br />
                enter any 3 digits for the CVC
            </p>
            <div class="stripe-input">
                <div id="card-element" bind:this={cardElement}>
                    <!-- stripe -->
                </div>
                <div id="card-errors" bind:this={cardErrors} role="alert" />
            </div>
            {#if isEmpty}
                <p class="form-empty">please fill out name field</p>
            {/if}
            <button
                type="submit"
                class="btn btn-block btn-primary"
                disabled={isEmpty}
                class:disabled={isEmpty}>
                submit
            </button>
        </form>
    </section>
{:else}
    <div class="checkout-empty">
        <h2>your cart is empty</h2>
        <a href="/products" use:link class="btn btn-primary">fill it</a>
    </div>
{/if}
