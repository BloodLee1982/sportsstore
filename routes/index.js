var Products = require('../models/products.js');

module.exports = function (app) {

    /**
     * 进入首页
     */
    app.get('/', function (req, res) {
        res.render('app');
    });


    app.get('/angt', function (req, res) {
        res.render('todo');
    });

    app.get('/products', function (req, res) {
        Products.getAll(function(err, products) {
            if(err) {
                products = [];
            }
            res.jsonp(products);
        });
    });

};
