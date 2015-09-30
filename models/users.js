/**
 * Created by Administrator on 2015/9/29 0029.
 */
var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
};

module.exports = User;

//读取用户信息
User.get = function(username, password, callback) {
    //打开数据库
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);// 错误： 返回错误信息
        }
        //读取 users 集合
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);// 错误： 返回错误信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.findOne({
                username: username,
                password: password
            }, function(err, user) {
                mongodb.close();
                if(err) {
                    return callback(err);// 错误： 返回错误信息
                }
                callback(null, user);// 成功！返回查询的用户信息
            });
        });
    });
};