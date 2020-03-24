package com.bar.info;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import android.content.Context;

import android.app.*;
import android.os.*;
import android.view.*;
import android.widget.*;
import android.graphics.Point;


import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import android.content.Context;
import android.content.pm.LauncherApps;
import android.content.pm.ShortcutInfo;

import android.os.Parcel;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;


import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import java.util.*;

import java.io.File;

import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ByteArrayOutputStream;
import java.lang.CharSequence;
import java.util.List;

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


import org.xml.sax.XMLReader;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

import android.content.res.Resources;

import android.content.res.XmlResourceParser;
import android.util.Log;


import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilderFactory;


import android.provider.AlarmClock;




import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.res.Resources;
import android.graphics.*;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.util.Log;


import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;


import android.util.Base64;


import java.io.File;
import java.io.IOException;


import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.FileReader;

import android.view.ViewConfiguration;
import java.lang.reflect.Method;

import android.view.Display;
import android.util.DisplayMetrics;

public class Info extends CordovaPlugin 
{

	public HashMap current_hash_map = null;
	public String current_icon_pack = "";
	
	//https://github.com/giantss/cordova-plugin-ImagePicker/blob/master/src/android/module/view/SystemBarTintManager.java
	
	private boolean hasNavBar(Context context)
	{
		 boolean hasSoftwareKeys = true;

		 if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.LOLLIPOP){
		 Display d = cordova.getActivity().getWindowManager().getDefaultDisplay();

		 DisplayMetrics realDisplayMetrics = new DisplayMetrics();
		 d.getRealMetrics(realDisplayMetrics);

		 int realHeight = realDisplayMetrics.heightPixels;
		 int realWidth = realDisplayMetrics.widthPixels;

		 DisplayMetrics displayMetrics = new DisplayMetrics();
		 d.getMetrics(displayMetrics);

		 int displayHeight = displayMetrics.heightPixels;
		 int displayWidth = displayMetrics.widthPixels;

		 hasSoftwareKeys = (realWidth - displayWidth) > 0 || (realHeight - displayHeight) > 0;
		 }else{
		 boolean hasMenuKey = ViewConfiguration.get(context).hasPermanentMenuKey();
         boolean hasBackKey = KeyCharacterMap.deviceHasKey(KeyEvent.KEYCODE_BACK);
		 hasSoftwareKeys =  !hasMenuKey && !hasBackKey;
		 }
		 return hasSoftwareKeys;
	}

        
        
	/*
	 *
	 * Inspired by: https://im-coder.com/wie-bekomme-ich-die-hoehe-und-breite-der-android-navigation-leiste-programmgesteuert.html
	 */
	 
	public Point getNavigationBarSize(Context context) 
	{
		Point appUsableSize = getAppUsableScreenSize(context);
		Point realScreenSize = getRealScreenSize(context);

		if (appUsableSize.x < realScreenSize.x) 
		{
			return new Point(realScreenSize.x - appUsableSize.x, appUsableSize.y);
		}

		if (appUsableSize.y < realScreenSize.y) 
		{
			return new Point(appUsableSize.x, realScreenSize.y - appUsableSize.y);
		}
		return new Point();
	}

	public Point getAppUsableScreenSize(Context context) 
	{
		WindowManager windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
		Display display = cordova.getActivity().getWindowManager().getDefaultDisplay();
		Point size = new Point();
		display.getSize(size);
		return size;
	}

	public Point getRealScreenSize(Context context) 
	{
		WindowManager windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
		Display display = cordova.getActivity().getWindowManager().getDefaultDisplay();
		Point size = new Point();
		display.getRealSize(size);
		return size;
	}






 //Load all Icons from a IconPack and return a HashMap 
 public HashMap loadIconsPack(String packageName) 
 {
		String back = "";
		String TAG = "LukeLauncher";

        String iconsPackPackageName = packageName;
      
        XmlResourceParser xpp = null;
        HashMap<String, String> mPackagesDrawables = new HashMap<String, String>();
        
        try {
					
                Resources iconPackres =cordova.getActivity().getPackageManager().getResourcesForApplication(iconsPackPackageName);
                int appfilterid = iconPackres.getIdentifier("appfilter", "xml", packageName);
                if (appfilterid > 0)
                {
                    xpp = iconPackres.getXml(appfilterid);
                }
                else
                { 
                        Log.d(TAG, "No appfilter.xml file");
                }

                if (xpp != null)
                {
                    int eventType = xpp.getEventType();
                    while (eventType != XmlPullParser.END_DOCUMENT)
                    {
                        if(eventType == XmlPullParser.START_TAG)
                        {
                            if (xpp.getName().equals("iconback"))
                            {
                                for(int i=0; i<xpp.getAttributeCount(); i++)
                                {
                                    if (xpp.getAttributeName(i).startsWith("img"))
                                    {
                                        String drawableName = xpp.getAttributeValue(i);
                                    }
                                }
                            }
                            else if (xpp.getName().equals("iconmask"))
                            {
                                if (xpp.getAttributeCount() > 0 && xpp.getAttributeName(0).equals("img1"))
                                {
                                    String drawableName = xpp.getAttributeValue(0);
                                }
                            }
                            else if (xpp.getName().equals("iconupon"))
                            {
                                if (xpp.getAttributeCount() > 0 && xpp.getAttributeName(0).equals("img1"))
                                {
                                    String drawableName = xpp.getAttributeValue(0);
                                }
                            }
                            else if (xpp.getName().equals("item"))
                            {
                                String componentName = null;
                                String drawableName = null;

                                for(int i=0; i<xpp.getAttributeCount(); i++)
                                {
                                    if (xpp.getAttributeName(i).equals("component"))
                                    {
                                        componentName = xpp.getAttributeValue(i);
                                        componentName = componentName.toLowerCase();
                                   
                                    }
                                    else if (xpp.getAttributeName(i).equals("drawable"))
                                    {
                                        drawableName = xpp.getAttributeValue(i);
									}
            
                                 }
                                    
								if (!mPackagesDrawables.containsKey(componentName))
								{
									mPackagesDrawables.put(componentName, drawableName);
								}
                              }
                               
                            }
                        
                        eventType = xpp.next();
                    }
                }
            
          } catch (Exception e){ }
        
       return mPackagesDrawables;
} 
  




	/*
	Inspired by:
	https://gitlab.e.foundation/e/apps/BlissLauncher/blob/5657b374d823a280c484bc105bfecc85321d0c6e/app/src/main/java/foundation/e/blisslauncher/core/IconsHandler.java
	Returns the bitmap for a drawable in a Iconpack
	*/
	
	public Bitmap get_drawable_from_pack(HashMap inMap , String iconsPackPackageName, String drawable_in)
	{
		Bitmap back = null;
		
		Iterator it = null;
		it = current_hash_map.entrySet().iterator();
	 	
		HashMap<String,String> used_drawables = new HashMap<String, String>();
		try
		{
			Resources iconPackres = cordova.getActivity().getPackageManager().getResourcesForApplication(iconsPackPackageName);
            
			while (it.hasNext()) 
			{		
				Map.Entry pair = (Map.Entry)it.next();
				
				int id = 0;
				
				String drawableName =  pair.getValue().toString();
				
				if( drawableName.equals(drawable_in)  )
				{
						id = iconPackres.getIdentifier(drawableName, "drawable", iconsPackPackageName);
										
						if(id > 0)
						{
							Drawable dwm = iconPackres.getDrawable(id);
							if (dwm instanceof BitmapDrawable)
							{	
								try
								{	
									back = ((BitmapDrawable)dwm).getBitmap();
								}
								catch(Exception e){}			
							}			
						}
				break;						
				}									
			}
		}
		catch(Exception e){	}		
	
		return back;
	}


	/*Extract Icons from Icon Pack...*/
	public String get_icons_from_pack(HashMap inMap , String iconsPackPackageName, String page, String search)
	{	
		   int count = 0;
		   Iterator it = null;
		   it = current_hash_map.entrySet().iterator();
		   String back = "";
		   
		   int start_page = (Integer.parseInt(page) - 1 ) * 8;
		   int pack_count = 0;
		   
		   HashMap<String,String> used_drawables = new HashMap<String, String>();

		   search =  search.toLowerCase();
		   try
		   {
			Resources iconPackres =cordova.getActivity().getPackageManager().getResourcesForApplication(iconsPackPackageName);
            
			while (it.hasNext()) 
			{		
				Map.Entry pair = (Map.Entry)it.next();
				String componentName = pair.getKey().toString();
				

				int id = 0;
				String drawableName  = "";
				if( componentName.contains(search)  )
				{
					drawableName =  pair.getValue().toString();
					
					if (!used_drawables.containsKey(drawableName))
					{

						id = iconPackres.getIdentifier(drawableName, "drawable", iconsPackPackageName);
												
						if(id > 0)
						{
							used_drawables.put(drawableName, drawableName);
						}
					}
													
				}
						
				if (id > 0) 
				{
					count = count + 1;
					if(count > start_page)
					{	
						 
							Drawable dwm = iconPackres.getDrawable(id);
							if (dwm instanceof BitmapDrawable)
							{
										
								try
								{	
									Bitmap bitmap = ((BitmapDrawable)dwm).getBitmap();
									ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
										
									bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);

									String encoded =  Base64.encodeToString(outputStream.toByteArray(), Base64.DEFAULT);
									back = back + encoded + "-" +drawableName + ",";
								
									if(pack_count > 7)
									{
										break;
									}
									pack_count = pack_count + 1;
								}
								catch(Exception e){}
							}	
					}						
				}	
											
			}
	
		}
		catch(Exception e){}		
	
		return back;
	}
	


	/*Search for App In Iconpack*/
	public String search_app_icon_from_pack(HashMap inMap , String iconsPackPackageName, String search)
	{	
		   Iterator it = null;
		   it = current_hash_map.entrySet().iterator();
		   String back = "";
		      
		   try
		   {
			Resources iconPackres =cordova.getActivity().getPackageManager().getResourcesForApplication(iconsPackPackageName);
            
			while (it.hasNext()) 
			{		
				Map.Entry pair = (Map.Entry)it.next();
				String componentName = pair.getKey().toString();
		
				int id = 0;
				String drawableName  = "";
				if( componentName.contains(search)  )
				{
					drawableName =  pair.getValue().toString();
			
					id = iconPackres.getIdentifier(drawableName, "drawable", iconsPackPackageName);
												
					if(id > 0)
					{
						back = drawableName;
					}								
				}
									
			}
			
				
		}
		catch(Exception e){}		
		
		return back;
		
	}
	
	
	
	 /*
	  Scale a bitmap to a give Size
	  Inspired by: https://stackoverflow.com/questions/4837715/how-to-resize-a-bitmap-in-android
	 */
     public Bitmap scaleBitmap(Bitmap bmp, int newHeight, int newWidth)
     {
        int width = bmp.getWidth();
        int height = bmp.getHeight();
        float scaleWidth = ((float) newWidth) / width;
        float scaleHeight = ((float) newHeight) / height;
        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);
        Bitmap newBitmap = Bitmap.createBitmap(bmp, 0, 0, width, height, matrix, false);
        return newBitmap ;
    }
    
    
    
    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

		//Statusbar informations
        if (action.equals("getall")) 
        {
			
			int navbarsize = 0;
			Context context = this.cordova.getActivity().getApplicationContext();
			
			if(hasNavBar(context) == true)
			{
				navbarsize = getNavigationBarSize(context).y;	
			}
			else
			{
				navbarsize = 0;
			}
			
			
						
			int statusBarHeight = 0;
			int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
			
			if (resourceId > 0) 
			{
				statusBarHeight = context.getResources().getDimensionPixelSize(resourceId);
			}
						
			navbarsize = navbarsize - statusBarHeight;
			
			if(navbarsize<0)
			{
				navbarsize = 0;
			}
			
			String message = ""+navbarsize+","+(statusBarHeight/2);
			
            callbackContext.success(message);
            return true;
        } 
        
        
       //Start default android clock 
       if (action.equals("start_clock"))
       {    
		    try
		    {          
				Intent i = new Intent(AlarmClock.ACTION_SHOW_ALARMS);
				cordova.getActivity().startActivity(i);
			}
			catch (Exception e)
			{
			}  
       }
                            

	   //Start the default calender App
       if (action.equals("start_date"))
       {               
		   try
		   {
				Intent i = new Intent(Intent.ACTION_MAIN);
				i.addCategory(Intent.CATEGORY_APP_CALENDAR);    
				cordova.getActivity().startActivity(i); 
			}
			catch (Exception e)
			{
			}  
       }
       
       
       
       if (action.equals("get_next_alarm"))
       {               
		   try
		   {
			    Context context = this.cordova.getActivity().getApplicationContext();		
				AlarmManager alarmManager = (AlarmManager) cordova.getActivity().getSystemService(Context.ALARM_SERVICE);
				
				long nextAlarmTime = alarmManager.getNextAlarmClock().getTriggerTime();
				
				String nextAlarmTime_string = Long.toString(nextAlarmTime);
				
				callbackContext.success(nextAlarmTime_string);
				return true;
			
			}
			catch (Exception e)
			{
				callbackContext.success("-1");
				return true;
			}  
       }
       

       
       
                                   
        //Returns all installed Iconpacks
        if (action.equals("getalliconpacks")) 
        {
				String back = "";
				PackageManager pm = cordova.getActivity().getPackageManager();

				List<ResolveInfo> adwlauncherthemes = pm.queryIntentActivities(new Intent("org.adw.launcher.THEMES"), PackageManager.GET_META_DATA);
				List<ResolveInfo> golauncherthemes = pm.queryIntentActivities(new Intent("com.gau.go.launcherex.theme"), PackageManager.GET_META_DATA);

				List<ResolveInfo> rinfo = new ArrayList<ResolveInfo>(adwlauncherthemes);
				rinfo.addAll(golauncherthemes);
				
				HashMap<String,String> used_icpnpacks = new HashMap<String, String>();
				
				for(ResolveInfo ri  : rinfo)
				{
					String packageName = ri.activityInfo.packageName;
					try
					{
						ApplicationInfo app = pm.getApplicationInfo(""+packageName, 0);        
						String name = pm.getApplicationLabel(app).toString();
						try
						{
							
							if (!used_icpnpacks.containsKey(packageName))
							{
								Drawable icon = pm.getApplicationIcon(app);	
								Bitmap bitmap = ((BitmapDrawable)icon).getBitmap();
								ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
								bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
								String encoded =  Base64.encodeToString(outputStream.toByteArray(), Base64.DEFAULT);
								back = back+packageName+"-"+name+ "-" + encoded +  ",";
								used_icpnpacks.put(packageName, packageName);
							}
							
						}
						catch (Exception e)
						{
						}
											
					}
					catch (PackageManager.NameNotFoundException e)
					{
						e.printStackTrace();
					}
					
				}
            
			String message = back;
            callbackContext.success(message);
		}
        
        
        //For a specific iconpack return the icons
        if (action.equals("geticons_frompack")) 
        {
			String back = "";
			
			String icon_pack = data.getString(0);
			String search = data.getString(1);
			String page = data.getString(2);
 
			if(page == "" || page.equals("") )
			{
				page = "1";
			}
			
			if(current_icon_pack.equals(icon_pack) == false) //Load Icons for this package...
			{
				current_hash_map = loadIconsPack(icon_pack);
				current_icon_pack = icon_pack;
			}
            
            if(current_hash_map != null)
            {
				back = get_icons_from_pack(current_hash_map , icon_pack , page , search);
			}
			else
			{
				back = "";
			}
			
            callbackContext.success(back);
		}
        
        
        //A Icon is reverted to the orginal icon
        if (action.equals("revert_icon")) 
        {
			String pack_name = data.getString(0);
			Drawable icon = null;
			
			try
			{
				icon = cordova.getActivity().getPackageManager().getApplicationIcon(pack_name);
				
			}
			catch (PackageManager.NameNotFoundException e){}
			
			Bitmap bitmap = ((BitmapDrawable)icon).getBitmap();
			try
			{	
				if(bitmap!=null)
				{
					File file;
					String path = "/data/data/luke.launcher/appicons/";
					// Create a file to save the image
					file = new File(path, pack_name+".png");
					OutputStream stream = null;
					stream = new FileOutputStream(file);
					bitmap.compress(Bitmap.CompressFormat.PNG,100,stream);
					stream.flush();
					stream.close();								
				}
				
			} catch (IOException e) {}
			
			String back = "";
            callbackContext.success(back);
		}   
        
     
     
     
        if (action.equals("applay_icon")) 
        {
			String pack_name = data.getString(0);
			String icon_file = data.getString(1);
			
			icon_file = icon_file.replace("file://", "");
			icon_file = icon_file.substring(0, icon_file.indexOf("?"));

			String w_t = data.getString(2);
			String h_t = data.getString(3);
			
			Bitmap bitmap = null;//((BitmapDrawable)appIcon).getBitmap();
			try
			{
				bitmap = BitmapFactory.decodeFile( icon_file );
				bitmap = scaleBitmap(bitmap,Integer.parseInt(w_t),Integer.parseInt(h_t));
				
				if(bitmap!=null)
				{
					File file;
					String path = "/data/data/luke.launcher/appicons/";

					file = new File(path, pack_name);
					OutputStream stream = null;
					stream = new FileOutputStream(file);
					bitmap.compress(Bitmap.CompressFormat.PNG,100,stream);
					stream.flush();
					stream.close();								
				}
			} catch (IOException e) {}
								
			String back = "";
            callbackContext.success(back);
		}
		

		//A Icon from a Iconpack is used for the custom cat icons
        if (action.equals("applay_icon_cat")) 
        {
			File iconcatdir = new File("/data/data/luke.launcher/customcaticons");
			iconcatdir.mkdirs();

			String save_file = data.getString(0);
			String icon_file = data.getString(1);
			
			icon_file = icon_file.replace("file://", "");
			icon_file = icon_file.substring(0, icon_file.indexOf("?"));

			String w_t = data.getString(2);
			String h_t = data.getString(3);
			
			Bitmap bitmap = null;//((BitmapDrawable)appIcon).getBitmap();
			try
			{
				bitmap = BitmapFactory.decodeFile( icon_file );
				bitmap = scaleBitmap(bitmap,Integer.parseInt(w_t),Integer.parseInt(h_t));
				
				if(bitmap!=null)
				{
					File file;
					String path = "/data/data/luke.launcher/customcaticons/";

					file = new File(path, save_file);
					OutputStream stream = null;
					stream = new FileOutputStream(file);
					bitmap.compress(Bitmap.CompressFormat.PNG,100,stream);
					stream.flush();
					stream.close();								
				}
			} catch (IOException e) {}
								
			String back = "";
            callbackContext.success(back);
		}
		
		//A Icon from a Iconpack is used - the drawable name is given
        if (action.equals("applay_icon_iconpack")) 
        {
			String pack_name = data.getString(0);
			String icon_pack =  data.getString(1);
			String drawable = data.getString(2);
		
			String w_t = data.getString(3);
			String h_t = data.getString(4);
		
			
			if(current_icon_pack.equals(icon_pack) == false) //Load Icons for this package...
			{
				current_hash_map = loadIconsPack(icon_pack);
				current_icon_pack = icon_pack;
			}
            
            Bitmap bitmap = null;
            
            if(current_hash_map != null)
            {
				bitmap = get_drawable_from_pack(current_hash_map,icon_pack,drawable);				
			}
			
			try
			{
			
				bitmap = scaleBitmap(bitmap,Integer.parseInt(w_t),Integer.parseInt(h_t));
				
				if(bitmap!=null)
				{
					File file;
					String path = "/data/data/luke.launcher/appicons/";

					file = new File(path, pack_name);
					OutputStream stream = null;
					stream = new FileOutputStream(file);
					bitmap.compress(Bitmap.CompressFormat.PNG,100,stream);
					stream.flush();
					stream.close();								
				}
				
			} catch (IOException e) {}
								
			String back = "";
            callbackContext.success(back);
		}



        //A Icon from a Iconpack is used - the app name is given
        if (action.equals("applay_icon_iconpack_app")) 
        {
			String target_app = data.getString(0);
			String icon_pack =  data.getString(1);
			String w_t = data.getString(2);
			String h_t = data.getString(3);
			
			if(current_icon_pack.equals(icon_pack) == false) //Load Icons for this package...
			{
				current_hash_map = loadIconsPack(icon_pack);
				current_icon_pack = icon_pack;
			}
            
            Bitmap bitmap = null;
            
            if(current_hash_map != null)
            {
				String tmp_drawable = search_app_icon_from_pack(current_hash_map,icon_pack,target_app);
				bitmap = get_drawable_from_pack(current_hash_map,icon_pack,tmp_drawable);			
			}
			
		
			try
			{
				bitmap = scaleBitmap(bitmap,Integer.parseInt(w_t),Integer.parseInt(h_t));
				
				if(bitmap!=null)
				{
					File file;
					String path = "/data/data/luke.launcher/appicons/";

					file = new File(path, target_app+".png");
					OutputStream stream = null;
					stream = new FileOutputStream(file);
					bitmap.compress(Bitmap.CompressFormat.PNG,100,stream);
					stream.flush();
					stream.close();								
				}
				
			} catch (IOException e) {}
							
			String back = "";
            callbackContext.success(back);
		}
		
		
		//A Icon from a iconpack is used for a custom categorie
        if (action.equals("applay_icon_iconpack_cat")) 
        {
			String save_name = data.getString(0);
			String icon_pack =  data.getString(1);
			String drawable = data.getString(2);
		
			String w_t = data.getString(3);
			String h_t = data.getString(4);
		
			File iconcatdir = new File("/data/data/luke.launcher/customcaticons");
			iconcatdir.mkdirs();
			
			if(current_icon_pack.equals(icon_pack) == false) //Load Icons for this package...
			{
				current_hash_map = loadIconsPack(icon_pack);
				current_icon_pack = icon_pack;
			}
            
            Bitmap bitmap = null;
            
            if(current_hash_map != null)
            {
				bitmap = get_drawable_from_pack(current_hash_map,icon_pack,drawable);				
			}
			
			try
			{
				bitmap = scaleBitmap(bitmap,Integer.parseInt(w_t),Integer.parseInt(h_t));
				
				if(bitmap!=null)
				{
					File file;
					String path = "/data/data/luke.launcher/customcaticons/";

					file = new File(path, save_name);
					OutputStream stream = null;
					stream = new FileOutputStream(file);
					bitmap.compress(Bitmap.CompressFormat.PNG,100,stream);
					stream.flush();
					stream.close();								
				}
				
			} catch (IOException e) {}
								
			String back = "";
            callbackContext.success(back);
		}
		
		 
		 
		//Export the settings/Apps to the external storage 
		if (action.equals("exportall")) 
        {
			String data_to_save = data.getString(0);
			try 
			{
				File exportfile = new File(Environment.getExternalStorageDirectory(),"LukeLauncher_backup.txt");
				FileWriter writer = new FileWriter(exportfile);
				writer.write(data_to_save);
				writer.flush();
				writer.close();
				
			} 
			catch (IOException e) {}
        
			String back = "Exported";
            callbackContext.success(back);
		}
		
	    //Import settings/Apps from the external storage
		if (action.equals("importall")) 
        {
			File importfile = new File(Environment.getExternalStorageDirectory(),"LukeLauncher_backup.txt");

			StringBuilder text = new StringBuilder();

			try 
			{
				BufferedReader br = new BufferedReader(new FileReader(importfile));
				String line;

				while ((line = br.readLine()) != null)
				{
					text.append(line);
				}
				br.close();
			}
			catch (IOException e) {}
        
			String back = text.toString();
            callbackContext.success(back);
		}
		
		
		//When a App is uninstalled, remove the Icon
		if (action.equals("remove_icon")) 
        {
			String icon_rm = data.getString(0);
			try 
			{
				File file;
				String path = "/data/data/luke.launcher/appicons/";
				file = new File(path, icon_rm);
				file.delete();	
				
			} 
			catch (Exception e) {}

			String back = "Icon deleted: "+icon_rm;
            callbackContext.success(back);
		}
		
		
		
		//When a App is uninstalled, remove the Icon
		if (action.equals("start_shortcut")) 
        {
			
			try 
			{
				String package_name =  data.getString(0);
				String id =  data.getString(1);
				String user = data.getString(2);
		
				int uid = Integer.parseInt(user);
				Parcel userParcel = Parcel.obtain();
				userParcel.writeInt(uid);
				userParcel.setDataPosition(0);
				UserHandle new_ush =  new UserHandle(userParcel);
							
				Context cc = this.cordova.getActivity().getApplicationContext();
			 
				final LauncherApps launcherApps = (LauncherApps) cc.getSystemService(Context.LAUNCHER_APPS_SERVICE);
			
				launcherApps.startShortcut(package_name,id ,null, null, new_ush);				
				
			} 
			catch (Exception e) {}

            callbackContext.success("ok");
		}
				
 
        return false;
    }
}







