const ProductModel = require("../models/product");

class ProductController {
    static async getProducts(req, res) {
        const products = await ProductModel.findAll()
        res.send(products)
    }
}

module.exports = ProductController;