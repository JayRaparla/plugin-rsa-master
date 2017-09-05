//
//  RSAInfoCollector.h
//  PenFed
//
//  Created by Christopher Perry on 7/22/13.
//
//

#import <Cordova/CDV.h>

@interface RSAInfoCollector : CDVPlugin

    - (void)collectDeviceInfo:(CDVInvokedUrlCommand*)command;

@end
