angular.module('sportsStore').constant('dataUrl', 'http://192.168.0.168:3000/products')
    .constant('orderUrl', 'http://192.168.0.168:3000/orders')
    .controller('sportStoreCtrl', function($scope, $http, $location, dataUrl, orderUrl, cart) {

    /*$scope.data = {
        products: [
            { name: 'Product #1', description: 'A product', category: 'Category #1', price: 100 },
            { name: 'Product #2', description: 'A product', category: 'Category #1', price: 110 },
            { name: 'Product #3', description: 'A product', category: 'Category #2', price: 210 },
            { name: 'Product #4', description: 'A product', category: 'Category #3', price: 202 }
        ]
    };*/

    $scope.data = {};

    $http.get(dataUrl).success(function(data) {
        $scope.data.products = data;
    }).error(function(error) {
        $scope.data.error = error;
    });

    $scope.sendOrder = function(shippingDetails) {
        var order = angular.copy(shippingDetails);
        order.products = cart.getProducts();
        $http.post(orderUrl, order).success(function(data) {
            $scope.data.orderId = data[0]._id;
            cart.getProducts().length = 0;
        }).error(function(error) {
            $scope.data.orderError = error;
        }).finally(function() {
            $location.path('/complete');
        })
    }
});
