/**
 * Created by Administrator on 2015/9/25 0025.
 */
angular.module('sportsStore').controller('cartSummaryController', function($scope, cart) {

    $scope.cartData = cart.getProducts();

    $scope.total = function() {
        var total = 0;
        for(var i = 0, j = $scope.cartData.length; i < j; i++) {
            total += ($scope.cartData[i].price * $scope.cartData[i].count);
        }
        return total;
    }

    $scope.remove = function(id) {
        cart.removeProduct(id);
    }

});