(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('TenantIotDetailController', TenantIotDetailController);

    TenantIotDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Tenant', 'Workgroup'];

    function TenantIotDetailController($scope, $rootScope, $stateParams, previousState, entity, Tenant, Workgroup) {
        var vm = this;

        vm.tenant = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gatewayApp:tenantUpdate', function(event, result) {
            vm.tenant = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
