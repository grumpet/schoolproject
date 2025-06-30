const Product = require('../models/products');

exports.saveProduct = (req, res, next) => {
    const { productName, productCode, ProductPrice } = req.body;
    
    const product = new Product(productName, productCode, ProductPrice);
    
    product.save()
        .then(() => {
            console.log('Product saved successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error saving product:', err);
            res.redirect('/');
        });
};
