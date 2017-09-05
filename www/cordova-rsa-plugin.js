/**
 * Methods for interacting with the RSA cordova plugin
 * 
 * @param $
 *            jQuery object
 * @returns pfBanking.cordova.rsa object of public interface
 */
console.debug('Initializing rsa plugin object');
var exec = require('cordova/exec');

var getPromisedCordovaExec = function (command, success, fail) { 
	var toReturn, deferred, injector, $q;
	if (success === undefined) {
		if (window.jQuery) {
			deferred = jQuery.Deferred();
			success = deferred.resolve;
			fail = deferred.reject;
			toReturn = deferred;
		} else if (window.angular) {
			injector = angular.injector(["ng"]);
			$q = injector.get("$q");
			deferred = $q.defer();
			success = deferred.resolve;
			fail = deferred.reject;
			toReturn = deferred.promise;
		} else if (window.when && window.when.promise) {
			deferred = when.defer();
			success = deferred.resolve;
			fail = deferred.reject;
			toReturn = deferred.promise;
		} else if (window.Promise) {
			toReturn = new Promise(function(c, e) {
				success = c;
				fail = e;
			});
		} else if (window.WinJS && window.WinJS.Promise) {
			toReturn = new WinJS.Promise(function(c, e) {
				success = c;
				fail = e;
			});
		} else {
			return console.error('AppVersion either needs a success callback, or jQuery/AngularJS/Promise/WinJS.Promise defined for using promises');
		}
	}
	exec(success, fail, "RSAInfoCollector", command, []);
	return toReturn;
};

var rsaInfo = function (success, fail) {
	return getPromisedCordovaExec('collectDeviceInfo', success, fail);
};

/**
 * Invokes native RSA Plugin code to retrieve device information.
 * 
 *  @param success: Callback for successful execution. Device info JSON string will be passed as argument
 *  @param fail: Callback for failure execution. Failure info will be passed as argument
 */

rsaInfo.getDeviceInfo = function (success, fail) {
  return getPromisedCordovaExec('collectDeviceInfo', success, fail);
};

module.exports = rsaInfo;