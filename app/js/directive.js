const directives = angular.module('directives',[]);

directives.directive('afterRepeat',['$timeout',function ($timeout) {
    return function (scope,elem,attrs) {
        if(scope.$last){
            if(attrs['afterRepeat']){
                scope.$eval(attrs['afterRepeat'])
            }
        }
    }
}]);


