/**
 * Created by harshssd on 10/10/14.
 */
'use strict';

angular.module('groupService', [])
    
    .factory('Group', function($http){
        return {
            create: function(groupData) {
                groupData.admin.admin = true;
                return $http.post('/api/groups', groupData);   
            }
        }    
    });