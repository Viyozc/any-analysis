/**
 * Created by hlkjsen on 2017/4/25.
 */
var routes = angular.module('routes', ['ui.router','oc.lazyLoad']);

routes.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $stateProvider.state('app', {
        url: '/app',
        templateUrl: 'views/app.html',
        controller: 'mainCtrl',
        resolve: {
            dep: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/mainCtrl.js'])
            }]
        }
    }).state('tab1', {
        url: '/tab1',
        controller:'tab1',
        templateUrl:'views/tab1.html',
        resolve:{
            dep:['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/tab1.js']);
            }]
        }
    }).state('tab2',{
        url:'/tab2',
        controller:'tab2',
        templateUrl:'views/tab2.html',
        resolve:{
            dep:['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/tab2.js'])
            }]
        }
    }).state('dataChart',{
        url:'/dataChart',
        controller:'dataChartCtrl',
        templateUrl:'views/dataChart.html',
        resolve:{
            dep:['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/tab2.js'])
            }]
        }
    })
    $urlRouterProvider.otherwise('/tab1');
}]);

