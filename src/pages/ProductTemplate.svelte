<script>
    import products from '../stores/products';
    import Loading from '../components/Loading.svelte';
    import { link } from 'svelte-routing';
    import { addToCart } from '../stores/cart';
    import globalStore from '../stores/globalStore';
    export let id;

    $: product = $products.find(item => item.id === parseInt(id));
    $: ({ image, title, price, description } = product);
</script>

<svelte:head>
    <title>{!product ? 'single product' : title}</title>
</svelte:head>

{#if !product}
    <Loading />
{:else}
    <section class="single-product">
        <a href="/products" use:link class="btn btn-primary">
            back to products
        </a>
        <div class="single-product-container">
            <article class="single-product-image">
                <img src={image} alt={title} />
            </article>
            <article class="single-product-image">
                <h1>{title}</h1>
                <h2>${price}</h2>
                <p>{description}</p>
                <button
                    class="btn btn-primary btn-block"
                    on:click={() => {
                        globalStore.toggleItem('cart', true);
                        addToCart(product);
                    }}>
                    add to cart
                </button>
            </article>
        </div>
    </section>
{/if}
