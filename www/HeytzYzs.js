var cordova = require('cordova');
var exec = require('cordova/exec');
var HeytzYzs = function () {
};
/**
 *
 * @type {object}  data
 * @type {int}     data.speechConstants
 * @type {object}  data.jsonResult
 * @param {Array}  data.jsonResult.net_asr
 * @param {Object} data.jsonResult.net_asr.[0]
 * @param {String} data.jsonResult.net_asr.[0].engine_mode
 * @param {boolean}data.jsonResult.net_asr.[0].last_result
 * @param {String} data.jsonResult.net_asr.[0].recognition_result
 * @param {String} data.jsonResult.net_asr.[0].result_type partial 部分 full 全部
 * @param {String} data.jsonResult.net_asr.[0].sessionId
 *
 * IOS
 * {"asr_recongize":"今天天气怎么样啊？","nluProcessTime":"47","rc":5,"text":"今天天气怎么样啊",
 * "service":"cn.yunzhisheng.error","code":"ANSWER","general":{"type":"T","text":"对不起，暂时还不支持该功能，我会努力变得更好的。"},
 * "history":"cn.yunzhisheng.error","responseId":"ccfe105162e34d94a993e5614196db36"}
 * Android
 *
 */
HeytzYzs.prototype.onSpeechUnderstanderResult = {};
/**
 *
 * @type {object}  data
 * @type {int}     data.speechConstants
 * @type {int}     data.timeMs
 */
HeytzYzs.prototype.onSpeechUnderstanderEvent = {};
/**
 *
 * @type {object}  data
 * @type {int}     data.speechConstants
 * @type {int}     data.errorMSG
 */
HeytzYzs.prototype.onSpeechUnderstanderError = {};
HeytzYzs.prototype.callNative = function (name, args, successCallback, errorCallback) {
  exec(successCallback, errorCallback, 'HeytzYzs', name, args);
};
/**
 * 初始化接口，只需要调用一次
 * @param success
 * @param error
 */
HeytzYzs.prototype.init = function (success, error) {
  this.callNative("init", [], success, error);
};
/**
 * 语音识别结果返回接口
 * 返回最终识别结果
 * @param {function} success(data)
 * @param error
 */
HeytzYzs.prototype.speechUnderstanderListener = function (success, error) {
  this.callNative("speechUnderstanderListener", [], success, error);
};
/**
 * 开始录音
 * @param success
 * @param error
 */
HeytzYzs.prototype.startRecord = function (success, error) {
  this.callNative("startRecord", [], success, error);
};
HeytzYzs.prototype.speechUnderstanderResult = function (type, jsonResult) {
  //todo type字段有冲突
  this.onSpeechUnderstanderResult = {speechConstants: type, jsonResult: jsonResult};
  cordova.fireDocumentEvent('HeytzYzs.onSpeechUnderstanderResult', this.onSpeechUnderstanderResult)
};
HeytzYzs.prototype.speechUnderstanderEvent = function (type, timeMs) {
  this.onSpeechUnderstanderEvent = {speechConstants: type, timeMs: timeMs};
  cordova.fireDocumentEvent('HeytzYzs.onSpeechUnderstanderEvent', this.onSpeechUnderstanderEvent)
};
HeytzYzs.prototype.speechUnderstanderError = function (type, errorMSG) {
  this.onSpeechUnderstanderError = {speechConstants: type, errorMSG: errorMSG};
  cordova.fireDocumentEvent('HeytzYzs.onSpeechUnderstanderError', this.onSpeechUnderstanderError)
};
/**
 * 结束录音
 * @param success
 * @param error
 */
HeytzYzs.prototype.stopRecord = function (success, error) {
  this.callNative("stopRecord", [], success, error);
};

if (!window.plugins) {
  window.plugins = {}
}

if (!window.plugins.HeytzYzs) {
  window.plugins.HeytzYzs = new HeytzYzs()
}
module.exports = new HeytzYzs();

