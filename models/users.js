/**
 * Created by Administrator on 2015/9/29 0029.
 */
var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
};

module.exports = User;

//��ȡ�û���Ϣ
User.get = function(username, password, callback) {
    //�����ݿ�
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);// ���� ���ش�����Ϣ
        }
        //��ȡ users ����
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);// ���� ���ش�����Ϣ
            }
            //�����û�����name����ֵΪ name һ���ĵ�
            collection.findOne({
                username: username,
                password: password
            }, function(err, user) {
                mongodb.close();
                if(err) {
                    return callback(err);// ���� ���ش�����Ϣ
                }
                callback(null, user);// �ɹ������ز�ѯ���û���Ϣ
            });
        });
    });
};