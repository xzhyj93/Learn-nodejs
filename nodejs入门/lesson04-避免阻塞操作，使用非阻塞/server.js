var http = require("http");
var url = require("url");

function start(route, handle){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for "+pathname + " received.");

        route(handle, pathname, response);
        //移除onRequest中response函数调用，而传递给route()函数进行处理
    }

    http.createServer(onRequest).listen(8000);
    console.log("Server has started");
}

exports.start = start;
