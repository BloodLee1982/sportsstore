var mongodb = require('./db');

function Products(products) {
    this.category = products.category;
    this.description = products.description;
    this.name = products.name;
    this.price = products.price;
};

module.exports = Products;

Products.getAll = function(callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('products', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.find().toArray(function(err, docs) {
                mongodb.close();
                if(err) {
                    return callback(err);// 失败！返回 err
                }
                callback(null, docs);
            });
        });
    });
}