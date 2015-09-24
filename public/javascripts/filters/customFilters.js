/**
 * Created by Administrator on 2015/9/23 0023.
 */
angular.module('customFilters', []).filter('unique', function() {
    return function(data, propertyName) {
        if(angular.isArray(data) && angular.isString(propertyName)) {
            var results = [];
            var keys = {};
            for(var i = 0, j = data.length; i < j; i++) {
                var val = data[i][propertyName];
                if(angular.isUndefined(keys[val])) {
                    keys[val] = true;
                    results.push(val);
                }
            }
            return results;
        } else {
            return data;
        }
    }
}).filter('range', function($filter) {
    return function(data, page, size) {
        if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
            var start_index = (page - 1) * size;
            if(data.length < start_index) {
                return [];
            } else {
                return $filter('limitTo')(data.splice(start_index), size);
            }
        } else {
            return data;
        }
    }
}).filter('pageCount', function() {
    return  function(data, size) {
        if(angular.isArray(data)) {
            var result = [];
            for(var i = 0, j = Math.ceil(data.length / size); i < j; i++) {
                result.push(i);
            }
            return result;
        } else {
            return data;
        }
    }
});