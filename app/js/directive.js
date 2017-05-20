const directives = angular.module('directives',[])
    directives.directive('caseVideo',['$interval',function ($interval) {
        return {
            restrict:'AE',
            replace:true,
            transclude:false,
            templateUrl:'',
            scope:{
                url:'=',
                loop:'=',
                autoplay:'=',
                poster:'=',
                preload:'='
            },
            link:function (scope, element, attrs, controller, transcludeFn) {

            }
        }
    }])
.directive('videoPlay',function () {
    return {
        restrict:'AE',
        replace:true,
        template:'<div class="video-play">play</div>',
        scope:{
            state:'=',
            play:'&',
            stop:'&'
        },
        link:function (scope, elem, attrs, controller) {
            elem.on('click',function () {
                state === 'paused'? play() : stop();
            })
        }

    }
})





directives.directive('afterRepeat',['$timeout',function ($timeout) {
    return function (scope,elem,attrs) {
        if(scope.$last){
            if(attrs['afterRepeat']){
                scope.$eval(attrs['afterRepeat'])
            }
        }
    }
}]);


directives.directive('')

