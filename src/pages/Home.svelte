<script>
    import Hero from '../components/Hero.svelte';
    import Featured from '../components/Products/Featured.svelte';
    import { link } from 'svelte-routing';
</script>

<Hero>
    <a href="/products" use:link class="btn btn-primary btn-hero">shop now</a>
</Hero>
<Featured title="featured products" />
