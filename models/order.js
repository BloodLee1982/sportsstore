/**
 * Created by Administrator on 2015/9/28 0028.
 */
var mongodb = require('./db');

function Order(order) {
    this.name = order.name;
    this.street = order.street;
    this.city = order.city;
    this.state = order.state;
    this.zip = order.zip;
    this.giftwrap = order.giftwrap;
    this.products = order.products;
}

module.exports = Order;

Order.prototype.save = function(callback) {

    var order = {
        name: this.name,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        giftwrap: this.giftwrap,
        products: this.products
    }

    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }

        db.collection('orders', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }

            collection.insert(order, {
                safe: true
            }, function(err, docs) {
                mongodb.close();
                if(err) {
                    return callback(err);//失败！返回 err
                }
                callback(err, docs);//返回 err 为 null
            });
        });
    });

};

Order.getAll = function(callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('orders', function(err, collection) {
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
};