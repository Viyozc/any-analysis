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
    }).state('app.tab1', {
        url: '/tab1',
        controller:'tab1',
        views: {
            'one': {
                templateUrl: 'views/tab1.html',
                controller: ''
            }
        },
        resolve:{
            dep:['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/tab1.js']);
            }]
        }
    }).state('app.tab1.tab11', {
        url: '/tab11',
        templateUrl: 'views/tab11.html',
        resolve: {
            // dep: ['$ocLazyLoad', function ($ocLazyLoad) {
            //     return $ocLazyLoad.load([''])
            // }]
        }
    }).state('app.tab1.tab12', {
        url: '/tab12',
        templateUrl: 'views/tab12.html',
        controller:'tab12',
        resolve:{
            dep: ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controller/tab12.js'])
            }]
        }
    })
    $urlRouterProvider.otherwise('/app');
}]);

