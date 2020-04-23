export default async () => {
    const response = await fetch(`${process.env.API_URL}/products`).catch(err =>
        console.log(err),
    );
    const products = await response.json();
    if (products.error) {
        return null;
    }
    return products;
};
