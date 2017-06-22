/********* cordova-heytz-yzs.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import "HeytzYzs.h"

@implementation HeytzYzs

-(void)pluginInitialize{
    [self setupSpeech];
}
- (void)init:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];

    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
- (void)speechUnderstanderListener:(CDVInvokedUrlCommand*)command
{
    ListenerCallbackId=command.callbackId;
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
    [self stop];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)stop
{
    [self.speechUnderstander stop];
}

#pragma mark - SpeechUnderstander
- (void)setupSpeech
{
    NSString *appId = [[self.commandDelegate settings] objectForKey:@"yzsappkey"];
    NSString *appSecret = [[self.commandDelegate settings] objectForKey:@"yzsappsecret"];
    /*********** create speechUnderstander***********/
    USCSpeechUnderstander *underStander = [[USCSpeechUnderstander alloc]initWithContext:nil appKey:appId secret:appSecret];
    self.speechUnderstander = underStander;
//    [self.speechUnderstander setOption:USC_ASR_DOMAIN value:@"poi"];
//    [self.speechUnderstander setOption:USC_ASR_VAD_TIMEOUT_FRONTSIL value:@"300"];
//    [self.speechUnderstander setOption:USC_ASR_VAD_TIMEOUT_BACKSIL value:@"200"];
//    [self.speechUnderstander setOption:USC_NLU_ENABLE value:@"true"];

    self.speechUnderstander.delegate = self;
}

#pragma mark - Action
- (void)onError:(int)type error:(NSError *)error
{
    NSString *jsStr = [NSString stringWithFormat:@"HeytzYzs.onSpeechUnderstanderError(%d,%ld);", type,error.code];
    [self.commandDelegate evalJs:jsStr];
}

- (void)onEvent:(int)type timeMs:(int)timeMs
{
     NSString *jsStr = [NSString stringWithFormat:@"HeytzYzs.onSpeechUnderstanderEvent(%d,%d);",timeMs,timeMs];
     [self.commandDelegate evalJs:jsStr];
}

- (void)onResult:(int)type jsonString:(NSString *)jsonString
{
    NSLog(@"json= %@",jsonString);
    NSError* error = NULL;
    NSDictionary *string2Dictionary = [NSJSONSerialization JSONObjectWithData:[jsonString dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableLeaves error:&error];
    NSLog(@"string2Dictionary = %@", string2Dictionary);
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:string2Dictionary];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:ListenerCallbackId];

    NSString *jsStr = [NSString stringWithFormat:@"HeytzYzs.onSpeechUnderstanderResult(%d,%@);",type,jsonString];
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
}@end
