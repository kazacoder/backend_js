import {UrlManager} from "../utils/url-manager.js";

export class Product {
    constructor() {
        this.productElement = document.getElementById('product');

        this.id = UrlManager.geqQueryParams()['id'];

        this.getProduct(this.id)
            .then(product => this.fillProduct(product));

    }

    async getProduct(id) {
        const response = await fetch('http://localhost:3000/api/products/' + id);
        return await response.json();
    }

    fillProduct(product) {
        if (product) {

            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.innerText = product.title;

            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('description');
            descriptionElement.innerText = product.description;

            const priceElement = document.createElement('div');
            priceElement.classList.add('price');
            priceElement.innerText = `${product.price} $`;

            this.productElement.appendChild(titleElement);
            this.productElement.appendChild(descriptionElement);
            this.productElement.appendChild(priceElement);

        }
    }
}