SpeechConstants = {
  ASR_SERVICE_MODE: 1001,
  ASR_VOICE_FIELD: 1003,
  ASR_LANGUAGE: 1004,
  ASR_ONLINE_ONESHOT_SERVER_ADDR: 1007,
  ASR_DOMAIN: 1008,
  ASR_SERVER_ADDR: 1009,
  ASR_VAD_TIMEOUT_FRONTSIL: 1010,
  ASR_VAD_TIMEOUT_BACKSIL: 1011,
  ASR_SESSION_ID: 1012,
  ASR_WAKEUP_WORD: 1013,
  ASR_NET_TIMEOUT: 1014,
  ASR_VAD_DETEMUSIC_ENABLE: 1015,
  ASR_VAD_MUSICTH: 1016,
  NLU_ENABLE: 1020,
  NLU_SCENARIO: 1021,
  NLU_SERVER_ADDR: 1022,
  NLU_PARAMS: 1023,
  NLU_VER: 1024,
  NLU_APPVER: 1025,
  GENERAL_HISTORY: 1030,
  GENERAL_CITY: 1031,
  GENERAL_VOICEID: 1032,
  GENERAL_GPS: 1033,
  GENERAL_UDID: 1036,
  ASR_SAMPLING_RATE: 1044,
  GENERAL_UPDATE_VOLUME: 1045,
  ASR_OPT_ENGINE_TAG: 1050,
  ASR_OPT_RESULT_FILTER: 1051,
  ASR_OPT_RECORDING_ENABLED: 1053,
  ASR_OPT_PRINT_LOG: 1054,
  ASR_OPT_FIX_ASR_CONTINUOUS: 1055,
  ASR_OPT_FRONT_VAD_ENABLED: 1056,
  ASR_OPT_SAVE_RECORDING_DATA: 1058,
  ASR_OPT_RESULT_JSON: 1059,
  ASR_OPT_FRONT_CACHE_TIME: 1060,
  ASR_OPT_VAD_ENABLED: 1061,
  ASR_OPT_PRINT_ENGINE_LOG: 1062,
  ASR_OPT_PRINT_TIME_LOG: 1063,
  ASR_OPT_ONESHOT_CACHE_TIME: 1069,
  ASR_OPT_FRONT_RESET_CACHE_BYTE_TIME: 1070,
  ASR_OPT_DEBUG_SAVELOG: 1071,
  ASR_OPT_DEBUG_POSTLOG: 1072,
  ASR_OPT_USE_HANDLERTHREAD: 1073,
  ASR_OPT_SAVE_AFTERVAD_RECORDING_DATA: 1074,
  ASR_OPT_MARK_VAD: 1075,
  ASR_OPT_TEMP_RESULT_ENABLE: 1076,
  ASR_OPT_LOADGRAMMA_TAG_AND_STATUS: 1077,
  ASR_OPT_TIMEOUT_STATUS: 1078,
  ASR_OPT_RECOGNITION_FRONT_VAD: 1079,
  ASR_OPT_ONESHOT_VADBACKSIL_TIME: 1081,
  ASR_OPT_RECOGNIZE_SCENE: 1082,
  ASR_OPT_RECOGNIZE_MODEL_ID: 1083,
  ASR_OPT_WAKEUP_MODEL_ID: 1084,
  ASR_OPT_MODEL_LIST: 1086,
  ASR_OPT_ALREAD_AWPE: 1085,
  ASR_SUBDOMAIN: 1087,
  ASR_ENGINE_INFO: 1088,
  ASR_OPT_ACTIVATE_MEMO: 1089,
  ASR_OPT_WX_SERVICE: 1095,
  WAKEUP_WORK_ENGINE: 1090,
  ASR_SERVICE_MODE_JSONKEY: "asr_serviceMode",
  ASR_BANDWIDTH_JSONKEY: "asr_bandWidth",
  ASR_VOICE_FIELD_JSONKEY: "asr_voiceField",
  ASR_LANGUAGE_JSONKEY: "asr_language",
  ASR_DOMAIN_JSONKEY: "asr_domain",
  ASR_SERVER_ADDR_JSONKEY: "asr_serverAddr",
  ASR_VAD_TIMEOUT_FRONTSIL_JSONKEY: "asr_VADTimeoutFrontSil",
  ASR_VAD_TIMEOUT_BACKSIL_JSONKEY: "asr_VADTimeoutBackSil",
  ASR_WAKEUP_WORD_JSONKEY: "asr_wakeUPWord",
  ASR_NET_TIMEOUT_JSONKEY: "asr_netTimeout",
  NLU_ENABLE_JSONKEY: "nlu_enable",
  NLU_SCENARIO_JSONKEY: "nlu_scenario",
  NLU_SERVER_ADDR_JSONKEY: "nlu_serverAddr",
  GENERAL_HISTORY_JSONKEY: "general_history",
  GENERAL_CITY_JSONKEY: "general_city",
  GENERAL_VOICEID_JSONKEY: "general_voiceID",
  GENERAL_GPS_JSONKEY: "general_gps",
  ASR_SAMPLING_RATE_JSONKEY: "asr_samplingRate",
  ASR_OPT_ENGINE_TAG_JSONKEY: "asr_OPTEngineTag",
  ASR_OPT_RESULT_FILTER_JSONKEY: "asr_OPTResultFilter",
  ASR_OPT_RECORDING_ENABLED_JSONKEY: "asr_OPTRecordingEnabled",
  ASR_OPT_PRINT_LOG_JSONKEY: "asr_OPTPrintLog",
  ASR_OPT_FIX_ASR_CONTINUOUS_JSONKEY: "asr_OPTFixASRContinuous",
  ASR_OPT_VAD_ENABLED_JSONKEY: "asr_OPTVadEnabled",
  ASR_OPT_FRONT_VAD_ENABLED_JSONKEY: "asr_OPTFrontVadEnabled",
  ASR_OPT_SAVE_RECORDING_DATA_JSONKEY: "asr_OPTSaveRecordingData",
  ASR_OPT_RESULT_JSON_JSONKEY: "asr_OPTResultJson",
  ASR_OPT_FRONT_CACHE_TIME_JSONKEY: "asr_OPTFrontCacheTime",
  ASR_OPT_PRINT_ENGINE_LOG_JSONKEY: "asr_OPTPrintEngineLog",
  ASR_OPT_PRINT_TIME_LOG_JSONKEY: "asr_OPTPrintTime",
  ASR_OPT_FRONT_RESET_CACHE_BYTE_TIME_JSONKEY: "asr_OPTFrontResetCacheByteTime",
  ASR_OPT_DEBUG_SAVELOG_JSONKEY: "asr_OPTDebugSaveLog",
  ASR_OPT_DEBUG_POSTLOG_JSONKEY: "asr_OPTDebugPostlog",
  ASR_OPT_USE_HANDLERTHREAD_JSONKEY: "asr_OPTUseHandlerThread",
  ASR_OPT_SAVE_AFTERVAD_RECORDING_DATA_JSONKEY: "asr_OPTSaveAfterVadRecordingData",
  ASR_OPT_MARK_VAD_JSONKEY: "asr_OPTMarkVAD",
  WAKEUP_OPT_THRESHOLD_VALUE_JSONKEY: "wakeup_OPTThresholdValue",
  ASR_RELEASE_ENGINE: 1401,
  ASR_SERVICE_MODE_LOCAL: 2,
  ASR_SERVICE_MODE_NET: 1,
  ASR_SERVICE_MODE_MIX: 0,
  VAD_FRONT_TIMEOUT: 0,
  VAD_BACK_TIMEOUT: 1,
  VAD_ONESHOT_TIMEOUT: 2,
  VOICE_FIELD_FAR: "far",
  VOICE_FIELD_NEAR: "near",
  LANGUAGE_ENGLISH: "en",
  LANGUAGE_CANTONESE: "co",
  LANGUAGE_MANDARIN: "cn",
  ASR_SAMPLING_RATE_BANDWIDTH_AUTO: 100,
  ASR_SAMPLING_RATE_8K: 8000,
  ASR_SAMPLING_RATE_16K: 16000,
  NLU_ISENABLE_DISABLE: "nlu_isEnable_disable",
  ASRRECOGNIZE: 1,
  PERSONAL: 4,
  VOICEPRINT: 8,
  ASRRECOGNIZE_PERSONAL: 5,
  ASRRECOGNIZE_VOICEPRINT: 9,
  VOICEPRINT_PERSONAL: 12,
  ASR_VPR_PERSONAL: 13,
  TTS_KEY_VOICE_SPEED: 2001,
  TTS_KEY_VOICE_PITCH: 2002,
  TTS_KEY_VOICE_VOLUME: 2003,
  TTS_KEY_SAMPLE_RATE: 2004,
  TTS_KEY_VOICE_NAME: 2005,
  TTS_KEY_SERVER_ADDR: 2011,
  TTS_KEY_PLAY_START_BUFFER_TIME: 2012,
  TTS_KEY_STREAM_TYPE: 2013,
  TTS_KEY_IS_DEBUG: 2014,
  TTS_SERVICE_MODE: 2020,
  TTS_SERVICE_MODE_LOCAL: 1,
  TTS_SERVICE_MODE_NET: 2,
  TTS_KEY_IS_READ_ENLISH_IN_PINYIN: 2021,
  TTS_KEY_FRONT_SILENCE: 2022,
  TTS_KEY_BACK_SILENCE: 2023,
  TTS_KEY_IS_URGENT_AUDIO: 2024,
  TTS_KEY_IS_USE_HANDLERTHREAD: 2025,
  TTS_KEY_FRONTEND_MODEL_PATH: 2030,
  TTS_KEY_BACKEND_MODEL_PATH: 2031,
  TTS_KEY_SWITCH_BACKEND_MODEL_PATH: 2032,
  TTS_KEY_ENGINE_INFO: 2033,
  TTS_KEY_ANNOTATION_FILE_PATH: 2034,
  TTS_KEY_VOICE_SPEED_JSONKEY: "tts_VoiceSpeed",
  TTS_KEY_VOICE_PITCH_JSONKEY: "tts_VoicePitch",
  TTS_KEY_VOICE_VOLUME_JSONKEY: "tts_VoiceVolume",
  TTS_KEY_SAMPLE_RATE_JSONKEY: "tts_SampleRate",
  TTS_KEY_VOICE_NAME_JSONKEY: "tts_VoiceName",
  TTS_KEY_SERVER_ADDR_JSONKEY: "tts_ServerAddress",
  TTS_KEY_PLAY_START_BUFFER_TIME_JSONKEY: "tts_PlayStartBufferTime",
  TTS_KEY_STREAM_TYPE_JSONKEY: "tts_StreamType",
  TTS_KEY_IS_DEBUG_JSONKEY: "tts_IsDebug",
  TTS_SERVICE_MODE_JSONKEY: "tts_ServiceMode",
  TTS_KEY_IS_READ_ENLISH_IN_PINYIN_JSONKEY: "tts_IsReadEnlishInPinyin",
  TTS_KEY_FRONT_SILENCE_JSONKEY: "tts_FrontSilence",
  TTS_KEY_BACK_SILENCE_JSONKEY: "tts_BackSilence",
  TTS_KEY_IS_USE_HANDLERTHREAD_JSONKEY: "tts_IsUseHandlerThread",
  TTS_EVENT_INIT: 2101,
  TTS_EVENT_SYNTHESIZER_START: 2102,
  TTS_EVENT_SYNTHESIZER_END: 2103,
  TTS_EVENT_BUFFER_BEGIN: 2104,
  TTS_EVENT_BUFFER_READY: 2105,
  TTS_EVENT_PLAYING_START: 2106,
  TTS_EVENT_PLAYING_END: 2107,
  TTS_EVENT_PAUSE: 2108,
  TTS_EVENT_RESUME: 2109,
  TTS_EVENT_STOP: 2111,
  TTS_EVENT_RELEASE: 2112,
  TTS_EVENT_MODEL_LOAD: 2113,
  TTS_EVENT_SWITCH_FRONTEND_MODEL_SUCCESS: 2114,
  TTS_ERROR: 2301,
  TTS_RELEASE_ENGINE: 2401,
  TTS_STATUS_SYNTHESIZERING: 2501,
  TTS_STATUS_PLAYING: 2502,
  TTS_STATUS_PAUSE: 2503,
  TTS_STATUS_END: 2504,
  ASR_EVENT_RECORDING_START: 1101,//录音设备打开，开始识别，用户可以开始说话
  ASR_EVENT_RECORDING_STOP: 1102,// 停止录音，请等待识别结果回调
  ASR_EVENT_VAD_TIMEOUT: 1103,//说话音量实时返回  收到用户停止说话事件，停止录音
  ASR_EVENT_SPEECH_DETECTED: 1104,//用户开始说话
  ASR_EVENT_SPEECH_END: 1105,
  ASR_EVENT_RECOGNITION_END: 1107,
  ASR_EVENT_USERDATA_UPLOADED: 1108,
  ASR_EVENT_GRAMMAR_COMPILED: 1109,
  ASR_EVENT_GRAMMAR_LOADED: 1110,
  ASR_EVENT_GRAMMAR_INSERTED: 1111,
  ASR_EVENT_VOCAB_INSERTED: 1112,
  ASR_EVENT_FX_ABNORMAL_TOO_LOUD: 1113,
  ASR_EVENT_FX_ABNORMAL_TOO_QUIET: 1114,
  ASR_EVENT_FX_ABNORMAL_SNR_BAD: 1115,
  ASR_EVENT_FX_ABNORMAL_NO_LEADINGSILENCE: 1116,
  ASR_EVENT_CANCEL: 1117,
  ASR_EVENT_LOCAL_END: 1118,
  ASR_EVENT_NET_END: 1119,//结束说话
  ASR_EVENT_END: 1120,
  ASR_EVENT_RECORDING_PREPARED: 1131,
  ASR_EVENT_MODEL_LOAD_SUCCESS: 1150,
  ASR_EVENT_MODEL_LOAD_FAIL: 1151,
  ASR_NLU_EVENT_END: 1121,
  ASR_EVENT_VOLUMECHANGE: 1122,// 说话音量实时返回
  ASR_EVENT_COMPILE_DONE: 1123,
  ASR_EVENT_ENGINE_INIT_DONE: 1129,
  ASR_EVENT_LOADGRAMMAR_DONE: 1130,
  ASR_STATUS_LOCAL_IDEL: 1501,
  ASR_STATUS_LOCAL_RECOGNIZING: 1502,
  ASR_STATUS_LOCAL_RESET: 1503,
  ASR_ERROR: 1300,
  ASR_NLU_ERROR: 1301,
  ASR_ERROR_LOADMODEL_FAIL: 1302,
  ASR_ERROR_INSERTVOCAB_EXT_FAIL: 1303,
  ASR_RESULT_NET: 1201,
  ASR_RESULT_LOCAL: 1202,
  ASR_RESULT_RECOGNITION: 1210, VPR_OPT_SERVER_ADDR_JSONKEY: "vpr_OPTServerAddress",
  VPR_OPT_INPUT_8K_JSONKEY: "vpr_OPTInput8K",
  VPR_OPT_SCENE_ID_JSONKEY: "vpr_OPTSceneID",
  VPR_OPT_LOG_LISTNER_JSONKEY: "vpr_OPTLogListener",
  VPR_OPT_SAVE_RECORDING_DATA_JSONKEY: "vpr_OPTSaveRecordingData",
  VPR_OPT_FRONT_VAD_ENABLED_JSONKEY: "vpr_OPTFrontVadEnabled",
  VPR_OPT_SAMPLE_RATE_JSONKEY: "vpr_OPTSampleRate",
  VPR_OPT_BLUETOOTH_ENABLED_JSONKEY: "vpr_OPTBluetoothEanabled",
  VPR_OPT_VAD_TIMEOUT_JSONKEY: "vpr_OPTVADTimeOut",
  VPR_OPT_STOP_TIMEOUT_JSONKEY: "vpr_OPTRecognizeTimeOut",
  VPR_OPT_REQUEST_AUDIO_SERVER_JSONKEY: "vpr_OPTRequestAudioServer",
  VPR_OPT_FARFILED_ENABLED_JSONKEY: "vpr_OPTFarfiledEnabled",
  VPR_OPT_TYPE_JSONKEY: "vpr_OPTVprType",
  VPR_OPT_RECORDING_ENABLED_JSONKEY: "vpr_OPTRecordintEnabled",
  VPR_OPT_GET_WAVE_DATA_ENABLED_JSONKEY: "vpr_OPTGetWaveEnabled",
  VPR_OPT_USERNAME_JSONKEY: "vpr_OPTUserName",
  VPR_RECORDING_ENABLED: 4001,
  VPR_GET_WAVE_DATA_ENABLED: 4002,
  VPR_SERVER_ADDR: 4003,
  VPR_INPUT_8K: 4004,
  VPR_INPUT_16k: 4005,
  VPR_SCENE_ID: 4006,
  VPR_LOG_LISTNER: 4007,
  VPR_SAVE_RECORDING_DATA: 4008,
  VPR_FRONT_VAD_ENABLED: 4009,
  VPR_SAMPLE_RATE: 4010,
  VPR_BLUETOOTH_ENABLED: 4011,
  VPR_VAD_TIMEOUT: 4012,
  VPR_STOP_TIMEOUT: 4013,
  VPR_FARFILED_ENABLED: 4014,
  VPR_REQUEST_AUDIO_SERVER: 4015,
  VPR_TYPE: 4016,
  VPR_USERNAME: 4017,
  VPR_GET_WAVE_HEADER: 4018,
  VPR_GET_REQUEST_AUDIO: 4019,
  VPR_SESSION_ID: 4020,
  VPR_SCENE_ENABLE: 4021,
  VPR_EVENT_RECOGNITION_START: 4104,
  VPR_EVENT_SPEECH_START: 4106,
  VPR_EVENT_VAD_TIMEOUT: 4107,
  VPR_RESULT: 4201,
  VPR_ERROR: 4301,
  VPR_EVENT_RECORDING_START: 4101,
  VPR_EVENT_RECORDING_STOP: 4102,
  VPR_EVENT_VOLUME_UPDATED: 4103,
  VPR_EVENT_RECOGNITION_END: 4104,
  WAKEUP_EVENT_RECOGNITION_SUCCESS: 3103,
  WAKEUP_EVENT_SET_WAKEUPWORD_DONE: 3105,
  WAKEUP_OPT_THRESHOLD_VALUE: 3150,
  WAKEUP_RESULT: 3201,
  WAKEUP_ERROR: 3301,
  UPLOAD_DATA_NAME: 1,
  UPLOAD_DATA_APP: 2,
  UPLOAD_DATA_SONG: 3,
  UPLOAD_DATA_SINGER: 4,
  UPLOAD_DATA_ALBUM: 5,
  UPLOAD_DATA_COMMAND: 6,
  UPLOAD_DATA_WECHAT_CONTACT: 7,
  GENERAL_256_MODEL: 3,
  GENERAL_512_MODEL: 5,
  GENERAL_1024_MODEL: 6,
  AUTO_128_MODEL: 11,
  AUTO_256_MODEL: 12,
  AUTO_320_MODEL: 13,
  HOME_256_MODEL: 22,
  HOME_512_MODEL: 24,
  HOME_1024_MODEL: 25,
  GENERAL_128_MODEL_CN_EN: 101,
  GENERAL_256_MODEL_CN_EN: 102,
  GENERAL_512_MODEL_CN_EN: 103,
  GENERAL_1024_MODEL_CN_EN: 104,
  HOME_256_MODEL_CN_EN: 202,
  HOME_512_MODEL_CN_EN: 201,
};