(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Tenant', Tenant);

    Tenant.$inject = ['$resource'];

    function Tenant ($resource) {
        var resourceUrl =  'config/' + 'api/tenants/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
