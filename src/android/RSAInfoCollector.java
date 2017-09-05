package org.penfed.mobile.banking.rsa;

import java.util.Properties;

import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONException;

import com.rsa.mobilesdk.sdk.MobileAPI;

public class RSAInfoCollector extends CordovaPlugin {

	@Override
	public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
		
		try {
			// get instance of API object
			MobileAPI mobileAPI = MobileAPI.getInstance(this.cordova.getActivity());
			
			//init
			mobileAPI.initSDK(getSdkProperties());
			
			//collect
			String data = mobileAPI.collectInfo();
			
			//destroy
			mobileAPI.destroy();
			
			//return the message
			callbackContext.success(data);
			return true;
		} catch (Exception e) {
			callbackContext.error("Error collecting RSA data: " + e.getMessage());
			return false;
		}
	}
	
	private Properties getSdkProperties(){
		Properties properties = new Properties();
		
		properties.setProperty(MobileAPI.CONFIGURATION_KEY, "" + MobileAPI.COLLECT_DEVICE_DATA_ONLY);
		
		return properties;
	}
}
