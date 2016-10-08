//引入child_process模块，实现简单而又实用的非阻塞操作exec()
var exec = require("child_process").exec;

function start(response){
    console.log("Request handler 'start' was called." );

    //windows下使用dir
    exec("dir", function(error, stdout, stderr){
        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write(stdout);
        response.end();
    });
}
function upload(response){
    console.log("Request handler 'upload' was called." );
    response.writeHead(200,{"Content-Type" : "text/plain"});
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;
