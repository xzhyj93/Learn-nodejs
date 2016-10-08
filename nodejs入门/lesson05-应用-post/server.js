var http = require("http");
var url = require("url");


function start(route, handle){
    function onRequest(request, response){
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for "+pathname + " received.");

        //设置接收数据的编码格式为utf-8
        request.setEncoding("utf8");

        //注册data事件监听器，用于收集每次接收到的新数据块，并将其赋值给postData变量
        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'." );
        });

        //将请求路由的调用移到end事件处理程序中，确保只会当所有数据接收完毕后才触发，且只触发一次
        request.addListener("end", function(){
            route(handle, pathname, response, postData);
        });

    }

    http.createServer(onRequest).listen(8000);
    console.log("Server has started");
}

exports.start = start;
