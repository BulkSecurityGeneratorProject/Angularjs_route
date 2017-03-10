(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('TenantIotDialogController', TenantIotDialogController);

    TenantIotDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Tenant', 'Workgroup'];

    function TenantIotDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Tenant, Workgroup) {
        var vm = this;

        vm.tenant = entity;
        vm.clear = clear;
        vm.save = save;
        vm.workgroups = Workgroup.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.tenant.id !== null) {
                Tenant.update(vm.tenant, onSaveSuccess, onSaveError);
            } else {
                Tenant.save(vm.tenant, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gatewayApp:tenantUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
