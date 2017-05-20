// var app = angular.module('app',[])
angular.module('app',[])
    .controller('tab12',['$scope',function ($scope) {
    $scope.title = 'tab12';
    $scope.ballOnOff = 'start';
    console.log('tab12,title');
    document.getElementsByClassName('start')[0].addEventListener('click',function () {
        console.log('click start');
        var target = document.getElementsByClassName('red')[0];
        target.style.animationPlayState = target.style.animationPlayState === 'paused'?'running':'paused'
    })
}])