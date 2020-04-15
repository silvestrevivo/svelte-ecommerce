<script>
    import CartButton from '../Cart/CartButton.svelte';
    import { link } from 'svelte-routing';
    import links from '../../constants/links';
</script>

<nav class="navbar">
    <div class="nav-container">
        <div class="nav-center">
            <!-- nav links -->
            <ul class="nav-links">
                {#each links as { text, url }}
                    <li>
                        <a href={url} use:link>{text}</a>
                    </li>
                {/each}
            </ul>
            <!-- nav logo -->
            <a href="/" class="nav-logo big-logo" use:link>
                <img src="/assets/images/logo.svg" alt="log" class="logo" />
            </a>
            <!-- cart toggle -->
            <div class="nav-aside">
                <CartButton />
            </div>
        </div>
    </div>
</nav>
