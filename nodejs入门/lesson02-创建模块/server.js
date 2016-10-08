//请求(require)Node.js自带的http模块，并将其赋值给http变量
var http = require("http");


function start(){
    function onRequest(request, response){
        console.log("Request received");
        response.writeHead(200, {"Content-Type" : "text/plain"});       //发送一个HTTP状态200和HTTP头的内容类型
        response.write("Hello World");      //在http响应主体中发送文本"Hello World".
        response.end();         //完成响应
    }

    //使用http模块提供的函数：createServer()。这个函数会返回一个对象，这个对象有一个角listen的方法，listen方法有一个数值参数，指定这个http服务器监听的端口号是8000
    //createServer()的唯一参数是一个回调函数。回调函数有两个参数：request对象和response对象
    http.createServer(onRequest).listen(8000);
    console.log("Server has started");
}

//导出start函数
exports.start = start;
//创建模块