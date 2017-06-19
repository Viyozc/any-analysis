/**
 * Created by allen on 2017/4/25.
 */
var app = angular.module('app',['routes','services']);

app.config(['$ocLazyLoadProvider', '$compileProvider', function($ocLazyLoadProvider, $compileProvider) {
    // 解决 nw 中 图片无法正常显示问题
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file:chrome-extension):/);

}]);
app.run(['$rootScope','$state',function ($rootScope,$state) {
    $rootScope._state = $state;
}]);