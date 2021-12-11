/*//获取内网ip
var ipList;
var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
if (RTCPeerConnection)(
  function () {
    var rtc = new RTCPeerConnection({
      iceServers: []
    });
    if (1 || window.mozRTCPeerConnection) {
      rtc.createDataChannel('', {
        reliable: false
      });
    };

    rtc.onicecandidate = function (evt) {
      if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
    };
    rtc.createOffer(function (offerDesc) {
      grepSDP(offerDesc.sdp);
      rtc.setLocalDescription(offerDesc);
    }, function (e) {
      console.warn("offer failed", e);
    });
    var addrs = Object.create(null);
    addrs["0.0.0.0"] = false;

    function updateDisplay(newAddr) {
      if (newAddr in addrs) return;
      else addrs[newAddr] = true;
      var displayAddrs = Object.keys(addrs).filter(function (k) {
        return addrs[k];
      });
      for (var i = 0; i < displayAddrs.length; i++) {
        if (displayAddrs[i].length > 16) {
          displayAddrs.splice(i, 1);
          i--;
        }
      }
      //打印出该设备连接的所有内网ip
      console.log(displayAddrs);
      //排第一个ip
      console.log(displayAddrs[0]);
      ipList = displayAddrs;
    }

    function grepSDP(sdp) {
      var hosts = [];
      sdp.split('\r\n').forEach(function (line, index, arr) {
        if (~line.indexOf("a=candidate")) {
          var parts = line.split(' '),
            addr = parts[4],
            type = parts[7];
          if (type === 'host') updateDisplay(addr);
        } else if (~line.indexOf("c=")) {
          var parts = line.split(' '),
            addr = parts[2];
          updateDisplay(addr);
        }
      });
    }
  })();
else {
  console.log("请使用主流浏览器：chrome,firefox,opera,safari");
}

var i = 0;
var index = "http://" + ipList[++i] + ":8080/typecho";
console.log(index);*/
var index = "http://localhost:8081/typecho";

// 加载 JS
$.ajax({
  url: index + '/usr/autoload/live2d/js/waifu-tips.js',
  dataType: "script",
  cache: false,
  async: false/*,
  success: function (data) {
    console.log("load waifu-tips.js success!");
  }
  error: function (data) {
    console.log("load waifu-tips.js error!");
  }*/
});
$.ajax({
  url: index + '/usr/autoload/live2d/js/live2d.js',
  dataType: "script",
  cache: false,
  async: false
});
$.ajax({
  url: index + '/usr/autoload/live2d/js/Snow.js',
  dataType: "script",
  cache: false,
  async: false
});
$.ajax({
  url: index + '/usr/autoload/live2d/js/typography.min.js',
  dataType: "script",
  cache: false,
  async: false
});

// 加载 CSS
$("<link>").attr({
  href: index + "/usr/autoload/live2d/css/waifu.css",
  rel: "stylesheet",
  type: "text/css"
}).appendTo('head');
$("<link>").attr({
  href: index + "/usr/autoload/live2d/css/Snow.css",
  rel: "stylesheet",
  type: "text/css"
}).appendTo('head');

// 插入 DIV
$('body').append('<canvas id="Snow"></canvas><div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');

// 初始化看板娘，加载 waifu-tips.json

/* 可直接修改部分参数 */
live2d_settings['modelId'] = 5; // 默认模型 ID
live2d_settings['modelTexturesId'] = 1; // 默认材质 ID
/* 在 initModel 前添加 */
initModel(index + '/usr/autoload/live2d/js/waifu-tips.json');