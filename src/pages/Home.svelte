<script>
    import Hero from '../components/Hero.svelte';
    import { link } from 'svelte-routing';
</script>

<Hero>
  <a href="/products" use:link class="btn btn-primary btn-hero">shop now</a>
</Hero>
