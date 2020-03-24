cordova.define("cordova-plugin-wallpaper.wallpaper", function(require, exports, module) {
function wallpaper() {}

wallpaper.prototype.setImage = function(image,successCallback,errorCallback)
{
	cordova.exec(successCallback, errorCallback, "wallpaper", "start");
};


wallpaper.prototype.getImageID = function(successCallback,errorCallback)
{
	cordova.exec(successCallback, errorCallback, "wallpaper", "getImageID");	
};




wallpaper.install = function()
{
	if (!window.plugins)
	{
		window.plugins = {};
	}

	window.plugins.wallpaper = new wallpaper();
	return window.plugins.wallpaper;
};

cordova.addConstructor(wallpaper.install);

});
