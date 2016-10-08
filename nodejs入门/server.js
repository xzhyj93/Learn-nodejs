var http = require("http");
var url = require("url");
//首先需要npm install formidable
//var formidable = require('formidable');


function start(route, handle){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for "+pathname + " received.");
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8000);
    console.log("Server has started");
}

exports.start = start;
