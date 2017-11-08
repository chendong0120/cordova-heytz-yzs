# cordova-heytz-yzs
云知声cordovaPlugin

    
##install
    
    cordova plugin add https://github.com/chendong0120/cordova-heytz-yzs.git --variable APP_KEY=APP_KEY --variable APP_SECRET=APP_SECRET --variable  NSMicrophoneUsageDescription=使用麦克风 --variable NSLocationAlwaysUsageDescription=访问位置


##接口

    cordova.plugins.HeytzYzs.init(callback, errorCallback);
    cordova.plugins.HeytzYzs.speechUnderstanderListener(callback, errorCallback);
    cordova.plugins.HeytzYzs.startRecord(callback, errorCallback);
    cordova.plugins.HeytzYzs.stopRecord(callback, errorCallback);
    
    
    
    
##init 初始化


     cordova.plugins.HeytzYzs.init(function (suc) {
        console.log("ready");
      }, function (error) {
        console.log("initError");
      });
      
##speechUnderstanderListener 监听消息

    cordova.plugins.HeytzYzs.speechUnderstanderListener(function (message) {
        console.log("\n======speechUnderstanderListener:suc============\n", message);
      }, function (error) {
        console.log("\nspeechUnderstanderListener:error\n", error);
      });
      
##StartRecord 开始录音

    cordova.plugins.HeytzYzs.startRecord(callback, errorCallback);


##stopRecord 停止录音

    cordova.plugins.HeytzYzs.stopRecord(callback, errorCallback);