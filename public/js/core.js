/**
 * Created by harshssd on 10/10/14.
 */
'use strict';

var groupExpenses = angular.module('sharedExpenses', [
    'ngRoute',
    'groupController',
    'groupService'
]);
    
groupExpenses.config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl : 'views/create-group.html',
                controller : 'groupController'
            })
            .when('/signin', {
                templateUrl : 'views/enter-group.html',
                controller : 'groupController'
            });
    });