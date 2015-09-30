var mongodb = require('./db');

function Product(products) {
    this.category = products.category;
    this.description = products.description;
    this.name = products.name;
    this.price = products.price;
};

module.exports = Product;

Product.prototype.save = function(callback) {
    //要存入数据库的文档
    var product = {
        category: this.category,
        description: this.description,
        name: this.name,
        price: this.price
    };

    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('products', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);// 错误： 返回错误信息
            }
            // 将用户数据插入 product 集合
            collection.insert(product, {
                safe: true
            }, function(err, product) {
                mongodb.close();
                if(err) {
                    return callback(err);// 错误： 返回错误信息
                }
                callback(null);//成功！err 为 null，并返回存储后的用户文档
            });
        });
    });
};

Product.remove = function(callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
    });
}

Product.getAll = function(callback) {
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