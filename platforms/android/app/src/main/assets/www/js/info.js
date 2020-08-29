
exports.getall = function (name, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "getall", [name]);
};


exports.getalliconpacks = function (name, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "getalliconpacks", [name]);
};


exports.geticons_frompack = function (name,suche,seite, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "geticons_frompack", [name,suche,seite]);
};


exports.revert_icon = function (name, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "revert_icon", [name]);
};



exports.applay_icon = function (package,icon , w , h, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "applay_icon", [package,icon,w,h]);
};


exports.applay_icon_cat = function (save_file,icon , w , h, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "applay_icon_cat", [save_file,icon,w,h]);
};



exports.applay_icon_iconpack = function (package, iconpack, drawable , w , h, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "applay_icon_iconpack", [package, iconpack , drawable,w,h]);
};


exports.applay_icon_iconpack_cat = function (save_file, iconpack, drawable , w , h, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "applay_icon_iconpack_cat", [save_file, iconpack , drawable,w,h]);
};


exports.applay_icon_iconpack_app = function (target_app, iconpack , w , h, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "applay_icon_iconpack_app", [target_app, iconpack ,w,h]);
};

exports.exportall = function (data, successCallback , errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "exportall", [data] );
};

exports.importall = function (successCallback , errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "importall");
};


exports.remove_icon = function (icon_name, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "remove_icon", [icon_name]);
};


exports.start_shortcut = function (package,id,user, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "start_shortcut", [package,id,user]);
};


exports.start_clock = function ( successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "start_clock");
};

exports.start_date = function ( successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "start_date");
};


exports.get_next_alarm = function ( successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Info", "get_next_alarm");
};













