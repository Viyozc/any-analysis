/**
 * Created by hlkjsen on 2017/4/26.
 */
angular.module('app',[])
.controller('tab1',['$scope','dealData',function ($scope,dealData) {
    var total = 0;
    var http = require('http');
    var fs = require('fs');
    var cheerio = require('cheerio');
    var request = require('request');


    $scope.anSite = 'http://www.hangge.com/blog/cache/detail_1188.html';
    $scope.nextBase = 'http://www.hangge.com/blog/cache/';
    $scope.nextSel = '.pre_next_article .a_underline';
    $scope.singleOut = true;
    $scope.anItem = [
        {anName:'title',anSelection:'div.leftWrap h1.article_title',anType:'s'},
        {anName:'name',anSelection:'.article_meta.article_meta_nowrap span.lFloat',anType:'s'}
    ]

    $scope.addMore = function () {
        $scope.anItem.push({anName:'',anSelection:'',anType:'s'})
    };

    $scope.start = function(){
        // alert($scope.anItem);

        console.log($scope.anItem);
        $scope.fetchPage($scope.anSite);
        $scope._state.go('')
    }



    //=========================================//

        //"http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";
//初始url

    var result = [];
    $scope.fetchPage = function(url) { //封装了一层函数

        startRequest(url);

    }


    function startRequest(url) {

        //采用http模块向服务器发起一次get请求
        http.get(url, function (res) {
            var html = '';        //用来存储请求网页的整个html内容
            res.setEncoding('utf-8'); //防止中文乱码
            //监听data事件，每次取一块数据
            console.log('start req');
            res.on('data', function (chunk) {
                html += chunk;
                // console.log(html)
            });
            //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
            res.on('end', function () {
                total++;
                var $ = cheerio.load(html); //采用cheerio模块解析html
                var out = {};
                var target = '';
                console.log('out',out);
                for(let i=0;i<$scope.anItem.length;i++){
                    if($($scope.anItem[i].anSelection)){
                         target = $($scope.anItem[i].anSelection).length =1?
                            $($scope.anItem[i].anSelection).text().trim() :
                            $($scope.anItem[i].anSelection)[0].text().trim();

                    }else{
                        target = '';
                    }

                    if($scope.anItem[i].anType === 'n'){
                        target = target.replace(/\D/ig,'')
                    }

                    out[$scope.anItem[i].anName] = target || '';
                }

                result.push(out);

                    // console.log($($scope.nextSel).length);
                if($scope.singleOut === true){
                    var next = $($scope.nextSel).length = 1 ?
                        $scope.nextBase + $($scope.nextSel).attr('href') :
                        $scope.nextBase + $($scope.nextSel)[0].attr('href');
                    // console.log('next page',next);
                    if (total <= 20) {
                        $scope.fetchPage(next);
                    }else{
                        dealData.savedData = result;
                        console.log(result)
                    }
                }else{
                    if($($scope.nextSel).length <= 1){
                        alert('next Set error');
                        return;
                    }
                    for(let i =0; i<$($scope.nextSel).length; i++){
                        var next = $scope.nextBase + $($scope.nextSel)[i].attr('href');
                        // console.log('next page',next);
                        if (total <= 20) {
                            $scope.fetchPage(next);
                        }else{
                            dealData.savedData = result;
                            console.log(result)
                        }
                    }
                    var next = $scope.nextBase + $($scope.nextSel).attr('href');
                }
            });
        }).on('error', function (err) {
            console.log(err);
        });

    }
//该函数的作用：在本地存储所爬取的新闻内容资源
//     function savedContent($, news_title) {
//         $('.article-content p').each(function (index, item) {
//             var content = $(this).text();
//
//             var y = content.substring(0, 2).trim();
//
//             if (y == '') {
//                 content = content + '\n';
//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
//                 fs.appendFile('./data/' + news_title + '.txt', content, 'utf-8', function (err) {
//                     if (err) {
//                         console.log(err);
//                     }
//                 });
//             }
//         })
//     }
//     //该函数的作用：在本地存储所爬取到的图片资源
//     function savedImg($,news_title) {
//         $('.article-content img').each(function (index, item) {
//             var img_title = $(this).parent().next().text().trim();  //获取图片的标题
//             if(img_title.length>35||img_title==""){
//                 img_title="Null";}
//             var img_filename = img_title + '.jpg';
//
//             var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url
//
//             //采用request模块，向服务器发起一次请求，获取图片资源
//             request.head(img_src,function(err,res,body){
//                 if(err){
//                     console.log(err);
//                 }
//             });
//             request(img_src).pipe(fs.createWriteStream('./img/'+news_title + '---' + img_filename)).on('error',function (err) {
//                 console.log('err')
//             });     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
//         })
//     }
//     fetchPage(url);      //主程序开始运行

}]);