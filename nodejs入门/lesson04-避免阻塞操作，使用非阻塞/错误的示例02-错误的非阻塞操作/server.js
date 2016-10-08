//////////////////////////////////////////////////////////////////
//                                url.parse(string).query       //
//                                            |                 //
//            url.parse(string).pathname      |                 //
//                        |                   |                 //
//                        |                   |                 //
//                      ------ -------------------              //
// http://localhost:8888/start?foo=bar&hello=world              //
//                                 ---       -----              //
//                                  |          |                //
//                                  |          |                //
//               querystring(string)["foo"]    |                //
//                                             |                //
//                          querystring(string)["hello"]        //
//////////////////////////////////////////////////////////////////

//我们需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的Node.JS模块，它们分别是url和querystring模块。

var http = require("http");
var url = require("url");

function start(route, handle){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for "+pathname + " received.");

        var content = route(handle, pathname);
        console.log(content);
        response.writeHead(200, {"Content-Type" : "text/plain"});      
        response.write(content);
        response.end();
    }

    http.createServer(onRequest).listen(8000);
    console.log("Server has started");
}

//导出start函数
exports.start = start;
//创建模块