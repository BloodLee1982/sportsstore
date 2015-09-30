/**
 * Created by Administrator on 2015/9/28 0028.
 */
angular.module('sportsStoreAdmin')
.constant('authUrl', 'http://192.168.0.168:3000/users/login')
.constant('ordersUrl', 'http://192.168.0.168:3000/orders')
.controller('authCtrl', function($scope, $http, $location, authUrl) {

    $scope.authenticate = function(user, pass) {
        $http.post(authUrl, {
            username: user,
            password: pass
        }, {withCredentials: true}).success(function(data) {
            if(data) {
                $location.path('/main');
            } else {

            }
        }).error(function(error) {
            $scope.authenticationError = error;
        });
    }
})
.controller('mainCtrl', function($scope) {

    $scope.screens = ['Products', 'Orders'];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function(index) {
        $scope.current = $scope.screens[index];
    };

    $scope.getScreen = function() {
        return $scope.current == 'Products' ? '/views/adminProducts.html' : '/views/adminOrders.html';
    };
})
.controller('ordersCtrl', function($scope, $http, ordersUrl) {

    $http.get(ordersUrl, {withCredentials : true}).success(function(data) {
        $scope.orders = data;
    }).error(function(error) {
        $scope.error = error;
    });

    $scope.selectedOrder;

    $scope.selectOrder = function(order) {
        $scope.selectedOrder = order;
    }

    $scope.calcTotal = function(order) {
        var total = 0;
        for(var i = 0, j = order.products.length; i < j; i++) {
            total += order.products[i].count * order.products[i].price;
        }
        return total;
    }
});