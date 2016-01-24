/*
An Angular Controller allows us to interact with a View and Model, it's the place where presentational logic can take place to keep the UI bindings in sync with the Model.
A Controller's purpose is to drive Model and View changes, in Angular it's a meeting place between our business logic and our presentational logic.
*/
function MainCtrl (UserService, UserServiceFactory) {
    //Use scopes to transfer data from a service which talks to server and pass it to our view
    //using new controllerAs syntax (instead of $scope)

    //this value may change depending how we use it due to the function's execution context
    //vm stands for viewModel (which the controller usually is)
    var vm = this;
    vm.response = 'success';
    vm.someValue = 'MainCtrl Scope';
    vm.userExists = true
    vm.items = [{
        name: 'Scuba Diving Kit (click to remove)',
        id: 7297510
    },{
        name: 'Snorkel',
        id: 0278916
    },{
        name: 'Wet Suit',
        id: 2389017
    },{
        name: 'Beach Towel',
        id: 1000983
    }];

    //function for onClick
    vm.removeFromStock = function (item, index) {
        //want to make a DELETE request to backend, then on success remove from items array
        //this way we only update the DOM upon true Model update.
        vm.items.splice(index, 1); //at index remove 1
    };

    //function for text Field
    vm.showMessage = function(message) {
        vm.resultMessage = message;
    }

    //inject service into a Controller
    vm.sayHello = function (name) {
        UserService.sayHello(name);
    };
    vm.sayHelloFactory = function (name) {
        UserServiceFactory.sayHello(name);
    };
    //alert(UserService.sayHello("Service"));
    //alert(UserServiceFactory.sayHello("Factory"))
}

    /*
    this could talk to a backend or provide utilities to handle business logic
    */
function UserService () {
    //service creates a singleton Object created by a service factor
    this.sayHello = function (name) {
        return 'Hello there ' + name;
    };
}

/*
  Services are generally used for business logic layer
  eg communicating with a backend via REST endpoints  over Ajax (HTTP)
*/
function UserServiceFactory () {
    var UserServiceFactory = {};
    function greeting (name) {
        return 'Hello there ' + name;
    }
    UserServiceFactory.sayHello = function (name) {
        return greeting(name);
    };
    //Factory methods return an Object or a Function
    return UserServiceFactory;
}

angular
    .module('app', [])
    .controller('MainCtrl', MainCtrl)
    .service('UserService', UserService)
    .factory('UserServiceFactory', UserServiceFactory);

//$rootScope.someValue = 'Root Scope';
