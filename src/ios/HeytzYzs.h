#import <Cordova/CDV.h>
#import <AudioToolbox/AudioToolbox.h>
#import "USCSpeechResult.h"
#import "USCSpeechUnderstander.h"
#import "USCSpeechSynthesizer.h"
#import "USCSpeechConstant.h"

@interface HeytzYzs : CDVPlugin<USCSpeechUnderstanderDelegate,USCSpeechSynthesizerDelegate> {
    // Member variables go here.
    NSString *ListenerCallbackId;
}
/***********SpeechUnderdtander***********/
@property (nonatomic,strong) USCSpeechUnderstander *speechUnderstander;
@property (nonatomic,strong) USCSpeechSynthesizer *speechSynthesizer;
@property (nonatomic,strong) USCSpeechResult *speechResult;

- (void)init:(CDVInvokedUrlCommand*)command;
- (void)speechUnderstanderListener:(CDVInvokedUrlCommand*)command;
- (void)startRecord:(CDVInvokedUrlCommand*)command;
- (void)stopRecord:(CDVInvokedUrlCommand*)command;

@end