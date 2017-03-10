(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('TenantIotDeleteController',TenantIotDeleteController);

    TenantIotDeleteController.$inject = ['$uibModalInstance', 'entity', 'Tenant'];

    function TenantIotDeleteController($uibModalInstance, entity, Tenant) {
        var vm = this;

        vm.tenant = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Tenant.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
