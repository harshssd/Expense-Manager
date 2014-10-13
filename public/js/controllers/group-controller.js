/**
 * Created by harshssd on 10/10/14.
 */
'use strict';

angular.module('groupController', [])
    
    .controller('groupController', function($scope, Group, $location){
        
        $scope.createGroup = function(){
            $scope.group.admin = $scope.admin;
            Group.create($scope.group)
                .success(function(data){
                    $scope.group = {};
                    $scope.admin = {};
//                    $location.path('/api/groups/' + data._id);
                    alert('Meeting Created ' + data);
                })
                .error(function(err){
                    console.log(err);
                });
        }
        
        $scope.signin = function(){

        }
    
    });