<script>
    // Pages
    import Login from './pages/Login.svelte';
    import Checkout from './pages/Checkout.svelte';
    import Home from './pages/Home.svelte';
    import About from './pages/About.svelte';
    import Products from './pages/Products.svelte';
    import ProductTemplate from './pages/ProductTemplate.svelte';

    // Router
    import { Router, Route, Link } from 'svelte-routing';

    // Components
    import Navbar from './components/Navbar/Navbar.svelte';
</script>

<Router>
    <Navbar />
    <div>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductTemplate} />
    </div>
</Router>
