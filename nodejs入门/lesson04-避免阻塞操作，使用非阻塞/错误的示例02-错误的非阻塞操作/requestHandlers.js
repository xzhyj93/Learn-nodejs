//引入child_process模块，实现简单而又实用的非阻塞操作exec()
var exec = require("child_process").exec;

function start(){
    console.log("Request handler 'start' was called." );
    var content = "empty";

    //执行一个shell命令，获取当前目录下所有的文件。然后当/startURL请求时将文件信息输出到浏览器
    //然而输出是empty why?
    ////exec使用了阻塞的方法，而代码是同步执行的，则在调用exec()之后，Nodejs会立即执行return content；这时content仍是“empty”
    exec("ls -lah", function(error, stdout, stderr){
        content = stdout;
    });
    return content;
}
function upload(){
    console.log("Request handler 'upload' was called." );
    return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
