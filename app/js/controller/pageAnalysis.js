/**
 * Created by allen on 2017/4/26.
 */
angular.module('app', [])
    .controller('pageAnalysis', ['$scope', 'dealData', function ($scope, dealData) {
        let http    = require('http');
        let fs      = require('fs');
        let cheerio = require('cheerio');
        let request = require('request');
        let total   = 0;


        $scope.anSite = 'http://www.hangge.com/blog/cache/detail_1188.html';
        $scope.nextBase = 'http://www.hangge.com/blog/cache/';
        $scope.nextSel = '.pre_next_article .a_underline';
        $scope.isConcat = true;
        $scope.anCount = 5;
        $scope.anItem = [
            {anName: 'title', anSelection: 'div.leftWrap h1.article_title', anType: 'string'},
            {anName: 'count', anSelection: '.article_meta.article_meta_nowrap span.lFloat', anType: 'number'}
        ];

        $scope.addMore = function () {
            $scope.anItem.push({anName: '', anSelection: '', anType: 'string'})
        };

        $scope.start = function () {
            // alert($scope.anItem);
            total = 0;
            let tHead = [];
            for (let i = 0; i < $scope.anItem.length; i++) {
                tHead.push($scope.anItem[i]['anName'])
            }
            dealData.tHead = tHead;
            console.log($scope.anItem);
            $scope.fetchPage($scope.anSite);
        };

        let result = [];
        $scope.fetchPage = function (url) {
            startRequest(url);
        };

        function startRequest(url) {
            if (total >= $scope.anCount) return;

            http.get(url, function (res) {
                let html = '';
                res.setEncoding('utf-8');
                console.log('start req');
                res.on('data', function (chunk) {
                    html += chunk;
                    // console.log(html)
                });
                //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
                res.on('end', function () {

                    //采用cheerio模块解析html
                    let $ = cheerio.load(html);
                    let out = {};
                    let target = '';
                    console.log('out', out);
                    for (let i = 0; i < $scope.anItem.length; i++) {
                        if ($($scope.anItem[i].anSelection)) {
                            target = $($scope.anItem[i].anSelection).length = 1 ?
                                $($scope.anItem[i].anSelection).text().trim() :
                                $($scope.anItem[i].anSelection)[0].text().trim();
                        } else {
                            target = '';
                        }
                        console.log(target);
                        if ($scope.anItem[i].anType === 'number') {
                            target = target.replace(/\D/ig, '')
                        }
                        out[$scope.anItem[i].anName] = target || '';
                    }

                    Array.prototype.only = function(){
                        for(var i=0, temp={}, result=[], ci; ci=this[i++];){
                            var key = ci.$scope.anItem[0].anName;
                            if(temp[key]){
                                continue;
                            }
                            temp[key] = true;
                            result.push(ci);
                        }
                        return result;
                    };


                    //异步获取 数量会超出
                    if (result.length < $scope.anCount) {
                        let flag = false;
                        for(let i = 0;i <result.length ;i ++){
                            if(result[i].title == out.title){
                                flag = true;
                                return
                            }
                        }
                        if(!flag){
                            total++;
                            result.push(out);
                        }
                    }


                    fetchNext(getNextUrls($));

                    // console.log($($scope.nextSel).length);
                    // if ($scope.singleOut === true) {
                    //     let next = $($scope.nextSel).length = 1 ?
                    //         $scope.nextBase + $($scope.nextSel).attr('href') :
                    //         $scope.nextBase + $($scope.nextSel)[0].attr('href');
                    //     // console.log('next page',next);
                    //     if (total <= $scope.anCount) {
                    //         $scope.fetchPage(next);
                    //     } else {
                    //         dealData.savedData = result;
                    //         console.log(result)
                    //         $scope._state.go('tab2')
                    //     }
                    // } else {

                    // for (let i = 0; i < $($scope.nextSel).length; i++) {
                    //     let next = ($scope.nextBase || '') + $($scope.nextSel)[i].attr('href');
                    //     // console.log('next page',next);
                    //     if (total <= $scope.anCount) {
                    //         $scope.fetchPage(next);
                    //     } else {
                    //         dealData.savedData = result;
                    //         console.log(result);
                    //         $scope._state.go('tab2')
                    //     }
                    // }
                    // let next = $scope.nextBase + $($scope.nextSel).attr('href');

                });
            }).on('error', function (err) {
                console.log(err);
            });

            function getNextUrls($) {
                let out = [];
                if ($scope.isConcat) {
                    for (let i = 0; i < $($scope.nextSel).length; i++) {
                        out.push($scope.nextBase + $($scope.nextSel).attr('href'))
                    }
                    console.log('out data', out);
                } else {
                    for (let i = 0; i < $($scope.nextSel).length; i++) {
                        out.push($($scope.nextSel).attr('href'))
                    }
                    console.log('out data', out);
                }
                return out;
            }

            function fetchNext(arr) {
                for (let i = 0; i < arr.length; i++) {
                    $scope.fetchPage(arr[i]);
                    if (total >= $scope.anCount) {
                        dealData.savedData = result;
                        console.log('test',result);
                        $scope._state.go('pageData');
                        return;
                    }
                }
            }

        }

//该函数的作用：在本地存储所爬取的新闻内容资源
//     function savedContent($, news_title) {
//         $('.article-content p').each(function (index, item) {
//             let content = $(this).text();
//             let y = content.substring(0, 2).trim();
//             if (y == '') {
//                 content = content + '\n';
//  将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
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
//             let img_title = $(this).parent().next().text().trim();  //获取图片的标题
//             if(img_title.length>35||img_title==""){
//                 img_title="Null";}
//             let img_filename = img_title + '.jpg';
//
//             let img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url
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