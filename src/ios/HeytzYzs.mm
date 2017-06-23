/********* cordova-heytz-yzs.m Cordova Plugin Implementation *******/

//#import <Cordova/CDV.h>
//#import "HeytzYzs.h"

#import <Cordova/CDV.h>
#import <AudioToolbox/AudioToolbox.h>
#import "USCSpeechResult.h"
#import "USCSpeechUnderstander.h"
#import "USCSpeechSynthesizer.h"
#import "USCSpeechConstant.h"

#import "USCRecorder.h"

@interface HeytzYzs : CDVPlugin<USCSpeechUnderstanderDelegate> {
    // Member variables go here.
   
}
/***********SpeechUnderdtander***********/
@property (nonatomic,strong) USCSpeechUnderstander *speechUnderstander;

@property (nonatomic,strong) USCSpeechResult *speechResult;
@property (nonatomic,strong) NSString *ListenerCallbackId;

- (void)init:(CDVInvokedUrlCommand*)command;
- (void)speechUnderstanderListener:(CDVInvokedUrlCommand*)command;
- (void)startRecord:(CDVInvokedUrlCommand*)command;
- (void)stopRecord:(CDVInvokedUrlCommand*)command;
@end

@implementation HeytzYzs

-(void)pluginInitialize{
//    [self setupSpeech];
}
- (void)init:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self setupSpeech];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)speechUnderstanderListener:(CDVInvokedUrlCommand*)command
{
    _ListenerCallbackId=command.callbackId;
}

- (void)startRecord:(CDVInvokedUrlCommand*)command
{
    [self stop];
    [self.speechUnderstander start];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
- (void)stopRecord:(CDVInvokedUrlCommand*)command
{
    [self.speechUnderstander stop];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)stop
{
    [self.speechUnderstander stop];
}

- (void)setupSpeech
{
    NSString *appId = [[self.commandDelegate settings] objectForKey:@"yzsappkey"];
    NSString *appSecret = [[self.commandDelegate settings] objectForKey:@"yzsappsecret"];
    /*********** create speechUnderstander***********/
    USCRecorder *recorder = [[USCRecorder alloc]init];
    USCSpeechUnderstander *underStander = [[USCSpeechUnderstander alloc]initWithContext:nil appKey:appId secret:appSecret];
    self.speechUnderstander = underStander;
    [self.speechUnderstander setOption:USC_ASR_DOMAIN value:@"poi"];
    [self.speechUnderstander setOption:USC_ASR_VAD_TIMEOUT_FRONTSIL value:@"300"];
    [self.speechUnderstander setOption:USC_ASR_VAD_TIMEOUT_BACKSIL value:@"200"];
    [self.speechUnderstander setOption:USC_NLU_ENABLE value:@"true"];

    self.speechUnderstander.delegate = self;
    [self.speechUnderstander setAudioSource:recorder];

}
/**
 *   错误信息
 *
 *  @param type  错误类型
 *  @param error 错误
 */
- (void)onError:(int)type error:(NSError *)error{
    NSLog(@"on error type=%d", type);
    NSString *jsStr = [NSString stringWithFormat:@"cordova.plugins.HeytzYzs.speechUnderstanderError(%d,%ld);", type,error.code];
    [self.commandDelegate evalJs:jsStr];
}
/**
 *  事件回调
 *
 *  @param type 事件类型:如SPPEECHSTART,RECORDINGSTART,RECORDINGSTOP
 *  @param timeMs
 */
- (void)onEvent:(int)type timeMs:(int)timeMs{
    NSLog(@"on event type=%d", type);
    NSString *jsStr = [NSString stringWithFormat:@"cordova.plugins.HeytzYzs.speechUnderstanderEvent(%d,%d);",timeMs,timeMs];
    [self.commandDelegate evalJs:jsStr];
}
/**
 *  结果回调
 *
 *  @param type 结果类型:ASR_FIX_RESULT,ASR_ONLINE_RESULT,ASR_ONLINE_LAST_RESULT,ASR_NLU_RESULT
 *  @param jsonResult 结果
 */
- (void)onResult:(int)type jsonString:(NSString *)jsonString;
{
    NSLog(@"on result type=%d", type);
    NSLog(@"json= %@",jsonString);
    if ([self detectResultJSONCount:jsonString]) {
    }else{
        NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        NSError *error = nil;
        NSDictionary *resObj = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&error];
        if (resObj) {
            NSString *part = [resObj objectForKey:@"asr_recongize"];
            NSLog(@"mstr=%@",part);
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:part];
             [pluginResult setKeepCallbackAsBool:true];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:_ListenerCallbackId];
        }
    }
//    NSError* error = NULL;
//    NSDictionary *string2Dictionary = [NSJSONSerialization JSONObjectWithData:[jsonString dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableLeaves error:&error];
//    NSLog(@"string2Dictionary = %@", string2Dictionary);

    NSString *jsStr = [NSString stringWithFormat:@"cordova.plugins.HeytzYzs.speechUnderstanderResult(%d,%@);",type,jsonString];
    [self.commandDelegate evalJs:jsStr];
}

// detect last result json count
- (BOOL)detectResultJSONCount:(NSString *)resultStr
{
    NSString *parten =@"\\}\\{";
    NSError* error = NULL;
    NSRegularExpression *reg = [NSRegularExpression regularExpressionWithPattern:parten options:NULL error:&error];
    NSArray* match = [reg matchesInString:resultStr options:NSMatchingCompleted range:NSMakeRange(0, [resultStr length])];
    if (match.count >= 1) {
        return YES;
    }
    return NO;
}

- (NSString *)separateJSONString:(NSString *)string
{
    NSMutableString *allJsonResultStr = [NSMutableString string];// server all json result
    NSMutableDictionary *resultMDict;
    NSString *parten =@"\\}\\{";
    NSError* error = NULL;
    NSRegularExpression *reg = [NSRegularExpression regularExpressionWithPattern:parten options:NULL error:&error];
    NSArray* match = [reg matchesInString:string options:NSMatchingCompleted range:NSMakeRange(0, [string length])];// all json in match array
    if (match.count == 0) {
        return nil;
    }
    
    NSMutableArray *locationArray = [NSMutableArray array];
    // 计算每块json的location
    for (NSTextCheckingResult *checkResult in match) {
        [locationArray addObject:[NSNumber numberWithInt:checkResult.range.location]];
    }
    
    NSMutableArray *jsonArray = [NSMutableArray array];
    // 计算出每段json
    for (int i = 0; i < locationArray.count; i++) {
        NSString *jsonString;
        if (i == 0) {
            NSRange range = NSMakeRange(0, ([locationArray[i] intValue] + 1));
            jsonString = [string substringWithRange:range];
        }
        else{
            int len = [locationArray[i] intValue] - [locationArray[i - 1] intValue];
            NSRange range = NSMakeRange([locationArray[i-1] intValue] + 1, len);
            jsonString = [string substringWithRange:range];
        }
        [jsonArray addObject:jsonString];
        NSData *tempData =  [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary *tempDict = [NSJSONSerialization JSONObjectWithData:tempData options:NSJSONReadingAllowFragments error:&error];
        
        if ([tempDict objectForKey:@"asr_recongize"]) {
            [allJsonResultStr appendString:(NSString *)[tempDict objectForKey:@"asr_recongize"]];
        }
    }// for
    return allJsonResultStr;
}

@end
