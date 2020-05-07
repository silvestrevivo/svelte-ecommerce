<script>
    import { onMount } from 'svelte';
    import { navigate, link } from 'svelte-routing';
    import user from '../stores/user';
    import cart, { cartTotal } from '../stores/cart';
    import submitOrder from '../strapi/submitOrder';
    import globalStorage from '../stores/globalStore';

    let name;
    $: isEmpty = !name || $globalStorage.alert;
    // stripe vars
    let cardElement, cardErrors, card, stripe, elements;

    onMount(() => {
        if (!$user.jwt) {
            navigate('/');
            return;
        }
        if ($cartTotal > 0) {
            stripe = Stripe(process.env.API_STRIPE);
            elements = stripe.elements();
            card = elements.create('card');
            card.mount(cardElement);
            card.addEventListener('change', function(e) {
                if (e.error) {
                    cardErrors.textContent = e.error.message;
                } else {
                    cardErrors.textContent = '';
                }
            });
        }
    });

    async function handleSubmit() {
        globalStorage.toggleItem(
            'alert',
            true,
            'submitting order...please wait!',
        );
        let response = await stripe
            .createToken(card)
            .catch(err => console.log(err));
        const { token } = response;
        if (token) {
            const { id } = token;
            let order = await submitOrder({
                name,
                total: $cartTotal,
                items: $cart,
                stripeTokenId: id,
                userToken: $user.jwt,
            });
            if (order) {
                globalStorage.toggleItem(
                    'alert',
                    true,
                    'your order is completed',
                );
                cart.set([]);
                localStorage.setItem('cart', JSON.stringify([]));
                navigate('/');
                return;
            }
        } else {
            globalStorage.toggleItem(
                'alert',
                true,
                'there was an error with your order, please try again',
                true,
            );
        }
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
            <div class="stripe-input">
                <label for="card-element">Credit or Debit Card</label>
                <p class="stripe-info">
                    test using this credit card:
                    <span>4242 4242 4242 4242</span>
                    <br />
                    enter any 5 digits for the zip code
                    <br />
                    enter any 3 digits for the CVC
                </p>
                <div id="card-element" bind:this={cardElement}>
                    <!-- stripe -->
                </div>
                <div id="card-errors" bind:this={cardErrors} role="alert" />
            </div>
            <!-- error message -->
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
