angular.module('app',[])
.controller('tab2',['$scope','dealData',function ($scope,dealData) {
    $scope.dealData = dealData.savedData;
    $scope.tHead = dealData.tHead;
}])
.controller('tab3',['$scope','dealData',function ($scope, dealData) {

}])