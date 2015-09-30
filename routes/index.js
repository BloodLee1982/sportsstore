var Products = require('../models/products.js'),
    Order = require('../models/order.js'),
    Users = require('../models/users.js');

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
            res.json(products);
        });
    });

    app.post('/orders', function(req, res) {
        var newOrder = new Order(req.body);

        newOrder.save(function(err, order) {
            if(err) {
                order = [];
                console.log(err);
            }
            res.json(order);
        });
    });

    app.get('/orders', function(req, res) {
        Order.getAll(function(err, orders) {
            res.json(orders);
        })
    });

    app.post('/users/login', function (req, res) {
        Users.get(req.body.username, req.body.password, function(err, user) {
            if(user != null) {
                res.json(true);
            } else {
                res.json(false);
            }
        });

    });


};
