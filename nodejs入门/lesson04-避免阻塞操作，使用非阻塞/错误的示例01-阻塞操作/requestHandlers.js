
//当函数start()被调用的时候，Node.js会先等待10秒，之后才会返回“Hello Start”。当调用upload()的时候，会和此前一样立即返回。
function start(){
    console.log("Request handler 'start' was called." );
    function sleep(milliSeconds){
        var startTime = new Date().getTime();
        while(new Date().getTime() < startTime + milliSeconds);
    }
    sleep(10000);   //模拟休眠10秒
    return "Hello Start";
}
function upload(){
    console.log("Request handler 'upload' was called." );
    return "Hello World";
}

exports.start = start;
exports.upload = upload;


//问题：
//首先，打开两个浏览器窗口或者标签页。在第一个浏览器窗口的地址栏中输入http://localhost:8888/start， 但是先不要打开它！
// 在第二个浏览器窗口的地址栏中输入http://localhost:8888/upload， 同样的，先不要打开它！
// 接下来，做如下操作：在第一个窗口中（“/start”）按下回车，然后快速切换到第二个窗口中（“/upload”）按下回车。
// 注意，发生了什么： /start URL加载花了10秒，这和我们预期的一样。但是，/upload URL居然也花了10秒，而它在对应的请求处理程序中并没有类似于sleep()这样的操作！
// 这到底是为什么呢？原因就是start()包含了阻塞操作。形象的说就是“它阻塞了所有其他的处理工作”。
//原因： Node.js是单线程的，可以再不新增额外线程的情况下，依然对任务进行并行处理。通过事件轮询来实现并行操作----因此，要充分利用这一点，尽可能避免阻塞操作，取而代之，多使用非阻塞操作