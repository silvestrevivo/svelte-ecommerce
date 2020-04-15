import { writable } from 'svelte/store';

const globalStore = writable({
    sidebar: false,
    cart: false,
    alert: false,
});

const store = {
    subscribe: globalStore.subscribe,
    toggleItem: (item, value) => {
        globalStore.update(storeValues => ({
            ...storeValues,
            [item]: value,
        }));
    },
    // toggleCart: value => {
    //     globalStore.update(storeValues => ({
    //         ...storeValues,
    //         sidebar: !storeValues.sidebar,
    //     }));
    // },
};

export default store;
