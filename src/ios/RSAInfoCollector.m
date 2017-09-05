//
//  RSAInfoCollector.m
//  PenFed
//
//  Created by Christopher Perry on 7/22/13.
//
//

#import "RSAInfoCollector.h"
#import "MobileAPI.h"
#import <Cordova/CDV.h>

@implementation RSAInfoCollector

    - (void)collectDeviceInfo:(CDVInvokedUrlCommand*)command
    {
        CDVPluginResult* pluginResult = nil;
        
        //declare the mMobileAPI objects
        MobileAPI *mMobileAPI;
        NSString *mJSONInfoString;
        
        //setup properties
        NSNumber *collectionMode = [[NSNumber alloc]initWithInt: COLLECT_DEVICE_DATA_ONLY];
        NSDictionary* properties = @{
        	CONFIGURATION_KEY : collectionMode,
        };
        
        // get instance of API object
        mMobileAPI = [[MobileAPI alloc]init];
        
        //init
        bool success = [mMobileAPI initSDK: properties];
        
        if(success) {
            
            //collect
            mJSONInfoString = [mMobileAPI collectInfo];
        
            //destroy
            [mMobileAPI destroy];
    
            if (mJSONInfoString != nil && [mJSONInfoString length] > 0) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:mJSONInfoString];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
            }
    
            
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }

@end
