package com.nickdenry.intentList;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Environment;
import android.util.Base64;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ByteArrayOutputStream;
import java.lang.CharSequence;
import java.util.List;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.app.Activity;
import android.os.Environment;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStream;
import java.net.URL;
import android.content.ContentResolver;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;


import android.util.Log;

import android.graphics.Bitmap;
import android.graphics.Color;

/**
 * Get Intent list from Android and send it to js.
 */
public class IntentList extends CordovaPlugin {

    public static final String ACTION_GET_INTENT_LIST = "getIntentList";

    // @see https://stackoverflow.com/a/10600736


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException
    {
        if (ACTION_GET_INTENT_LIST.equals(action)) 
        {
            getIntentList(callbackContext);
            return true;
        }
        callbackContext.error("Invalid action");
        return false;
    }
    

    private void getIntentList(CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
					File icondir = new File("/data/data/luke.launcher/appicons");
					icondir.mkdirs();


                    // Get list of Intents from packageManager
                    Intent mainIntent = new Intent(Intent.ACTION_MAIN, null);
                    mainIntent.addCategory(Intent.CATEGORY_LAUNCHER);
                    PackageManager packageManager = cordova.getActivity().getPackageManager();
                    List<ResolveInfo> resovleInfoList = packageManager.queryIntentActivities(mainIntent, 0);
                    // Create JSON array for js results
                    JSONArray applicationsList = new JSONArray();
                    for (ResolveInfo resolveInfo : resovleInfoList) 
                    {
                        String packageName = resolveInfo.activityInfo.packageName; // Get Intent package name
                        CharSequence intentLabel = resolveInfo.loadLabel(packageManager);
                        
                       File file_test = new File("/data/data/luke.launcher/appicons/"+ packageName+".png");
						
						if(file_test.exists())      
						{
							//Icon exist ... nothing to do ....
						}
						else
						{
							Drawable appIcon = resolveInfo.loadIcon(packageManager); // Get Intent icon
							
							// Drawable iconDrawable = context.getPackageManager().getApplicationIcon(context.getApplicationInfo());
							
							Bitmap bitmap = Bitmap.createBitmap(appIcon.getIntrinsicWidth(),
							appIcon.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
							final Canvas canvas = new Canvas(bitmap);
							appIcon.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
							appIcon.draw(canvas);
        
        
							//Bitmap bitmap = ((BitmapDrawable)appIcon).getBitmap();
							
							
							File file;

							String path = "/data/data/luke.launcher/appicons/";

							// Create a file to save the image
							file = new File(path, packageName+".png");
							
							OutputStream stream = null;
							stream = new FileOutputStream(file);
							bitmap.compress(Bitmap.CompressFormat.PNG,100,stream);
							stream.flush();
							stream.close();
						
						}
						
                        // Create json object for current Intent
                        JSONObject intentInfo = new JSONObject();
                        intentInfo.put("label", intentLabel);
                        intentInfo.put("package", packageName);
                        intentInfo.put("packageIcon", "");
                        applicationsList.put(intentInfo);
 
                    }
                    
                    
                    
                    callbackContext.success(applicationsList);
                } catch (Exception e) {

                    callbackContext.error(e.getMessage());
                }
            }
        });
    }
}
