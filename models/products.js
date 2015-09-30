var mongodb = require('./db');

function Product(products) {
    this.category = products.category;
    this.description = products.description;
    this.name = products.name;
    this.price = products.price;
};

module.exports = Product;

Product.prototype.save = function(callback) {
    //Ҫ�������ݿ���ĵ�
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
                return callback(err);// ���� ���ش�����Ϣ
            }
            // ���û����ݲ��� product ����
            collection.insert(product, {
                safe: true
            }, function(err, product) {
                mongodb.close();
                if(err) {
                    return callback(err);// ���� ���ش�����Ϣ
                }
                callback(null);//�ɹ���err Ϊ null�������ش洢����û��ĵ�
            });
        });
    });
};

Product.remove = function(callback) {
    //�����ݿ�
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
    });
}

Product.getAll = function(callback) {
    //�����ݿ�
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
                    return callback(err);// ʧ�ܣ����� err
                }
                callback(null, docs);
            });
        });
    });
}