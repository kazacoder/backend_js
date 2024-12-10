const fs = require('fs');
const path = require('path');

class ProductModel {

    static path = path.join(__dirname, '../db', 'products.json')

    static async findAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        });
    }

    static async find(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const products = JSON.parse(data);
                        const product = products.find(product => parseInt(product.id) === parseInt(id));
                        if (product) {
                            resolve(product);
                        } else {
                            resolve({err: `Product with id:${id} not found`});
                        }

                    } catch (e) {
                        reject('Невозможно обработать данные' + e.message);
                    }
                }
            })
        });
    }

    static async change(id, newProduct) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const products = JSON.parse(data);
                        const productIndex = products.findIndex(product => parseInt(product.id) === parseInt(id));
                        if (productIndex > -1) {
                            products[productIndex] = newProduct;
                            const newJSON = JSON.stringify(products);
                            fs.writeFile(this.path, newJSON, 'utf-8', (err, data) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(newProduct);
                                }
                            })
                        } else {
                            resolve({err: `Product with id:${id} not found`});
                        }

                    } catch (e) {
                        reject('Невозможно обработать данные' + e.message);
                    }
                }
            })
        });
    }
    static async delete(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const products = JSON.parse(data);
                        const productIndex = products.findIndex(product => parseInt(product.id) === parseInt(id));
                        if (productIndex > -1) {
                            products.splice(productIndex, 1);
                            const newJSON = JSON.stringify(products);
                            fs.writeFile(this.path, newJSON, 'utf-8', (err, data) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            })
                        } else {
                            resolve({err: `Product with id:${id} not found`});
                        }

                    } catch (e) {
                        reject('Невозможно обработать данные' + e.message);
                    }
                }
            })
        });
    }

    static async create(newProduct) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const products = JSON.parse(data);
                        let id = Math.max(...products.map(item => parseInt(item.id))) + 1;
                        if (!id) {
                            id = 1
                        }
                        let pushingProduct = {
                            id: id,
                            title: newProduct.title,
                            description: newProduct.description,
                            price: newProduct.price,
                        };
                        products.push(pushingProduct);
                        const newJSON = JSON.stringify(products);
                        fs.writeFile(this.path, newJSON, 'utf-8', (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(pushingProduct);
                            }
                        })
                    } catch (e) {
                        reject('Невозможно обработать данные' + e.message);
                    }
                }
            })
        });
    }
}

module.exports = ProductModel;