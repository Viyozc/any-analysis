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
    }).state('pageAnalysis', {
        url: '/pageAnalysis',
        controller:'pageAnalysis',
        templateUrl:'views/pageAnalysis.html',
        resolve:{
            dep:['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/pageAnalysis.js']);
            }]
        }
    }).state('pageData',{
        url:'/pageData',
        controller:'pageData',
        templateUrl:'views/pageData.html',
        resolve:{
            dep:['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/pageData.js'])
            }]
        }
    }).state('dataChart',{
        url:'/dataChart',
        controller:'dataChartCtrl',
        templateUrl:'views/dataChart.html',
        // resolve:{
        //     dep:['$ocLazyLoad',function ($ocLazyLoad) {
        //         return $ocLazyLoad.load(['js/controller/pageData.js'])
        //     }]
        // }
    })
    $urlRouterProvider.otherwise('/pageAnalysis');
}]);

