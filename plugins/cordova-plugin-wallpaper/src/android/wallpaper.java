package fc.fcstudio;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.WallpaperManager;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import org.apache.cordova.PluginResult;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStream;
import java.net.URL;
import android.content.ContentResolver;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.app.Activity;
import android.os.Environment;
import org.apache.cordova.LOG;

import android.util.DisplayMetrics;

public class wallpaper extends CordovaPlugin
{
	

	public Context context = null;
	private static final boolean IS_AT_LEAST_LOLLIPOP = Build.VERSION.SDK_INT >= 21;
	
	//private static long old_hash = 0;
	
	/*
	 Simple Hash function for Wallpaer compare
	 Should be fast, not all points are compared...
	 */
	public long hashBitmap(Bitmap bmp)
	{
		long hash = 0;
	
		hash = hash + bmp.getPixel(0,0);
		hash = hash + bmp.getPixel(bmp.getWidth()-1,bmp.getHeight()-1);
	
		for(int x = 0; x < bmp.getWidth(); x = x + 70)
		{
			for (int y = x; y < bmp.getHeight(); y = y + 70)
			{
				hash = hash + (bmp.getPixel(x,y));
			}
		}
		return hash;
	}

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException
	{
		context = IS_AT_LEAST_LOLLIPOP ? cordova.getActivity().getWindow().getContext() : cordova.getActivity().getApplicationContext();
		String imgSrc = "";
		
		if (action.equals("start"))
		{
			boolean back = echo("", context);
			
			if(back==true)
			{
				callbackContext.success("update");
				return true;
			}
			else
			{
				callbackContext.error("nope");
				return false;
			}
		}
		
		if (action.equals("getImageID"))
		{
						
				final WallpaperManager wallpaperManager;
				
				int back = -1;
				try
				{
					if (Build.VERSION.SDK_INT >= 24 )
					{
						try
						{
							wallpaperManager = WallpaperManager.getInstance(context);
							back = wallpaperManager.getWallpaperId(WallpaperManager.FLAG_SYSTEM);			
						}
						catch (Exception e){}
					}
					
				}
				catch (Exception e){}
					
				callbackContext.success(Integer.valueOf(back));
				return false;

		}
		
		callbackContext.error("nope");	
		return false;
	}

	public boolean echo(String image, Context context)
	{
				final WallpaperManager wallpaperManager;
				final Drawable wallpaperDrawable;
				Bitmap bitmap;
				boolean back = false;
				
				//long new_hash;
				
					try
					{
						wallpaperManager = WallpaperManager.getInstance(context);
				
						wallpaperDrawable = wallpaperManager.getDrawable();
						bitmap = ((BitmapDrawable)wallpaperDrawable).getBitmap();
						
						
						//new_hash = hashBitmap(bitmap);
					}
					catch (Exception e)
					{
						return false;
					}
					
					/*
					*Performance Hashing to detect a new wallpaper fast 
					*/
					//if(new_hash != old_hash) //Compare the wallpaper ...might not be written to the Filesystem
					//{
						
					try
					{
						File file;
						String path = "/data/data/luke.launcher/";
						file = new File(path, "wallpaper"+".jpg"); //Wallpaper is always named wallpaper.jpg
						OutputStream stream = null;
						stream = new FileOutputStream(file);
						bitmap.compress(Bitmap.CompressFormat.JPEG,100,stream);
						stream.flush();
						stream.close();
						back = true;
					}
					catch (IOException e)
					{
						LOG.e("lukelauncher", "Wallpaper fail");
					}
					//}
					//old_hash = new_hash;
					
				return back;
	}
}
