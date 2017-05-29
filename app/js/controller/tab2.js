angular.module('app',[])
.controller('tab2',['$scope','dealData',function ($scope,dealData) {
    $scope.dealData = dealData.savedData;
    $scope.tHead = dealData.tHead;
}])
.controller('dataChartCtrl',['$scope','dealData',function ($scope, dealData) {
    console.log('dataChartpage');

    var myChart = echarts.init(document.getElementById('main'));

    var xData = function () {
        var out = [];
        for(let i =0; i<dealData.savedData.length;i++){
            out.push(dealData.savedData[i].title)
        }
        return out;
    };
    var yData = function () {
        var out = [];
        for(let i =0; i<dealData.savedData.length;i++){
            out.push(Number(dealData.savedData[i].name))
        }
        return out;
    };

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '文章统计'
        },
        tooltip: {},
        legend: {
            data:['标题']
        },
        xAxis: {
            data: xData()
        },
        yAxis: {},
        series: [{
            name: '阅读量',
            type: 'bar',
            data: yData()
        }]
    };
    console.log(xData());
    console.log(yData());

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}])