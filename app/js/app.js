/**
 * Created by hlkjsen on 2017/4/25.
 */
var app = angular.module('app',['routes']);

app.config(['$ocLazyLoadProvider', '$compileProvider', function($ocLazyLoadProvider, $compileProvider) {
    // 解决 nw 中 图片无法正常显示问题
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file:chrome-extension):/);

}]);
