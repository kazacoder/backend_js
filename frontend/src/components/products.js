export class Products {
    constructor() {
        this.productsElement = document.getElementById('products');

        this.getProducts()
            .then((products) => this.fillProducts(products));

    }

    async getProducts() {
        const response = await fetch('http://localhost:3000/api/products');
        return await response.json();
    }

    fillProducts(products) {
        if (products && products.length > 0) {
            products.forEach(product => {
                const productElement  = document.createElement('div');
                productElement.classList.add('product');

                const titleElement = document.createElement('div');
                titleElement.classList.add('title');
                titleElement.innerText = product.title;

                const descriptionElement = document.createElement('div');
                descriptionElement.classList.add('description');
                descriptionElement.innerText = product.description;

                const priceElement = document.createElement('div');
                priceElement.classList.add('price');
                priceElement.innerText = `${product.price} $`;

                productElement.appendChild(titleElement);
                productElement.appendChild(descriptionElement);
                productElement.appendChild(priceElement);

                this.productsElement.appendChild(productElement);

            })
        }
    }
}