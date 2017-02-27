(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        vm.showDelete=showDelete;
        initController();


        function initController() {
            // get current user
            vm.user=UserService.GetCurrent();

        }

        function saveUser() {
            if(vm.user._id===undefined) {
                UserService.Create(vm.user)
                    .then(function () {
                        FlashService.Success('User updated');
                        // log user out
                        $window.location = '/';
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
            } else
            {
                UserService.Update(vm.user)
                    .then(function () {
                        FlashService.Success('User updated');
                        // log user out
                        $window.location = '/';
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });

            }
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function showDelete() {
            if(vm.user===null) return false;
            else if(vm.user._id===undefined) return false;
            else return true;
                }
    }

})();