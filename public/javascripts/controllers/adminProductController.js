/**
 * Created by Administrator on 2015/9/29 0029.
 */
angular.module('sportsStoreAdmin')
.constant('productUrl', 'http://192.168.0.168:3000/products/')
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
.controller('productCtrl', function($scope, $resource, productUrl) {

    $scope.productsResource = $resource(productUrl + ':_id', { _id: '@_id' });
        
    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    }

    $scope.deleteProduct = function(product) {
        product.$delete().then(function() {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
    }

    $scope.createProduct = function(product) {
        new $scope.productsResource(product).$save().then(function(newProduct) {
            $scope.products.push(newProduct);
            $scope.editedProduct = null;
        });
    }

    $scope.updateProduct = function(product) {
        product.$save();
        $scope.editedProduct = null;
    }

    $scope.startEdit = function(product) {
        $scope.editedProduct = product;
    }

    $scope.cancelEdit = function() {
        $scope.editedProduct = null;
    }

    $scope.listProducts();
});