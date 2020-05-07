import { writable, derived } from 'svelte/store';
import getProducts from '../strapi/getProducts';

const store = writable([], () => {
    setProducts();
    return () => {};
});

async function setProducts() {
    let products = await getProducts();
    if (products) {
        products = flattenProducts(products);
        store.set(products);
    }
}

function flattenProducts(data) {
    return data.map(item => {
        let image = item.image[0].url;
        return { ...item, image };
    });
}
export const featuredStore = derived(store, $store => {
    return $store.filter(item => item.featured);
});

export default store;
