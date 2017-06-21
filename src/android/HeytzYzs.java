package com.heytz.yzs;

import android.content.Context;
import android.util.Log;
import com.unisound.client.SpeechConstants;
import com.unisound.client.SpeechUnderstander;
import com.unisound.client.SpeechUnderstanderListener;
import org.apache.cordova.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


/**
 * This class echoes a string called from JavaScript.
 */
public class HeytzYzs extends CordovaPlugin {
    /**
     * 当前识别状态
     */
    enum AsrStatus {
        idle, recording, recognizing
    }

    private static final String TAG = "\n=========SmartBand=========\n";
    private static final String INIT = "init";
    private static final String START_RECORD = "startRecord";
    private static final String STOP_RECORD = "stopRecord";
    private static final String SPEECH_UNDER_STANDER_LISTENER = "speechUnderstanderListener";
    private static final String APP_ID_KEY = "yzsappkey";
    private static final String APP_SECRET_KEY = "yzsappsecret";
    private static final String arraySampleStr[] = new String[]{"RATE_AUTO  ",
            "RATE_16K  ", "RATE_8K  "};
    private static final int arraySample[] = new int[]{SpeechConstants.ASR_SAMPLING_RATE_BANDWIDTH_AUTO,
            SpeechConstants.ASR_SAMPLING_RATE_16K, SpeechConstants.ASR_SAMPLING_RATE_8K};
    private static final String arrayDomain[] = new String[]{"general", "poi",
            "song", "movietv", "medical"};
    private static String APP_ID;
    private static String APP_SECRET;
    private static AsrStatus statue = AsrStatus.idle;

    private SpeechUnderstander mUnderstander;
    private CallbackContext callbackContextListener;
    private final SpeechUnderstanderListener speechUnderstanderListener = new SpeechUnderstanderListener() {

        @Override
        public void onResult(int type, String jsonResult) {
            switch (type) {
                case SpeechConstants.ASR_RESULT_NET:
                    // 在线识别结果，通常onResult接口多次返回结果，保留识别结果组成完整的识别内容。
                    log_v("onRecognizerResult");
                    // 通常onResult接口多次返回结果，保留识别结果组成完整的识别内容。
                    if (jsonResult.contains("net_asr")) {
                        try {
                            JSONObject json = new JSONObject(jsonResult);
                            PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, json);
                            pluginResult.setKeepCallback(true);
                            sendCallback(pluginResult);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    break;
                default:
                    break;
            }
            String format = "cordova.plugins.HeytzYzs.speechUnderstanderResult(%d,%s);";
            final String js = String.format(format, type, jsonResult);
            loadUrl(js);
        }

        @Override
        public void onEvent(int type, int timeMs) {
            switch (type) {
                case SpeechConstants.ASR_EVENT_VAD_TIMEOUT:
                    // 说话音量实时返回
                    log_v("onVADTimeout");
                    // 收到用户停止说话事件，停止录音
                    stopRecord();
                    break;
                case SpeechConstants.ASR_EVENT_VOLUMECHANGE:
                    // 说话音量实时返回
                    break;
                case SpeechConstants.ASR_EVENT_SPEECH_DETECTED:
                    //用户开始说话
                    log_v("onSpeakStart");
                    break;
                case SpeechConstants.ASR_EVENT_RECORDING_START:
                    //录音设备打开，开始识别，用户可以开始说话
                    statue =  AsrStatus.recording;
                    break;
                case SpeechConstants.ASR_EVENT_RECORDING_STOP:
                    // 停止录音，请等待识别结果回调
                    log_v("onRecordingStop");
                    statue =  AsrStatus.recognizing;
                    break;
                case SpeechConstants.ASR_EVENT_USERDATA_UPLOADED:
                    log_v("onUploadUserData");
                case SpeechConstants.ASR_EVENT_NET_END:
                    statue =  AsrStatus.idle;
                    break;
            }
            String format = "cordova.plugins.HeytzYzs.speechUnderstanderEvent(%d,%s);";
            final String js = String.format(format, type, timeMs);
            loadUrl(js);
        }

        @Override
        public void onError(int type, final String errorMSG) {
            String format = "cordova.plugins.HeytzYzs.speechUnderstanderError(%d,%s);";
            final String js = String.format(format, type, errorMSG);
            loadUrl(js);
        }
    };

    /**
     * 初始化识别
     */
    private void initRecognizer() {
        // 创建识别对象，appKey通过 http://dev.hivoice.cn/ 网站申请
        mUnderstander = new SpeechUnderstander(cordova.getActivity().getApplicationContext(), APP_ID, APP_SECRET);
        //设置无语义结果
        mUnderstander.setOption(SpeechConstants.NLU_ENABLE, false);
        mUnderstander.setListener(speechUnderstanderListener);
        mUnderstander.init("");
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        APP_ID = webView.getPreferences().getString(APP_ID_KEY, "");
        APP_SECRET = webView.getPreferences().getString(APP_SECRET_KEY, "");
        initRecognizer();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals(INIT)) {
            callbackContext.success();
            return true;
        } else if (action.equals(START_RECORD)) {
            if (statue== AsrStatus.idle) {
                this.startRecord(callbackContext);
            } else {
                callbackContext.error("running");
            }
            return true;
        } else if (action.equals(STOP_RECORD)) {
            if (stopRecord()) {
                statue =  AsrStatus.idle;
                callbackContext.success();
            } else {
                callbackContext.error("not start");
            }
            return true;
        } else if (action.equals(SPEECH_UNDER_STANDER_LISTENER)) {
            callbackContextListener = callbackContext;
            return true;
        }
        return false;
    }

    /**
     * 开始录音
     */
    void startRecord(CallbackContext callbackContext) {
        if (mUnderstander != null) {
            // 修改识别领域
            mUnderstander.setOption(SpeechConstants.ASR_DOMAIN, arrayDomain[0]);
            mUnderstander.start();
            callbackContext.success();
        } else {
            callbackContext.error("Object not instantiated!");
        }
    }

    /**
     * 停止录音
     */
    boolean stopRecord() {
        if (statue ==  AsrStatus.recording) {
            mUnderstander.stop();
            return true;
        } else if (statue ==  AsrStatus.recognizing) {
            mUnderstander.cancel();
            return true;
        } else {
            return false;
        }
    }

    void sendCallback(PluginResult pluginResult) {
        if (callbackContextListener != null) {
            callbackContextListener.sendPluginResult(pluginResult);
        }
    }

    void loadUrl(final String js) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:" + js);
            }
        });
    }

    /**
     * 打印日志信息
     *
     * @param msg
     */
    void log_v(String msg) {
        Log.v("demo", msg);
    }

}
