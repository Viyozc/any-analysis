angular.module('app',[])
.controller('mainCtrl',['$scope',function ($scope) {
    console.log('mainCtrl');
    $scope.title = 'hello';
}])