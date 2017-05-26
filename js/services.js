'use strict';

var solleServices = angular.module('solleServices', ['ngResource']);

solleServices.factory('Cart', ['$resource', function ($resource) {
    return {
        getCart: function (token) {
            return $resource(api_endpoint + 'carts/get_cart/', {}, {
                query: {method: 'GET', params: {}, isArray: true, withCredentials: true}
            });
        }
    };
}]);
