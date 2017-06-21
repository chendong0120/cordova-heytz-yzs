var cordova = require('cordova');
var exec = require('cordova/exec');
var HeytzYzs = function () {
};
/**
 *
 * @type {object}  data
 * @type {int}     data.speechConstants
 * @type {object}  data.jsonResult
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
 *
 * @param {Object} success
 * @param {String} success.type   ["result","event","error"]
 * @param {Number} success.SpeechConstants
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