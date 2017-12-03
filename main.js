var ws = require('nodejs-websocket');
var connArray = [];

var server = ws.createServer(function (conn) {
  conn.on("text", function (str) {
    console.log("收到的信息为:"+str)
    if (str === 'apply-*-connect') {
      conn.sendText("apply-*-success");
      connArray.push(conn);
    } else {
      for (let i = 0; i < connArray.length; i++) {
        let connObj = connArray[i];
        if (connObj.readyState) {
          connObj.sendText(str);
        } else {
          connArray.splice(i, 1);
          i--;
        }
      }
    }
  })

  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
});

server.listen(3200);