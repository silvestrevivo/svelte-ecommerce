<script>
    export let id, image, title, price, amount;
</script>

<!-- cart item -->
<div class="cart-item">
    <img src={image} alt={title} />
    <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button
            class="cart-btn remove-btn"
            on:click={() => console.log('remove', id)}>
            remove
        </button>
    </div>
    <div>
        <button
            class="cart-btn amount-btn"
            on:click={() => console.log('increase item', id)}>
            <i class="fas fa-chevron-up" />
        </button>
        <p class="item-amount">{amount}</p>
        <button
            class="cart-btn amount-btn"
            on:click={() => console.log('decrease item', id)}>
            <i class="fas fa-chevron-down" />
        </button>
    </div>
</div>
