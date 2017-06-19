angular.module('app',[])
.controller('pageData',['$scope','dealData',function ($scope,dealData) {
    $scope.dealData = dealData.savedData;
    $scope.tHead = dealData.tHead;
}])
.controller('dataChartCtrl',['$scope','dealData',function ($scope, dealData) {
    console.log('dataChartpage');

    let myChart = echarts.init(document.getElementById('main'));
    console.log('data',dealData.savedData);
    let xData = function () {
        let out = [];
        for(let i =0; i<dealData.savedData.length;i++){
            out.push(dealData.savedData[i].title.slice(0,10))
        }
        return out;
    };
    let yData = function () {
        let out = [];
        for(let i =0; i<dealData.savedData.length;i++){
            out.push(Number(dealData.savedData[i].count))
        }
        return out;
    };

    // 指定图表的配置项和数据
    let option = {
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
        yAxis: {
            // data:yData()
        },
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