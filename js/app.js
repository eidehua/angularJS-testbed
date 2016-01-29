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
    vm.timeNow = new Date().getTime();
    vm.jsonObj = {"HI": "there", "bye": "co"}
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

    vm.namesStartingWithB = function () {
        //this is a filter specifically for this controller
        //ex: ng-repeat="item in vm.items | filter:namesStartingWithB"
        //need that "filter:" in order for angular to recognize this function of the controller is actually a filter
    };
}
/*
 Creating our own directive (which is built in the template)
*/
function someDirective () {
    return {
        restrict: 'EA',
        replace: true,
        scope: true,
        controllerAs: 'something', //any controller references inside our template would use something.myMethod()
        controller: function() {

        },
        link: function($scope, $element, $attrs) {
            //The link function is called after the element is compiled and injected into the DOM, which means it's the perfect place to do "post-compile" logic, as well as non-Angular logic.
        },
        template: [
            '<div class="some-directive">',
                'My directive! Can use this in multiple places without having to recreate this markup',
                '</div>'
            ].join('')
    };
}
/*
 Custom directive for composing email.
*/
function composeEmail () {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    controllerAs: 'compose',
    controller: function () {
        //mess with compose.message (this.message) and stuff here
        this.to = "set in controller"
    },
    link: function ($scope, $element, $attrs) {

    },
    template: [
      '<div class="compose-email">',
        '<h2>Compose Email</h2>',
        '<input type="text" placeholder="To..." ng-model="compose.to">',
        '<input type="text" placeholder="Subject..." ng-model="compose.subject">',
        '<br>',
        '<textarea placeholder="Message..." ng-model="compose.message"></textarea>',
        '<br>',
        '{{compose.to}}',
      '</div>'
    ].join('')
    };
}

function toLowercase (){
    //we return this function closer every time angular needs to run the filter
    return function (item) {
        //angular has a make lowercase filter already, but this is easy example
        return item.toLowerCase();
    };
}

function namesStartingWithA () {
    //we are expecting (items) some kind of dictionary. So use within something like ng-repeat
    //to pass in the second argument, use something like"
    //ng-repeat="item in items | namesStartingWithA:something"
    return function (items, something) {
        return items.filter(function (item) {
            return /$a/i.test(item.name);
        });
    };
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
    .directive('someDirective', someDirective)
    .directive('composeEmail', composeEmail)
    .filter('toLowercase', toLowercase)
    .filter('namesStartingWithA', namesStartingWithA)
    .service('UserService', UserService)
    .factory('UserServiceFactory', UserServiceFactory);

//$rootScope.someValue = 'Root Scope';
template: [
  '<div>',
    '<ul>',
      '<li ng-repeat="item in vm.items">',
        '{{ item }}',
      '</li>',
    '</ul>',
  '</div>'
].join('')
