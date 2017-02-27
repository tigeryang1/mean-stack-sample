(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($window,UserService) {
        var vm = this;
        vm.user=null;
        vm.users = null;
        vm.editUser = editUser;
        vm.addUser = addUser;
       initController();

        function initController() {
            // get current user
            UserService.GetAll().then(function (users) {
                vm.users = users;
            });
        }

        function editUser(id) {
            // get current user
            UserService.GetById(id).then(function (user) {
                vm.user = user;
            UserService.SetCurrent(user);
                $window.location = '/app/#/account';
            });
        }

        function addUser() {
                $window.location = '/app/#/account';
        }
    }

})();