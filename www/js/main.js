/* jshint shadow:true */
/*jshint funcscope:true*/
/*jshint maxerr: 10000 */
var all_apps = [];	//Array containing all apps of the launcher

//
//
//Global Variables
//
//
var current_view = null;

var startpage = "";
var black_white = "";
var clock = "";
var color_text = "";
var color_text_homescreen = "";
var read = "";
var lang = "eng";
var old_app_name = "";
var clock_app = "";
var date_app = "";
var statusbar_state = "1";
var searching = 0;
var black_white_homescreen = 0;
var show_hidden = 0;
var nav_bar_state = 0;
var nav_bar_padding = 11;
var status_bar_padding = 11;
var homescreen_nofitications = 0;
var font_size_header = 70;
var font_size_app = 80;
var font_size_homescreen = 80;

var spalten_homescreen = 5;
var zeilen_homescreen  = 5;

var spalten_appdrawer = 5;
var appdrawer_horizontal = 3;
var appdrawer_vertical = 3;

var cat_anz = 10;			// 7 => 6+1 (1 Is the Homescreen) How many different Categories are present
var hidden_cat = 1001;		//The Categorie Number for all hidden Apps

var default_cats = 1;		//1 uses The default cat, otherwise the provide cat list array is used
var cat_icon_size = 10;

var appdrawer_icon_size = "10";

var cat_open_time = 0;
var appdrawer_align = "l";
var swipe_mode = "r";

var bottom_padding_zero = "0";

var appdrawer_font = "";
var homescreen_font = "";

//Used to select Iconpack
var disp_current_iconpack = "";
var iconpack_timer = null;

//Das globale IconPack
var global_icon_pack = "default";

//Orientation
var orient_mode = "";
 
//These arrays are filled when a new app is installed
var cat_1_new = [];
var cat_2_new = [];
var cat_3_new = [];
var cat_4_new = [];
var cat_5_new = [];
var cat_6_new = [];

//Save the current Categories...
var cat_array = []; 

var force_update_applist = 1;   

var new_indicator_width = -1;

var startx = 0;
var starty = 0;

var name_field = null;

var padding_top_input_time_tmp = 0;	 //Temp Var Preview padding top
var padding_bottom_input_time_tmp = 0;	 //Temp Var Preview padding top

var should_wait_loadscreen = 1; //Show longer loading screen...

var update_search_div_speed_up; //Avoid Redraws - used by update_search_div()
var update_search_div_speed_up_zeilen = 0; //Avoid Redraws - used by update_search_div()


//To recive the device padding..
var nav_pad_tmp = -1;
var status_pad_tmp = -1;

var loading_finished = 0; //Set to 1 after all saved apps are loaded...	
	
var hct = null;
var hctb = null;
var hdt = null;

//App names for appstores - when started, an app list update is triggered
var app_stores = [
"com.android.settings",
"org.fdroid.fdroid",
"com.github.yeriomin.yalpstore",
"com.android.vending",
"com.android.playstore",
"com.aurora.store",
"subreddit.android.appstore",
];
	
//Array with the title of every categorie    
var kat_list = [];	
	
var long_click_timeout = 800; //800 Milliseconds timeout for a long click
var type_of_touch = 0;
var current_kat = -1; //The current categorie

var redipsInit; // define redipsInit variable
var toggleAnimation; // enable / disable animation
var startPositions; // remember initial positions of DIV elements
var	pos = {}; // initial positions of DIV elements
var	rd = REDIPS.drag; // reference to the REDIPS.drag lib
var should_update = 0;		//If things should be updated
var tmp_date_counter = 0;
var app_move_mode = 0; 			//Is one,when Apps are moved arround
var current_cell_element;	//The current Cell which is dragged arroung
var current_cell_element_html; //The current Cell -> innerhtml
var fade_speed_settings = 50;	//FadeSpeed for the Settings
var fade_speed_app_drawer = 30;	//FadeSpeed for a App Categorie switch
var fade_speed_loading = 1000; 	//FadeSpeed when the loadinscreen dissapears

var still_in_settings = 0; //If an event occures, while the settings are applied

var pickerFixed1 = null; //Color picker for the app font color
var pickerFixed2 = null; //Color picker for the homescreen color

var fontSize_getComputedStyle_speedup = -1;//Reduce redraws...

var move_x = 0;	//Movement when touched
var move_y = 0; //Movement when touched

var mySwiper = null;
//When a categorie icon is changed...
var cat_row = "";

//Link Icon/Replace Icon Size:
var new_icon_width = "512";
var new_icon_height = "512";

//Longpress timers..
var long_press_cat_timer = null; //Lonpress timer Appcaticon
var home_touch_start_timer = null; //Longpress timer Clock/Date Homescreen

//All the functions

//Creates all App Categories
function applay_cats(in_cat_list_arary)
{
	"use strict";
	
	cat_anz = in_cat_list_arary.length+1;
	var table_cats = document.getElementById("cat");
	for(var i = table_cats.rows.length - 1; i >= 0; i--)
	{
		table_cats.deleteRow(i);
	}

	var full_string = "";
	for(var i2 = 1; i2 < cat_anz; i2++)
	{		
		var icon = in_cat_list_arary[i2-1][0];		
		full_string = "<td ontouchend='cat_touch_end()' ontouchstart='open_categorie(event, document.getElementById("+i2+") );' id='"+i2+"' class='redips-trash'><div id='div_"+i2+"_item' class='cat_item'><img id='"+i2+"_png' src='"+icon+"'></div></td>";	

		var new_row = table_cats.insertRow(-1);	
		new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
	}
	
	
	//Select the active one..
	if(current_kat>0)
	{
		document.getElementById(current_kat).parentElement.classList.add("active_right");
		try
		{ 
			//Move the indicator...
			var x = document.querySelectorAll(".active_right");
			var ot = 0;
			var oh = 0;
			for (var i = 0; i < x.length; i++)
			{
					ot = x[i].offsetTop;
					oh = x[i].offsetHeight;
					break;
			}
			var cat_h = document.getElementById("cat").style.top;
			cat_h = parseInt( cat_h.replace("px","") );
			document.getElementById("right").style.top = cat_h + ot +"px";
			document.getElementById("right").style.height = oh+"px";
			
			var new_indicator_width = document.getElementById("1_png").offsetWidth;
			document.getElementById("right").style.width = (new_indicator_width/100)*15+"px";
			
			var x = document.querySelectorAll(".new_app");
			for (var i = 0; i < x.length; i++)
			{
					var cat_p = x[i].id;
					cat_p = cat_p.replace("_new","");
					unset_new_cat(cat_p);
					set_new_cat(cat_p);
			}
		}
		catch (e)
		{
		}
	}	
	
}


//If the toch on a Categorie Icon ends
function cat_touch_end()
{
	"use strict";
	type_of_touch = 3;
}
 
 

//Functions check if this is a long touch or a "normal" touch
function long_touch_check(in_x, in_y) 
{
	"use strict";
	
    if (type_of_touch == 1) 
    { 
		/*
		var dist_x = in_x - mySwiper.config.currentX; //mySwiper.touches.currentX
		var dist_y = in_y - mySwiper.config.currentY; //mySwiper.touches.currentY
		if(dist_x<0){dist_x = dist_x*-1;}
		if(dist_y<0){dist_y = dist_y*-1;}
		*/
		
		var dist_x_m = in_x - move_x;
		var dist_y_m = in_y - move_y;
		if(dist_x_m<0){dist_x_m = dist_x_m*-1;}
		if(dist_y_m<0){dist_y_m = dist_y_m*-1;}

		//Still pressing, so its a long press
		type_of_touch = 3;
		
		//Check if there is to much movement	
		/*
		if( pxTOvw(dist_x) > 2){return;}		
		if( pxTOvh(dist_y) > 2){return;}		
		*/
		
		if( pxTOvw(dist_x_m) > 2){return;}
		if( pxTOvh(dist_y_m) > 2){return;}	


		var all_elements = getAllElementsFromPoint(in_x, in_y);
		var return_element = null;
	  
		for (var counter=0; counter<all_elements.length; counter++)
		{
			var current_class =  all_elements[counter].getAttribute("class"); 
	   
			if( current_class == "swiper-container")
			{
				if(current_view=="homescreen")
				{
					show_settings();
					open_homescreen_settings();
				}	
			}
			
			if (current_class == "gallery redips-drag") 
			{
				return_element = all_elements[counter];
				break;
			}

			if (current_class == "normal_app") 
			{
				return_element = all_elements[counter];
				break; 
			}
			
			if (current_class == "hidden_app") 
			{
				return_element = all_elements[counter];
				break;
			}      
			
			if (current_class == "desc") 
			{
				return_element = all_elements[counter];
				break;
			}
			
			if (current_class == "home_table_icon redips-drag") 
			{
				if(current_view=="homescreen")
				{
					edit_homescreen_table();
				}
				return;
			}
			if (current_class == "home_table_icon_blank") 
			{
				if(current_view=="homescreen")
					{
						edit_homescreen_table();
					}
				return;
			}
			
			if (current_class == "home_icon_read")
			{
				if(current_view=="homescreen")
				{
					edit_homescreen_table();
				}
				return;
			}
			
			
			if (current_class == "redips-trash")
			{
				if(current_view=="appdrawer")
				{
					show_settings();
					open_appdrawer_settings();
					open_cat_settings();
				}
				return;
			}
			   
		}

		if (return_element != null)
		{
			open_app_settings(return_element);
		}

	}

}


//Returning all Elements at a special (touch) position
function getAllElementsFromPoint(x, y)
{
	"use strict";
    var elements = [];
    var display = [];
    var item = document.elementFromPoint(x, y);
    while (item && item !== document.body && item !== window && item !== document && item !== document.documentElement)
    {
        elements.push(item);
        display.push(item.style.display);
        item.style.display = "none";
        item = document.elementFromPoint(x, y);
    }
    // restore display property
    for (var i = 0; i < elements.length; i++)
    {
        elements[i].style.display = display[i];
    }
    return elements;
}



//Functions to convert viewport and Pixel 
//Based on: https://codepen.io/mooshmassacre/pen/xOrQLE
function vhTOpx(value)
{
	"use strict";
	var  e = document.documentElement;
	var  y =  e.clientHeight;//win.innerHeight|| e.clientHeight|| g.clientHeight;
	return (y*value)/100;
}


//Functions to convert viewport and Pixel 
//Based on: https://codepen.io/mooshmassacre/pen/xOrQLE
function vwTOpx(value) 
{
	"use strict";
	var  e = document.documentElement;
	var  x = e.clientWidth;
    var result = (x * value) / 100;
    return result;
}


//Functions to convert viewport and Pixel 
//Based on: https://codepen.io/mooshmassacre/pen/xOrQLE
function pxTOvw(value)
{
	"use strict";
	var  e = document.documentElement;
    var  x = e.clientWidth;//win.innerWidth || e.clientWidth || g.clientWidth;
    return (100 * value) / x;
}


//Functions to convert viewport and Pixel 
//Based on: https://codepen.io/mooshmassacre/pen/xOrQLE
function pxTOvh(value)
{
	"use strict";
	var  e = document.documentElement;
    var  y = e.clientHeight;//win.innerHeight || e.clientHeight || g.clientHeight;
    return (100 * value) / y;
}



//Function to set transparenz on the Appdrawer
function set_tranz()
{
	"use strict";
	var read_tmp = read/100;
	var read_tmp_apps = read_tmp - 0.20; //20% Diff between apps and nav...
	if(read_tmp_apps<0)
	{
		read_tmp_apps = 0;
	}
    document.getElementById("cat_bg").style.backgroundColor = "rgba(0, 0, 0, "+read_tmp+")";
    document.getElementById("header").style.backgroundColor = "rgba(0, 0, 0, "+read_tmp+")";
    document.getElementById("header_blank").style.backgroundColor =  "rgba(0, 0, 0, "+read_tmp+")";
    document.getElementById("app_ba").style.backgroundColor = "rgba(0, 0, 0, "+read_tmp_apps+")";
    document.getElementById("appsettings_ba").style.backgroundColor = "rgba(0, 0, 0, "+read_tmp_apps+")";
}



//When the clock changes
function tg_clock()
{
	"use strict";
    if (document.getElementById("tg_clock").checked == true)
    {
		document.getElementById("tg_sek_lable").style.display = 'block';
		document.getElementById("tg_bhour_lable").style.display = 'block';
		document.getElementById("tg_date_lable").style.display = 'block';
		document.getElementById("datum_formats_radio").style.display = 'block';
		document.getElementById("tg_bg_lable").style.display = 'block';
		document.getElementById("tg_alarmclock_lable").style.display = 'block';
        select_datum_format();
    } 
    else
    {
        document.getElementById("tg_bg_lable").style.display = "none";
        document.getElementById("tg_sek_lable").style.display = "none";
        document.getElementById("tg_bhour_lable").style.display = "none";
        document.getElementById("tg_date_lable").style.display = "none";
        document.getElementById("datum_formats_radio").style.display = "none";
        document.getElementById("tg_alarmclock_lable").style.display = "none";
        clock = "0";
    }
}


//When the clock settings are changed
function update_clock_settings()
{	
	"use strict";
	var bold_hours = "";
	var show_seconds = "";
	var date_f = "";
	var color_f = "";
	var background_clock = "";
	var show_alarm = "1";
	
    if (document.getElementById("tg_sek_tg").checked == true) { show_seconds = "1";} else {show_seconds = "0";}
    if (document.getElementById("tg_bhour_tg").checked == true) {bold_hours = "1";} else {bold_hours = "0";}
    if (document.getElementById("tg_clock_tg").checked == true) {show_alarm = "1" ;} else {show_alarm = "0";}
    
	if (document.getElementById("tg_date_tg").checked == true) 
	{
		date_f = "1";	
		//Optimize in future
		if (document.getElementById("datum_1").checked == true) {date_f = "1";}
		if (document.getElementById("datum_2").checked == true) {date_f = "2";}	
		if (document.getElementById("datum_3").checked == true) {date_f = "3";}	
		if (document.getElementById("datum_4").checked == true) {date_f = "4";}	
		if (document.getElementById("datum_5").checked == true) {date_f = "5";}	
		if (document.getElementById("datum_6").checked == true) {date_f = "6";}	
		if (document.getElementById("datum_7").checked == true) {date_f = "7";}	
		if (document.getElementById("datum_8").checked == true) {date_f = "8";}	
		if (document.getElementById("datum_9").checked == true) {date_f = "9";}	
		if (document.getElementById("datum_10").checked == true) {date_f = "10";}	
		if (document.getElementById("datum_11").checked == true) {date_f = "11";}	
		if (document.getElementById("datum_12").checked == true) {date_f = "12";}					
	} 
	else
	{
		date_f = "0";
    }
	color_f = color_text_homescreen;
	
	if (document.getElementById("tg_back_tg").checked == true) 
	{
		background_clock = "1";
    }
    else 
    {
		background_clock = "0";
	}
	
	update_next_alarm();
	
	clock = bold_hours + "-" + show_seconds + "-" + date_f + "-" + color_f + "-" + background_clock + "-" + show_alarm;
	
	//ReInit ticken
	ticken();
}


//When the clock background changed  transparent/not transparent
function tg_clock_bg() 
{
	"use strict";
	update_clock_settings();
}


//When the clock display seconds changed
function tg_clock_sec() 
{
	"use strict";
	update_clock_settings();
}


//When the clock hour (bold hours) changed
function tg_clock_hour() 
{
	"use strict";
	update_clock_settings();
}

//When the show of the alarm clock changed
function tg_alarm_clock() 
{
	"use strict";
	update_clock_settings();
}

//When the date representation changed
function datum_change() 
{
	"use strict";
	update_clock_settings();
}

//Function is called to select different Date Presentations
function select_datum_format()
{
	"use strict";
    if (document.getElementById("tg_date_tg").checked == true) 
    {
        document.getElementById("datum_formats_radio").style.display = 'block';

        if( document.getElementById("datum_1").checked == false && document.getElementById("datum_2").checked == false && document.getElementById("datum_2").checked == false)
        {
			document.getElementById("datum_1").checked = true;
			update_clock_settings();
		}   
    } 
    else 
    {
        document.getElementById("datum_formats_radio").style.display = "none";
    }
    update_clock_settings();
}


//Function for applayin changes clock Settings
function update_homescreen_clock_position() 
{
	"use strict";
	if( clock=="" || clock == "0")
	{
		document.getElementById("tg_bg_lable").style.display = "none";
        document.getElementById("tg_sek_lable").style.display = "none";
        document.getElementById("tg_bhour_lable").style.display = "none";
        document.getElementById("tg_date_lable").style.display = "none";
        document.getElementById("datum_formats_radio").style.display = "none";
		return;
	}
	
	var homescreen_tmp_vis = 0;

	if( window.getComputedStyle(document.getElementById("homescreen")).display != "block" )
	{
		homescreen_tmp_vis = 1;
		document.getElementById("homescreen").style.display = 'block';
	}

	var elem1 = document.getElementById("homescreen_clock_text");
	var elem2 = document.getElementById("homescreen_clock_text_b");
	var elem3 = document.getElementById("homescreen_datum_text");
	
	var elem4 = document.getElementById("homescreen_alarm_text");
	
	if(elem1 == null)
	{
		return;
	}
	
	elem1.style.fontSize = "0px"; 
	elem2.style.fontSize = "0px"; 
	elem3.style.fontSize = "0px";
	elem4.style.fontSize = "0px";
		
	var ftmp = ((window.outerHeight/100)*33.3)/100   * (100-font_size_homescreen) ;

	var max_h = parseInt( document.getElementById('homescreen_out_clock').offsetHeight - vhTOpx(4) - ftmp);
	var max_w = (window.innerWidth/100)*75; //Max 75% width
	
	var c = 0;	
	var note_break = 0;
	var clock_height = 0;
	//Scale Faktor
	var clock_text_factor = 2;
	var datum_text_factor = 0.6;
	var alarm_text_factor = 0.3;
	
	while(true)
	{
		c = c + 20;
		note_break = note_break + 1;

		elem1.style.fontSize = (c * clock_text_factor) + "px"; 
		elem2.style.fontSize = (c * clock_text_factor) + "px"; 
		elem3.style.fontSize = (c * datum_text_factor) + "px";
		elem4.style.fontSize = (c * alarm_text_factor) + "px";
		
		clock_height = parseInt(document.getElementById('homescreen_clock').offsetHeight);
		if( clock_height > max_h){break;}
		if(note_break > 2000){break;}
	}
	
	c = c - 21;
	
	while(true)
	{
		c = c + 5;
		note_break = note_break + 1;

		elem1.style.fontSize = (c * clock_text_factor) + "px"; 
		elem2.style.fontSize = (c * clock_text_factor) + "px"; 
		elem3.style.fontSize = (c * datum_text_factor) + "px";
		elem4.style.fontSize = (c * alarm_text_factor) + "px";
		
		clock_height = parseInt(document.getElementById('homescreen_clock').offsetHeight);
		if( clock_height > max_h){break;}
		if(note_break > 2000){break;}
	}
	
	c = c - 6;
	if(c<0)
	{
		c = 5; //Minimum Clock Size
		if(font_size_homescreen == 0)
		{
			c = -1;
		}
	}

	while(true)
	{
		c = c + 1;
		note_break = note_break + 1;
		
		elem1.style.fontSize = (c * clock_text_factor) + "px"; 
		elem2.style.fontSize = (c * clock_text_factor) + "px"; 
		elem3.style.fontSize = (c * datum_text_factor) + "px";
		elem4.style.fontSize = (c * alarm_text_factor) + "px";
		
		clock_height = parseInt(document.getElementById('homescreen_clock').offsetHeight);
		if( clock_height > max_h){break;}
		if(note_break > 2000){break;}
	}
	
	
	note_break = 0;

	while(true)
	{
		var clock_width =parseInt(document.getElementById('homescreen_clock_green').offsetWidth);
		
		if( clock_width < max_w){break;}
		c = c - 1;
		elem1.style.fontSize = (c * clock_text_factor) + "px"; 
		elem2.style.fontSize = (c * clock_text_factor) + "px"; 
		elem3.style.fontSize = (c * datum_text_factor) + "px"; 
		elem4.style.fontSize = (c * alarm_text_factor) + "px";
		
		if(note_break > 2000){break;}
	}	
	


    if(homescreen_tmp_vis == 1 )
	{
		document.getElementById("homescreen").style.display = "none";
		homescreen_tmp_vis = 0;
	}


}

//Used to swap app_drawer and homescreen
function swapNodes(n1, n2) 
{
    var p1 = n1.parentNode;
    var p2 = n2.parentNode;
    var i1, i2;
    if ( !p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1) ) return;

    for (var i = 0; i < p1.children.length; i++) {
        if (p1.children[i].isEqualNode(n1)) {
            i1 = i;
        }
    }
    for (var i = 0; i < p2.children.length; i++) {
        if (p2.children[i].isEqualNode(n2)) {
            i2 = i;
        }
    }

    if ( p1.isEqualNode(p2) && i1 < i2 ) {
        i2++;
    }
    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
}


//Init of the idangero swiper lib
function init_swiper(start)
{
	"use strict";
	if( swipe_mode=="l")
	{
		swapNodes(document.getElementById("app_drawer"),document.getElementById("homescreen"));
	}
	

	if(start == 0 && swipe_mode=="r") //Start 0 is the Appdrawer -> 1 starts at the Homescreen
	{
		mySwiper = new Swiper('.swiper-container',{
	    mode:'horizontal',
	    effect:'slide',
	    loop:false,
	    allowSlidePrev:false,
	    allowSlideNext:true,
	    speed:150,
		initialSlide: start,
		polyfill: false,
		passiveListeners:true,
		
		excludeElements: [document.getElementById("cat")],
		});
		
		
	}
	
	if(start == 1 && swipe_mode=="r") //Start 0 is the Appdrawer -> 1 starts at the Homescreen
	{
		mySwiper = new Swiper('.swiper-container',{
	    mode:'horizontal',
	    effect:'slide',
	    watchSlidesProgress:true,
	    loop:false,
	    allowSlidePrev:true,
	    allowSlideNext:false,
	    speed:150,
		initialSlide: start,
		polyfill: false,
	    passiveListeners:true,
	    
	    excludeElements: [document.getElementById("cat")],
		});
		
	}

	if(swipe_mode=="l")
	{
		mySwiper = new Swiper('.swiper-container',{
	    mode:'horizontal',
	    effect:'slide',
	    watchSlidesProgress:true,
	    loop:false,
	    allowSlidePrev:true,
	    allowSlideNext:false,
	    speed:150,
		initialSlide: 1,
		polyfill: false,
		passiveListeners: true,
		
		excludeElements: [document.getElementById("cat")],
		});


		//mySwiper.addSlide(1,document.getElementById("app_drawer"));
		//mySwiper.addSlide(0,document.getElementById("homescreen"));	
		//swapNodes(document.getElementById("app_drawer"),document.getElementById("homescreen"));	
	}

	
	mySwiper.on('after-slide',function(i)
	{
		type_of_touch = 3; //As there is movement
		if(i==0)
		{
			if(swipe_mode=="l")
			{
				current_view = "homescreen";
			}
			else
			{
				current_view = "appdrawer";
			}
			//current_view = "appdrawer";
		}
		else
		{
			//current_view = "homescreen";
			
			if(swipe_mode=="l")
			{
				current_view = "appdrawer";
			}
			else
			{
				current_view = "homescreen";
			}
		}
		
	});
	
	
	/*
	mySwiper.on('slideChange', function () 
	{
		type_of_touch = 3; //As there is movement
			
		if(mySwiper.realIndex== 1)
		{
			mySwiper.allowSlidePrev = true;
			mySwiper.allowSlideNext = false;
			
			if(swipe_mode=="l")
			{
				current_view = "appdrawer";
			}
			else
			{
				current_view = "homescreen";
			}
			mySwiper.virtualTranslate = true;

		}

		if(mySwiper.realIndex == 0)
		{
			mySwiper.allowSlidePrev = false;
			mySwiper.allowSlideNext = true;

			if(swipe_mode=="l")
			{
				current_view = "homescreen";
			}
			else
			{
				current_view = "appdrawer";
			}
		}
		
	});
	*/
	
	if(start==0 && swipe_mode=="l" )
	{
		current_view 
	}
	

}



//Function when the back Button was pressed or the BackIcon in the Settings
function back_function()
{
	"use strict";
	//Stop movement of apps
	if(current_view == "homescreen" && app_move_mode == 1) 
	{ 
		end_appmove_homescreen();
		return;
	}
	
	if(current_view == "appdrawer" && app_move_mode == 1)
	{ 
	   end_appmove_appdrawer();
	   return;
	}
	
	
	if (should_update == 1 )
	{
		update_app_position();
		should_update = 0;
	}
	
    if(force_update_applist==1)
	{
		force_update_applist = 0;
		compare_apps_with_installed_apps();
	}



	if(show_hidden==1)
	{
		document.getElementById("Cat_name_text").textContent = cat_array[current_kat][1];//kat_list[current_kat];
		document.getElementById("scrollable").style.display = 'block';
		document.getElementById("table_apps_cat"+current_kat).style.left = "0vw";
		document.getElementById("table_current_apps").style.display = 'none';
		document.getElementById("showhiddenappslielement").style.display = 'block';
		  
		if(  window.getComputedStyle(document.getElementById("appsettings")).display == "block" ) //Hide Dropdown menu
		{
			end_app_settings();
			show_all_hidden_apps();
		}
		else
		{
			end_app_settings();
			show_hidden = 0;
		}
		return;
	}
   
   
	if(window.getComputedStyle(document.getElementById("asknotifi_dialog")).display != "none"  )
	{
		return;
	}
		
	
	if(window.getComputedStyle(document.getElementById("askimport_dialog")).display != "none"  )
	{
		return;
	}
		   
	if(window.getComputedStyle(document.getElementById("askresort_dialog")).display != "none"  )
	{
		return;
	}		   
	
	
		   
   	if(  window.getComputedStyle(document.getElementById("icon_dialog_cat_bg")).display == "block" )
	{
		hide_icon_select_cat();
		return;
	}
	
	var second_setting_visble = 0;
   	var all_second_setting_divs = document.getElementsByClassName('second_settings');
	for (var i = 0; i < all_second_setting_divs.length; i++) 
	{
		var style = window.getComputedStyle( all_second_setting_divs[i]).display;
		if( style == "flex" || style == "block"){
			second_setting_visble = 1;
			break;
		}
	}  
	
	var third_setting_visble = 0;
   	var all_third_setting_divs = document.getElementsByClassName('third_settings');
	for (var i = 0; i < all_third_setting_divs.length; i++) 
	{
		var style = window.getComputedStyle( all_third_setting_divs[i]).display;
		if( style == "flex" || style == "block"){
			third_setting_visble = 1;
			break;
		}
	}  
	
	if( second_setting_visble == 1 )
	{
     
		var all_second_setting_divs = document.getElementsByClassName('second_settings');
		for (var i = 0; i < all_second_setting_divs.length; i++) 
		{
			all_second_setting_divs[i].style.display = "none";
		}  

		document.getElementById('allsettings').style.display = "flex";

		setTimeout(function()
		{
			update_homescreen_clock_position();
		},3700);

		setTimeout(function()
		{ 
			applay_settings(get_current_settings());
			new_font_size_adjust();
		},100); //Small Delay-smoother Ui
			
		return;
    }
    
    
    if( third_setting_visble == 1 )
	{
     
		var show_app_drawer = 0;
		var show_extra = 0;
		var all_third_setting_divs = document.getElementsByClassName('third_settings');
		
		for (var i = 0; i < all_third_setting_divs.length; i++) 
		{
			var tmp_style = window.getComputedStyle( all_third_setting_divs[i]).display;
			if(tmp_style != "none")
			{
				var tmp_id = all_third_setting_divs[i].id;
				
				if(tmp_id=="settings_appdrawericonsize_div" || tmp_id == "settings_appdrawerfont_div" || tmp_id == "settings_swipe_div" || tmp_id == "settings_colortext_div" || tmp_id == "settings_cat_div" || tmp_id == "settings_read_div" || tmp_id=="settings_align_div" )
				{
					show_app_drawer = 1;
				}
				
				if(tmp_id == "settings_info" )
				{
					show_extra = 1;
				}
				
			}
			
			all_third_setting_divs[i].style.display = "none";
		}  

		if(show_app_drawer == 1)
		{
			document.getElementById('allsettings').style.display = "none";
			document.getElementById('settings_appdrawer_div').style.display = "flex";
		}
		else if(show_extra == 1)
		{
			document.getElementById('allsettings').style.display = "none";
			document.getElementById('settings_extra_div').style.display = "flex";
		}
		else
		{
			document.getElementById('allsettings').style.display = "none";
			document.getElementById('homescreen_div').style.display = "flex";
		}
		
		setTimeout(function()
		{
			update_homescreen_clock_position();
		},3700);

		setTimeout(function()
		{ 
			applay_settings(get_current_settings());
			new_font_size_adjust();
		},100); //Small Delay-smoother Ui
		
		return;
    }
    
	end_search();
	
	if(  window.getComputedStyle(document.getElementById("icon_dialog_bg")).display == "block" )
	{
		hide_icon_select();
		return;
	}
	
	
	if(  window.getComputedStyle(document.getElementById("appsettings")).display == "block" )
	{
		end_app_settings();
		return;
	}
		

	if(window.getComputedStyle(document.getElementById("allsettings")).display == "flex"  )
	{		
        document.getElementById("header").style.display = "block";
        document.getElementById("cat").style.display = "table";
        document.getElementById("cat_bg").style.display = "block";
		document.getElementById("scrollable").style.display = "block";
		document.getElementById("table_apps_cat"+current_kat).style.left = "0vw";
		document.getElementById("app_ba").style.display = "block";
		document.getElementById("settings_ba").style.display = "none";
		document.getElementById("allsettings").style.display = "none";
		document.getElementById("homescreen").style.display = "block";
		document.getElementById("app_drawer").style.display = 'block';
		
		var header_blank_obj =  document.getElementById("header_blank");
		header_blank_obj.style.display = "block";
		header_blank_obj.style.height = status_bar_padding+"px";
		
		document.getElementById("swiper_container").style.display = 'block';
		
		init_swiper(0);
		
		resize();
        return;
    }

	
	if (current_view == "appdrawer" )
	{
		//To Show the homescreen agian
		if(swipe_mode=="r")
		{
			//mySwiper.slideNext();
			if(mySwiper!= null){mySwiper.scroll(1, true);}
		}
		else
		{
			if(mySwiper!= null){mySwiper.scroll(0, true);}
			//mySwiper.slidePrev();
		}
    }
}




//For Updateing the clock on the homescreen
// Function is called every second
var old_date = "";
var ticken_timer_obj = null;
function ticken()
{
	"use strict";
	try
	{
		clearInterval(ticken_timer_obj);
	}
	catch (error)
	{
	}
	
    if (clock != "0") //Show the clock
    {
        tmp_date_counter = tmp_date_counter + 1;
        
        var array_s = clock.split("-");

        var bold_hours = array_s[0];
        var show_seconds = array_s[1];
        var datum = array_s[2];
        
        var alarm_clock = array_s[5];
        
        var stunden, minuten, sekunden;
        var StundenZahl, MinutenZahl, SekundenZahl;
        var heute;

        heute = new Date();
        StundenZahl = heute.getHours();
        MinutenZahl = heute.getMinutes();
        SekundenZahl = heute.getSeconds();

        if (StundenZahl < 10)
        {
            stunden = "0" + StundenZahl; // Leading Zero
            //stunden = StundenZahl;	 //Without leading Zero
        }
        else
        {
            stunden = StundenZahl;
        }


        if (MinutenZahl < 10)
        {
            minuten = "0" + MinutenZahl;
        }
        else
        {
            minuten = MinutenZahl;
        }
        if (SekundenZahl < 10)
        {
            sekunden = "0" + SekundenZahl + " ";
        }
        else
        {
            sekunden = SekundenZahl + " ";
        }

		var zeit = "";
        if (show_seconds == 0 || show_seconds == "0")
        {
            sekunden = "";
            zeit = ":"+minuten;
        }
        else
        {
            zeit =  ":"+minuten + ":" + sekunden;
        }

	
	    var datum_f = "";
	    if (datum == "0")
	    {
			datum_f = "";
	    }
	
	    if (datum == "1"){ datum_f = dayjs().locale('de').format('DD.MM.YYYY');}
		if (datum == "2"){ datum_f = dayjs().locale('de').format('DD.MM.YY');}
		if (datum == "3"){ datum_f = dayjs().locale('de').format('DD.MM');}
		if (datum == "8"){ datum_f = dayjs().locale('de').format('MM.DD.YYYY');}
		if (datum == "9"){ datum_f = dayjs().locale('de').format('MM.DD.YY');}
		if (datum == "10"){ datum_f = dayjs().locale('de').format('MM.DD');}
			

	    if(lang == "eng")
		{				
			if (datum == "4"){datum_f = dayjs().locale('en').format('D. MMMM'); }
			if (datum == "5"){datum_f = dayjs().locale('en').format('dddd, D. MMMM'); }
			if (datum == "6"){datum_f = dayjs().locale('en').format('dd, DD.MM.YY'); }
			if (datum == "7"){datum_f = dayjs().locale('en').format('dd, DD.MM'); }
			if (datum == "11"){datum_f = dayjs().locale('en').format('dd, MM.DD'); }
			if (datum == "12"){datum_f = dayjs().locale('en').format('dd, MM.DD.YY'); }
		}
		else
		{
			if (datum == "4"){datum_f = dayjs().locale('de').format('D. MMMM'); }
			if (datum == "5"){datum_f = dayjs().locale('de').format('dddd, D. MMMM'); }
			if (datum == "6"){datum_f = dayjs().locale('de').format('dd, DD.MM.YY'); }
			if (datum == "7"){datum_f = dayjs().locale('de').format('dd, DD.MM'); }
			if (datum == "11"){datum_f = dayjs().locale('de').format('dd, MM.DD'); }
			if (datum == "12"){datum_f = dayjs().locale('de').format('dd, MM.DD.YY'); }
		}
	
	
		if(datum_f ==""){ tmp_date_counter=0;}
				
		try
		{
			hdt.textContent = datum_f;
		}
		catch (e){}
			
		if(datum_f != old_date && old_date != "" )
		{
			resize();
		}
			
		old_date = datum_f;
			
		try
		{
			hct.textContent = zeit;
			hctb.textContent = stunden;
        }
        catch (e){}
		
         if (bold_hours == "1" )
         {
			try
			{
				hctb.style.fontWeight = "bolder"; 
			}
			catch (e){}
        }
        else
        {
			try
			{
				hctb.style.fontWeight = "normal"; 
			}
			catch (e){}
		}
        
		update_next_alarm();
    
    }

	if(show_seconds == 0)
	{
		var current_date = new Date();
		var future_date = new Date(current_date.getFullYear(),current_date.getMonth(),current_date.getDate(),current_date.getHours(),current_date.getMinutes() + 1 , 0, 0);
		var time_diff = (future_date - current_date);
		var time_diff = time_diff + 10;//Add a small extra buffer
		ticken_timer_obj = window.setTimeout(ticken, time_diff); //Wait one second for the next calls
	}
	else
	{
		ticken_timer_obj = window.setTimeout(ticken, 1000); //Wait one second for the next calls
	}
}





//This Functions returns all the current settings
function get_current_settings()
{
	"use strict";
    var back = "";
    back =  startpage  + "||" + black_white + "||" + clock + "||" + color_text + "||" + read  + "||" + lang + "||" + clock_app + "||" + date_app +"||" + statusbar_state + "||" + black_white_homescreen + "||"+nav_bar_state + "||" + nav_bar_padding + "||" + status_bar_padding + "||" + homescreen_nofitications + "||" + font_size_header + "||" + font_size_app + "||" + font_size_homescreen + "||" + appdrawer_vertical+"-"+appdrawer_horizontal +"||"+ zeilen_homescreen +"-"+spalten_homescreen+"||"+default_cats+"||"+cat_icon_size +"||" + JSON.stringify(cat_array) + "||" + global_icon_pack + "||" + appdrawer_align +"||" + swipe_mode+"||"+appdrawer_icon_size+"||"+bottom_padding_zero+"||"+appdrawer_font+"||"+homescreen_font+"||"+orient_mode;
    return back;
}

//Check number...https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
function isNumber(n)
{ 
	"use strict";
	return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

//Check if a value is in range
function check_in_range(in_val,min_range,max_range)
{
	"use strict";
	if(isNumber(in_val)==false) { return false; }
	if(in_val < min_range)   { return false; }
	if(in_val > max_range)   { return false; }
	return true;
}


//This functions is applaying all the settings, requires a valid Settings String
function applay_settings(in_string) 
{
	"use strict";
	still_in_settings = 1; //To prevent erros when an other event occurs
	
	try
	{
		var array_s = in_string.split("||");
	}
	catch( error ){}	
		
		
	//The setting string is splitted
	startpage = "r";
	try{
		if(array_s[0] != undefined)
		{
			startpage = array_s[0]; 
		}
	}catch( error ){}
	if(	startpage != "n" && startpage != "r") { startpage = "r"; }
	
		
	black_white = "0";
	try{
		if(array_s[1] != undefined)
		{
			black_white = array_s[1];
		}
	}catch( error ){}
	if( black_white != "0" && black_white != "1" ) { black_white = "0";}
	
		
	clock = "1-0-1-#000000-1-1";
	try{
		if(array_s[2] != undefined)
		{
			clock = array_s[2];
		}
	}catch( error ){}
	if( clock == "" ) { clock = "1-0-1-#000000-1-1"; }	
		
		
	color_text = "#ffffff";
	try{
		if(array_s[3] != undefined)
		{
			color_text = array_s[3];
		}
	}catch( error ){}
	if(color_text == "") { color_text = "#ffffff"; }	
		
		
	read = "70";
	try{
		if(array_s[4] != undefined)
		{
			read = array_s[4];
		}
	}catch( error ){}
	if( check_in_range(read,0,100) == false){ read = "70"; }	
		
		
	lang = "eng";
	try{
		if(array_s[5] != undefined)
		{
			lang = array_s[5];
		}
	}catch( error ){}
	if( lang == "" ) { lang = "eng"; }
		
		
	clock_app = "com.android.deskclock";
	try{
		if(array_s[6] != undefined)
		{
			clock_app = array_s[6];
		}
	}catch( error ){}
	if( clock_app == "" ) { clock_app = "com.android.deskclock"; }
	

	date_app = "com.android.calendar";
	try{
		if(array_s[7] != undefined)
		{
			date_app = array_s[7];
		}
	}catch( error ){}
	if( date_app == "" ) { date_app = "com.android.calendar"; }	
	
		
	statusbar_state = "1";
	try{
		if(array_s[8] != undefined)
		{
			statusbar_state = array_s[8];
		}
	}catch( error ){}
	if( statusbar_state != "0" && statusbar_state != "1" ) { statusbar_state = "1"; }	
	
		
	black_white_homescreen = "0";
	try{
		if(array_s[9] != undefined)
		{
			black_white_homescreen = array_s[9];
		}
	}catch( error ){}
	if( black_white_homescreen != "0" && black_white_homescreen != "1" ) { black_white_homescreen = "1"; }	
		
	
	nav_bar_state = "1";
	try{
		if(array_s[10] != undefined)
		{
			nav_bar_state = array_s[10];
		}
	}catch( error ){}
	if( nav_bar_state != "0" && nav_bar_state != "1" ) { nav_bar_state = "1"; }	


	nav_bar_padding = "-1";
	try{
		if(array_s[11] != undefined)
		{
			nav_bar_padding = array_s[11];
		}
	}catch( error ){}
	if( check_in_range(nav_bar_padding,-1,100) == false){ nav_bar_padding = "-1"; }


	status_bar_padding = "-1";
	try{
		if(array_s[12] != undefined)
		{
			status_bar_padding = array_s[12];
		}
	}catch( error ){}
	if( check_in_range(status_bar_padding,-1,100) == false){ status_bar_padding = "-1"; }	
		

	homescreen_nofitications = "0";
	try{
		if(array_s[13] != undefined)
		{
			homescreen_nofitications =array_s[13];
		}
	}catch( error ){}
	if( homescreen_nofitications != "0" && homescreen_nofitications != "1" ) { homescreen_nofitications = "0"; }		
		

	font_size_header = "40";
	try{
		if(array_s[14] != undefined)
		{
			font_size_header = array_s[14];
		}
	}catch( error ){}
	if( check_in_range(font_size_header,0,100) == false){ font_size_header = "40"; }	
		
		
	font_size_app = "30";
	try{
		if(array_s[15] != undefined)
		{
			font_size_app = array_s[15];
		}
	}catch( error ){}
	if( check_in_range(font_size_app,0,100) == false){ font_size_app = "30"; }	
		
	
	font_size_homescreen = "100";
	try{
		if(array_s[16] != undefined)
		{
			font_size_homescreen = array_s[16];
		}
	}catch( error ){}
	if( check_in_range(font_size_homescreen,0,100) == false){ font_size_homescreen = "100"; }
		
		
	var app_drawer_vertical_horizontal = "3-4";  //Tmp
	try{
		if(array_s[17] != undefined)
		{
			app_drawer_vertical_horizontal = array_s[17]; //Tmp -> appdrawer_vertical,appdrawer_horizontal 
		}
	}catch( error ){}
	if( app_drawer_vertical_horizontal == "" ) { app_drawer_vertical_horizontal = "3-4";  }


	var homescreen_zeile_spalten = "5-5"; //Tmp
	try{
		if(array_s[18] != undefined)
		{
			homescreen_zeile_spalten = array_s[18]; //Tmp
		}
	}catch( error ){}
	if( homescreen_zeile_spalten == "" ) { homescreen_zeile_spalten = "5-5"; }	
		
		
	default_cats = 1;
	try{
		if(array_s[19] != undefined)
		{
			default_cats = array_s[19];
		}
	}catch( error ){}
	if( default_cats == "") { default_cats = 1; } 	
		
		
	cat_icon_size = 5;
	try{
		if(array_s[20] != undefined)
		{
			cat_icon_size = array_s[20];
		}
	}catch( error ){}
	if( check_in_range(cat_icon_size,0,10) == false){ cat_icon_size = 5; }
		
		
	cat_array = 1;
	try{
		if(array_s[21] != undefined)
		{
			cat_array = JSON.parse(array_s[21]);
		}
	}catch( error ){}
	if( cat_array == "" ) { cat_array = 1; }


	global_icon_pack = "default";
	try{
		if(array_s[22] != undefined)
		{
			global_icon_pack = array_s[22];
		}
	}catch( error ){}
	if( global_icon_pack == "" ) { global_icon_pack = "default"; }
	
	
	appdrawer_align = "l";
	try{
		if(array_s[23] != undefined)
		{
			appdrawer_align = array_s[23];
		}
	}catch( error ){}
	if( appdrawer_align != "l" && appdrawer_align != "r" ) { appdrawer_align = "l"; }
	

	swipe_mode = "r";
	try{
		if(array_s[24] != undefined)
		{
			swipe_mode = array_s[24];
		}
	}catch( error ){}
	if( swipe_mode != "l" && swipe_mode != "r" ) { swipe_mode = "r"; }	

		
	appdrawer_icon_size = 10;
	try{
		if(array_s[25] != undefined)
		{
			appdrawer_icon_size =  array_s[25];
		}
	}catch( error ){}
	if( check_in_range(appdrawer_icon_size,0,10) == false){ appdrawer_icon_size = 10; }	
		
		
	bottom_padding_zero = "1";
	try{
		if(array_s[26] != undefined)
		{
			bottom_padding_zero = array_s[26];
		}
	}catch( error ){}
	if( bottom_padding_zero != "0" && bottom_padding_zero != "1" ) { bottom_padding_zero = "1"; }
	
			
	appdrawer_font = "";
	try{
		if(array_s[27] != undefined)
		{
			appdrawer_font = array_s[27];
		}
	}catch( error ){}

	
	homescreen_font = "";
	try{
		if(array_s[28] != undefined)
		{
			homescreen_font = array_s[28];
		}
	}catch( error ){}	

	
	orient_mode = "";
	try{
		if(array_s[29] != undefined)
		{
			orient_mode = array_s[29];
		}
	}catch( error ){}	
	if(orient_mode == ""){ orient_mode = "automatic"; }
	
	
	//---------------------------------------------------------------------------------------------
				
		
	if(default_cats==0)
	{
		document.getElementById("catdisp0").checked = false;
		document.getElementById("catdisp1").checked = true;
		document.getElementById("cat_custom_table_tr").style.display = "table-row";
	}
	else
	{
		document.getElementById("catdisp1").checked = false;
		document.getElementById("catdisp0").checked = true;
		document.getElementById("cat_custom_table_tr").style.display = "none";
	}
	
	
	if(default_cats==1)
	{
			cat_array = [];
			cat_array = [
			['icons/1.png', "Chat"],
			['icons/2.png', "Internet"],
			['icons/3.png', "Media"],
			['icons/4.png', "Games"],
			['icons/5.png', "Tools"],
			['icons/6.png', "Settings"]
			];
	}	
		
	//Language checkboxes are set
	if(lang=="eng")
	{
		document.getElementById("lang_input_eng").checked = true;
		document.getElementById("lang_input_ger").checked = false;
	}
	else
	{
		document.getElementById("lang_input_ger").checked = true;
		document.getElementById("lang_input_eng").checked = false;
	}
	
	applay_lang();
	applay_cats(cat_array);	

	//Update the Cat Display Table
	var table_id = document.getElementById("cat_custom_table");
	for(var i = table_id.rows.length - 1; i >= 0; i--){table_id.deleteRow(i);}
	
	for(var i = 0; i < cat_array.length ; i++)
	{
		var new_row = table_id.insertRow(-1);
		var icon =  cat_array[i][0];
		var name =  cat_array[i][1];
		var full_string = "";
		if(i==0)
		{
			full_string = "<td><img id='"+i+"_cat' ontouchend=\"select_cat_icon(\'"+i+"\')\" class='select_app_icon_cat' src='"+icon+"' alt='New'></td><td class='cat_dis_input_td' ><input oninput='update_app_cat(0)' type='text' value='"+name+"' class='cat_disp_name'></td><td></td>";
		}
		else
		{
			full_string = "<td><img id='"+i+"_cat' ontouchend=\"select_cat_icon(\'"+i+"\')\" class='select_app_icon_cat' src='"+icon+"' alt='New'></td><td class='cat_dis_input_td' ><input oninput='update_app_cat(0)' type='text' value='"+name+"' class='cat_disp_name'></td><td> <button class='del_cat_btn' ontouchend='del_cat_dis(this)' >"+del_cat_text+"</button> </td>";
		}
		
		new_row.innerHTML='<tr>'+full_string+'</tr>'; 
	}
	

	//The Homescreen representation of Apps (with background or not)s
	if (startpage == "n") 
    {
		document.getElementById("startpmn").checked = true;
        var x = document.querySelectorAll("home_icon_read");
		for (var i = 0; i < x.length; i++)
		{
			x[i].style.backgroundColor = "transparent";
		}
		
    } 
    else
    {
		document.getElementById("startpmr").checked = true;
    	var x = document.querySelectorAll("home_icon_read");
		for (var i = 0; i < x.length; i++)
		{
			x[i].style.borderRadius = "20%";
			x[i].style.backgroundColor = "rgba(204, 204, 204,0.4)";
		}
    }
    
    
    if( appdrawer_align == "l")
	{
		document.getElementById("align_mode").textContent = aling_left_string;
		document.getElementById("input_align_l").checked = true;
		document.getElementById("input_align_r").checked = false;
		document.getElementById("modal_alignl").textContent = aling_left_string;
		document.getElementById("modal_alignr").textContent = aling_right_string;
	}
	else
	{
		document.getElementById("align_mode").textContent = aling_right_string;
		document.getElementById("input_align_l").checked = false;
		document.getElementById("input_align_r").checked = true;
		document.getElementById("modal_alignl").textContent = aling_left_string;
		document.getElementById("modal_alignr").textContent = aling_right_string;
	}
	
	
	if( swipe_mode == "l")
	{
		document.getElementById("swipe_mode").textContent = aling_left_string;
		document.getElementById("modal_header_swipe").textContent = swipe_header_string;
		document.getElementById("input_swipe_l").checked = true;
		document.getElementById("input_swipe_r").checked = false;
		document.getElementById("modal_swipel").textContent = aling_left_string;
		document.getElementById("modal_swiper").textContent = aling_right_string;
	}
	else
	{
		document.getElementById("swipe_mode").textContent = aling_right_string;
		document.getElementById("modal_header_swipe").textContent = swipe_header_string;
		document.getElementById("input_swipe_l").checked = false;
		document.getElementById("input_swipe_r").checked = true;
		document.getElementById("modal_swipel").textContent = aling_left_string;
		document.getElementById("modal_swiper").textContent = aling_right_string;
	}
	
	
	//How the clock on the homescreen is displayed
    if (clock == "0" || clock == "") 
    {
        document.getElementById("clockmode").checked = false;
        document.getElementById("tg_clock").checked = false;
        document.getElementById("tg_sek_tg").checked = false;
        document.getElementById("tg_bhour_tg").checked = false;
        document.getElementById("tg_back_tg").checked = false;
  
        document.getElementById("homescreen_clock").style.display = "none";
        document.getElementById("clockmode").innerHTML = clock_showing_false;
    } 
    else
    {
		document.getElementById("homescreen_clock").style.display = "block";
        document.getElementById("clockmode").innerHTML = clock_showing_true;
        document.getElementById("tg_clock").checked = true;
		
		try
		{
			array_s = clock.split("-");
        }
        catch(error){}
		
        if (array_s[0] == "1") //Bold hours
        {
            document.getElementById("tg_bhour_tg").checked = true;
        } 
        else 
        {
            document.getElementById("tg_bhour_tg").checked = false;
        }

        if (array_s[1] == "1") //Show seconds
        {
            document.getElementById("tg_sek_tg").checked = true;
        } 
        else
        {
            document.getElementById("tg_sek_tg").checked = false;
        }

        if (array_s[2] == "0") //Date 
        { 
           document.getElementById("tg_date_tg").checked = false;
                    
        } 
        else
        {
            document.getElementById("tg_date_tg").checked = true;
        }
        
        if (array_s[5] == "0") //Show Alarm clock 
        { 
           document.getElementById("tg_clock_tg").checked = false;
                    
        } 
        else
        {
            document.getElementById("tg_clock_tg").checked = true;
        }
        
        
        if (array_s[2] == "1"){document.getElementById("datum_1").checked = true;}
        if (array_s[2] == "2"){document.getElementById("datum_2").checked = true;}
        if (array_s[2] == "3"){document.getElementById("datum_3").checked = true;}
        if (array_s[2] == "4"){document.getElementById("datum_4").checked = true;}
        if (array_s[2] == "5"){document.getElementById("datum_5").checked = true;}
        if (array_s[2] == "6"){document.getElementById("datum_6").checked = true;}
        if (array_s[2] == "7"){document.getElementById("datum_7").checked = true;}
        if (array_s[2] == "8"){document.getElementById("datum_8").checked = true;}
        if (array_s[2] == "9"){document.getElementById("datum_9").checked = true;}
        if (array_s[2] == "10"){document.getElementById("datum_10").checked = true;}
        if (array_s[2] == "11"){document.getElementById("datum_11").checked = true;}
        if (array_s[2] == "12"){document.getElementById("datum_12").checked = true;}       
	
		if (array_s[3] != "") //Color of the Homescreen
        {
             color_text_homescreen = array_s[3];  
             document.getElementById("pre_color_homescreen").style.background = color_text_homescreen;
             document.getElementById("text_color_pre_homescreen").style.backgroundColor = color_text_homescreen;
             document.getElementById("homescreen_clock_green").style.color = color_text_homescreen;
        }

		if (array_s[4] != "") 
        {
			if (array_s[4] == "1" )
			{
				document.getElementById("tg_back_tg").checked = true;
				document.getElementById("homescreen_clock_green").style.backgroundColor = "rgba(255, 255, 255, 0.4)";
				
            }
            else
            {
		
				document.getElementById("tg_back_tg").checked = false;
				document.getElementById("homescreen_clock_green").style.backgroundColor = "rgba(255, 255, 255, 0.0)";
			}   
        }
    }
    
   
    //Textcolor on the homescreen
    if (color_text != "") 
    {
		document.getElementById("pre_color").style.background = color_text;
		document.getElementById("text_color_pre").style.backgroundColor = color_text;
        document.getElementById("header").style.color = color_text;
        
        var x = document.querySelectorAll(".desc");
		for (var i = 0; i < x.length; i++)
		{
			x[i].style.fontSize = (font_size_app*0.090)+"vh";
			x[i].style.color = color_text;
		}
    }

	document.getElementById("modal_header_read").textContent = read+"% "+modal_header_read_text;
	document.getElementById("read_mode").textContent = read+"%";
	document.getElementById("range_read").value = read;
	
	document.getElementById("modal_header_appdrawericonsize").textContent = settings_appdrawericonsize_string + ": "+appdrawer_icon_size;
	document.getElementById("appdrawericonsize_mode").textContent = appdrawer_icon_size;
	document.getElementById("appdrawericonsize_read").value = appdrawer_icon_size;

    set_tranz();


	//Set Padding Zero Button
	if(bottom_padding_zero == "1")
	{
		document.getElementById("bottomzerobutton").checked = true;
	}
	else
	{
		document.getElementById("bottomzerobutton").checked = false;
	}
	
	//App icon color (Appdrawer)
	if(black_white=="1")
	{
		document.getElementById("blackwhite").checked = true;
	}
	else
	{
		document.getElementById("blackwhite").checked = false;
	}
	set_app_drawer_black_white();
	
	//App icon color (Homescreen)
	if(black_white_homescreen=="1")
	{
		document.getElementById("blackwhitehome").checked = true;
	}
	else
	{
		document.getElementById("blackwhitehome").checked = false;
	}
	
	set_homescreen_black_white();
	
	if(homescreen_nofitications=="0")
	{
		document.getElementById("homescreeennotification").checked = false;
	}
	else
	{
		document.getElementById("homescreeennotification").checked = true;
	}
	
	//If the navigation bar is displayeds
	if(nav_bar_state=="0")
	{
		document.getElementById("pad_top_input_tr").style.display = "none";
		document.getElementById("pad_top_input").style.display = "none";
		document.getElementById("padding_bottom_input_tr").style.display = "none";
		document.getElementById("padding_bottom_input").style.display = "none";
		document.getElementById("padding_bottom_zero_tr").style.display = "none";
		document.getElementById("padding_input_field").style.display = "none";
		document.getElementById("padding_top_input_field").style.display = "none";
		document.getElementById("transnavmode0").checked = true;
		document.getElementById("currentnavbarstate").textContent = text_navbar_none_transparent;

		set_padding_appdrawer(0,0);
		set_homescreen_padding(0,0);
	}
	
	if(nav_bar_state=="1")
	{
		document.getElementById("padding_bottom_input_tr").style.display = "table-row";
		document.getElementById("padding_bottom_input").style.display = "block";
		document.getElementById("padding_input_field").style.display = "block";
		document.getElementById("padding_bottom_zero_tr").style.display = "table-row";
		
		if(statusbar_state == "1")
		{
			document.getElementById("pad_top_input").style.display = "block";
			document.getElementById("pad_top_input_tr").style.display = "table-row";
			document.getElementById("padding_top_input_field").style.display = "block";
		}

		document.getElementById("transnavmode1").checked = true;
		document.getElementById("currentnavbarstate").textContent = text_navbar_complete_transparent;
	}
	
	
	if(nav_bar_padding == -1)
	{
		//Use the android values	
		nav_bar_padding = nav_pad_tmp;
		if(nav_bar_padding == -1)
		{
			nav_bar_padding = 48; //If there is also an error use 48 as an fallback
		}
	}
	
	
	if(status_bar_padding == -1)
	{
		//Use the android values		
		status_bar_padding = status_pad_tmp;
		if(status_bar_padding == -1)
		{
			status_bar_padding = 24; //If there is also an error use 24 as an fallback
		}
	}
	
	document.getElementById('padding_input_field').value = nav_bar_padding;
	document.getElementById("pad_top_input").textContent = text_pad_top_input+": "+status_bar_padding;
	document.getElementById("padding_bottom_input").textContent = text_pad_bottom_input+": "+nav_bar_padding;
	document.getElementById('padding_top_input_field').value =status_bar_padding;
		
	
	if(statusbar_state =="1")
	{	
		try
		{
			StatusBar.show();
		}
		catch (e){}
		document.getElementById("statusbarstate").checked = true;
	}
	else
	{
		try
		{
			StatusBar.hide();
		}
		catch (e){}
		document.getElementById("statusbarstate").checked = false;
		document.getElementById("pad_top_input").style.display = "none";
		document.getElementById("pad_top_input_tr").style.display = "none";
		document.getElementById("padding_top_input_field").style.display = "none";
	}
	
	//Clock App
	if( clock_app == "" || clock_app == undefined)
	{
		document.getElementById("selected_clock_app").textContent = "-";
	}
	else
	{
		if(all_apps.length>0)
		{
			document.getElementById("selected_clock_app").textContent = get_app_name_by_start_name(clock_app);
		}
	}
	
	//Check existens
	if( is_app_in_all_apps(clock_app) == false)
	{
		if(all_apps.length>0)
		{
			clock_app = "";	
			document.getElementById("selected_clock_app").textContent = "-";
		}
	}	
	
	
	//Date App
	if( date_app == "" || date_app == undefined)
	{
		document.getElementById("selected_date_app").textContent = "-";
	}
	else
	{
		if(all_apps.length>0)
		{
			document.getElementById("selected_date_app").textContent = get_app_name_by_start_name(date_app);
		}
	}
	
	//Check existens
	if( is_app_in_all_apps(date_app) == false)
	{
		if(all_apps.length>0)
		{
			date_app = "";	
			document.getElementById("selected_date_app").textContent = "-";
		}
	}
	
	document.getElementById("iconside_range").value = cat_icon_size;
	document.getElementById("modal_header_cat_icon_size").textContent = cat_icon_size_text+": "+cat_icon_size;
		
	document.getElementById("text_font_cat").textContent = font_cat_text +": "+ font_size_header;
	document.getElementById("text_font_appnames").textContent = font_app_text +": " + font_size_app;
	document.getElementById("text_font_homescreen").textContent = font_homescreen_text+": "+font_size_homescreen;
	
	document.getElementById("range_font_cat").value = font_size_header;
	document.getElementById("range_font_app").value = font_size_app;
	document.getElementById("range_font_homescreen").value = font_size_homescreen;
	
	try
	{
		array_s = app_drawer_vertical_horizontal.split("-");
	}
	catch( error ) {}
	
    document.getElementById("settings_appdrawer_vertical").textContent =  text_app_drawer_verti + ": "+array_s[0]; 
    document.getElementById("settings_appdrawer_hori").textContent =  text_app_drawer_hori + ": "+array_s[1]; 
    
	document.getElementById("range_app_drawer_vertical").value = array_s[0];
	document.getElementById("range_app_drawer_horizontal").value = array_s[1];
        
    appdrawer_vertical = array_s[0];
    appdrawer_horizontal = array_s[1];

	
	
	if(global_icon_pack == "default")
	{
		document.getElementById("current_global_iconpack").textContent = default_string;
	}
	else
	{
		//There is an error...
		if(all_apps.length>0)
		{				
			var tmp_iconpack_name = get_app_name_by_start_name(global_icon_pack);
			
			if(tmp_iconpack_name == "" )
			{
				document.getElementById("current_global_iconpack").textContent = default_string;
			}
			else
			{
				document.getElementById("current_global_iconpack").textContent = get_app_name_by_start_name(global_icon_pack);
			}
		}
		else
		{
			document.getElementById("current_global_iconpack").textContent = global_icon_pack;
		}
	}
	
	try
	{
		array_s = homescreen_zeile_spalten.split("-");
    }
    catch(error) {}
    

    
    document.getElementById("settings_homescreen_zeilen").textContent =  text_homescreen_zeilen + ": "+array_s[0]; 
    document.getElementById("settings_homescreen_spalten").textContent =  text_homescreen_spalten + ": "+array_s[1]; 
    
	document.getElementById("range_homescreen_zeilen").value = array_s[0];
	document.getElementById("range_homescreen_spalten").value = array_s[1];
        
    zeilen_homescreen = array_s[0];
    spalten_homescreen = array_s[1];	 
	
	
	if(appdrawer_font == "")
	{
		document.getElementById("appdrawer_current_font").textContent = default_string;
	}
	else
	{
		document.getElementById("appdrawer_current_font").textContent = appdrawer_font;
	}
		
	
	if(homescreen_font == "")
	{
		document.getElementById("homescreen_current_font").textContent = default_string;
	}
	else
	{
		document.getElementById("homescreen_current_font").textContent = homescreen_font;
	}			
	
	
	if( orient_mode == "automatic")
	{
		try
		{
			screen.orientation.lock('any');
		}
		catch(err) {}
		document.getElementById("currentorientstate").textContent = orient_auto;
		document.getElementById("orient_input_auto").checked = true;
		document.getElementById("orient_input_horizontal").checked = false;
		document.getElementById("orient_input_vertical").checked = false;
	}
	
	if( orient_mode == "horizontal")
	{
		try
		{
			screen.orientation.lock('landscape');
		}
		catch(err) {}
		document.getElementById("currentorientstate").textContent = orient_horizontal;
		document.getElementById("orient_input_auto").checked = false;
		document.getElementById("orient_input_horizontal").checked = true;
		document.getElementById("orient_input_vertical").checked = false;
	}
	
	if( orient_mode == "vertical")
	{
		try
		{
			screen.orientation.lock('portrait');
		}
		catch(err) {}
		document.getElementById("currentorientstate").textContent = orient_vertical;
		document.getElementById("orient_input_auto").checked = false;
		document.getElementById("orient_input_horizontal").checked = false;
		document.getElementById("orient_input_vertical").checked = true;
	}
	

	
	update_next_alarm();
	resize();
			
	//At least the settings should be stored on the android devices
	try
    {
		store_settings( get_current_settings() );
    }
    catch (e){}
    
   
 
   still_in_settings = 0;
}



//When the Name/Icons of the App Cats have changed
function update_app_cat( full_update )
{
	"use strict";
	cat_array = [];
	
	var table = document.getElementById("cat_custom_table");

	for (var i = 0, row; row = table.rows[i]; i++) 
	{
		 var img = null;
		 for (var j = 0, col; col = row.cells[j]; j++) 
		 {
			if(j == 0)
			{
				img = col.getElementsByTagName("img")[0].src;
			}
			if(j == 1)
			{
				name = col.getElementsByTagName("input")[0].value;
			}
			if(j == 2)
			{
				cat_array.push([img,name]);  
			}
	    } 
	}
	  

	if(full_update == 1)
	{	  
		//now the other way arround...
		var table_id = document.getElementById("cat_custom_table");
		for(var i = table_id.rows.length - 1; i >= 0; i--){table_id.deleteRow(i);}
		for(var i = 0; i < cat_array.length ; i++)
		{
			var new_row = table_id.insertRow(-1);
			var icon =  cat_array[i][0];
			var name =  cat_array[i][1];
			if(i==0)
			{
				var full_string = "<td><img id='"+i+"_cat' ontouchend=\"select_cat_icon(\'"+i+"\')\" class='select_app_icon_cat' src='"+icon+"' alt='New'></td><td class='cat_dis_input_td' ><input oninput='update_app_cat(0)' type='text' value='"+name+"' class='cat_disp_name'></td><td></td>";
			}
			else
			{
				var full_string = "<td><img id='"+i+"_cat' ontouchend=\"select_cat_icon(\'"+i+"\')\" class='select_app_icon_cat' src='"+icon+"' alt='New'></td><td class='cat_dis_input_td' ><input oninput='update_app_cat(0)' type='text' value='"+name+"' class='cat_disp_name'></td><td> <button class='del_cat_btn' ontouchend='del_cat_dis(this)' >"+del_cat_text+"</button> </td>";

			}
			new_row.innerHTML='<tr>'+full_string+'</tr>'; 
		}
		
		//Check if all apps are in an vaild cat...
		var highest_pot_cat = cat_array.length;
		
		var return_apps_array = apps_by_cat( all_apps, highest_pot_cat+1);
		
		if(return_apps_array.length > 0)
		{
			for(var i = 0; i<return_apps_array.length; i++)
			{
				var tmp_start_name = return_apps_array[i].start_name;
				for(var i2 = 0; i<all_apps.length; i2++)
				{
					var tmp_start_name2 = all_apps[i2].start_name;
					if(tmp_start_name == tmp_start_name2)
					{
						all_apps[i2].cat = 1;
						break;
					}	
				}
			} 
			 
			update_app_divs();
			store_apps(apps_to_string(all_apps));
		}
	}
}

//Delete Button was presses for a categorie
function del_cat_dis(ind)
{
	"use strict";
	var row = ind.parentNode.parentNode;
	row.parentNode.removeChild(row);
	update_app_cat(1);
}

//Add a new Categorie (the add Button was pressed)
function add_app_cat()
{
	"use strict";
	var table_id = document.getElementById("cat_custom_table");
	var new_row = table_id.insertRow(-1);

	var new_row_count = document.getElementById("cat_custom_table").getElementsByTagName("tr").length;
	new_row_count = new_row_count - 1;
	var full_string = "<td><img id='"+new_row_count+"_cat' ontouchend=\"select_cat_icon(\'"+new_row_count+"\')\"  class='select_app_icon_cat' src='icons/new_cat.png' alt='New'></td><td class='cat_dis_input_td' ><input oninput='update_app_cat(0)' type='text' value='Neu' class='cat_disp_name'></td><td> <button class='del_cat_btn' ontouchend='del_cat_dis(this)' >"+del_cat_text+"</button></td>";
	new_row.innerHTML='<tr>'+full_string+'</tr>'; 
	update_app_cat(1);
}


/*Abort Ask Resort Dialog*/
function abort_resoort_ask()
{
	"use strict";
	document.getElementById("askresort_dialog_bg").style.display = "none"; 
	document.getElementById("askresort_dialog").style.display = "none"; 
}







//Show the Import Dialog
function import_all()
{
	"use strict";
	document.getElementById("askimport_dialog_bg").style.display = "block"; 
	document.getElementById("askimport_dialog").style.display = "block"; 
}

//Import from external Storage - current Settings are overridden
function start_import()
{
	"use strict";
	document.getElementById("askimport_dialog_bg").style.display = "none"; 
	document.getElementById("askimport_dialog").style.display = "none"; 
	
	//Ask for read permisson:
	cordova.plugins.diagnostic.requestExternalStorageAuthorization(function(status)
	{
		if(status == cordova.plugins.diagnostic.permissionStatus.GRANTED)
		{
					
			try
			{	
				androidinfo.importall( function ok(in_data)
				{
					var in_data_array = in_data.split('|_!!!_|');
					var new_apps = in_data_array[0];
					var new_settings = in_data_array[1];
					
					//First applay the settings...
					applay_settings(new_settings);
					update_homescreen_clock_position();

					all_apps = string_to_apps(new_apps);
					update_app_divs();
					
					store_apps(apps_to_string(all_apps));
					applay_icon_pack(global_icon_pack,0);
					
					setTimeout(function() 
					{
						compare_apps_with_installed_apps();
					}, 10);
					force_update_applist = 0; 
			
					toast_notification(msg_success, "2000", "bottom");
			
				}, function bad(){} );
			}
			catch( error )
			{
				toast_notification("Error", "3500", "bottom");
			}

		}	
		else
		{
			toast_notification("Error", "3500", "bottom");
		}	
	}, 
	function(error){});
	
			
}

//The import Dialog is aborted
function abort_import()
{
	"use strict";
	document.getElementById("askimport_dialog_bg").style.display = "none"; 
	document.getElementById("askimport_dialog").style.display = "none"; 
}



//Ask to resort Apps
function open_resort()
{
	"use strict";
	document.getElementById("askresort_dialog_bg").style.display = "block"; 
	document.getElementById("askresort_dialog").style.display = "block"; 
}

//The setting page for the appdrawer
function open_appdrawer_settings()
{
	"use strict";
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "flex"; 
}


//The setting page for the Extra Settings
function open_extra_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_extra_div").style.display = "flex"; 
}


//The setting page for the homescreen
function open_homescreen_settings()
{
	"use strict";
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("homescreen_div").style.display = "flex"; 	
}

//Used to set the navigationbar settings
function open_navtrans_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_navtrans_div").style.display = "flex"; 
}


//Set the readability settings
function open_read_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "none"; 
	document.getElementById("settings_read_div").style.display = "flex"; 
}

//Set the readability settings
function open_appdrawersize_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "none"; 
	document.getElementById("settings_appdrawericonsize_div").style.display = "flex"; 
}


//Show Categorie Settings....
function open_cat_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "none"; 
	document.getElementById("settings_cat_div").style.display = "flex"; 
}



//Display the URL in the Webbrowser
function open_lukelauncher_website()
{
	"use strict";
	window.open("https://lukelauncher.de", "_system");
}

//Change clock settings
function open_clock_settings()
{
	"use strict";	
	document.getElementById("homescreen_div").style.display = "none"; 
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_clock_div").style.display = "flex"; 
}

//Change the font sizes
function open_font_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_fontsize_div").style.display = "flex"; 
}


//Function for changeing Appdrawer icons to black/white or to color
function change_icon_bw(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
	
    if (black_white == "0") 
    {
        black_white = "1";
    }
    else
    {
        black_white = "0";
    }
}


//Function for changeing homescreen icosn to black/white or to color
function change_icon_bw_home(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
	
    if (black_white_homescreen == "0") 
    {
        black_white_homescreen = "1";
    }
    else
    {
        black_white_homescreen = "0";
    }
}


//Function for changeing homescreen Notifications
function change_home_notifi(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
	
    if (homescreen_nofitications == "0") 
    {

        homescreen_nofitications = "1";
        clear_all_badges();
        
		document.getElementById("asknotifi_dialog_bg").style.display = "block"; 
		document.getElementById("asknotifi_dialog").style.display = "block"; 
	
    } 
    else
    {
        homescreen_nofitications = "0";
        clear_all_badges();
    }
}




//Function to hide/show the statusbar
function change_statusbar(in_c)
{
	"use strict";
	if(still_in_settings == 1){return;}		
	
    if (statusbar_state == "0")
    {
        statusbar_state = "1";
    }
    else
    {
        statusbar_state = "0"; 
    }
    
    applay_settings(get_current_settings());
}


//Function to hide/show the statusbar
function change_bottomzero(in_c)
{
	"use strict";
	if(still_in_settings == 1){return;}		
	
    if (bottom_padding_zero == "0")
    {
        bottom_padding_zero = "1";
    }
    else
    {
        bottom_padding_zero = "0"; 
    }
    
    applay_settings(get_current_settings());
}



//When the font size of the categorie changed
function font_cat_change()
{
	"use strict";
	if(still_in_settings == 1){return;}
	var new_val = document.getElementById('range_font_cat').value;
	font_size_header = new_val;
	document.getElementById("text_font_cat").textContent = font_cat_text +": "+ font_size_header;
}

//When the app name font size changed
function font_app_change()
{
	"use strict";	
	if(still_in_settings == 1){return;}
	var new_val = document.getElementById('range_font_app').value;
	font_size_app = new_val;
	document.getElementById("text_font_appnames").textContent = font_app_text +": " + font_size_app;
}

//When the homescreen font size changed
function font_home_change()
{
	"use strict";	
	if(still_in_settings == 1){return;}
	var new_val = document.getElementById('range_font_homescreen').value;
	font_size_homescreen = new_val;
	document.getElementById("text_font_homescreen").textContent = font_homescreen_text+": "+font_size_homescreen;
}


//Language has changed
function Lang_mode_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_lang = document.querySelector('input[name="langmode"]:checked').value;
    lang = new_lang;
    
    //Show a direct feedback to the user - do not wait for applay settings
    if(lang=="eng")
    {
		modal_header_lang_text2 = "Select language";
		document.getElementById("modal_header_lang").textContent = modal_header_lang_text2;
	}
	else
	{
		modal_header_lang_text2 = "Sprache auswählen";
		document.getElementById("modal_header_lang").textContent = modal_header_lang_text2;
	}

}

//User changes the orientation
function orient_change()
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_orient_mode = document.querySelector('input[name="orientmode"]:checked').value;
    orient_mode = new_orient_mode;
    
    //Show a direct feedback to the user - do not wait for applay settings
    if( orient_mode == "automatic")
	{
		try 
		{
			screen.orientation.lock('any');
		}
		catch(err) {}
	}
	
	if( orient_mode == "horizontal")
	{
		try 
		{
			screen.orientation.lock('landscape');
		}
		catch(err) {}
	}
	
	if( orient_mode == "vertical")
	{
		try
		{
			screen.orientation.lock('portrait');
		}
		catch(err) {}
	}
}

//Align has changed
function align_mode_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_appdrawer_align = document.querySelector('input[name="alignmode"]:checked').value;
    appdrawer_align = new_appdrawer_align;
}


//Align has changed
function swipe_mode_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_swipe = document.querySelector('input[name="swipemode"]:checked').value;
    swipe_mode = new_swipe;
}


//Language has changed
function transnav_mode_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_trans = document.querySelector('input[name="transnavmode"]:checked').value;
	nav_bar_state = new_trans;
    applay_settings(get_current_settings());
}


//App Categorie Display has changed
function catdis_mode_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_cat_dis = document.querySelector('input[name="catmode"]:checked').value;
	default_cats = new_cat_dis;
	

	if( default_cats == 0)
	{
		toast_notification(warn_sort_cat_string,"short","bottom");
	}
	
    applay_settings(get_current_settings());
}


//How the icons on the Homescreen are borderd
function startpage_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_startpage = document.querySelector('input[name="startpm"]:checked').value;
    new_startpage = sanitize_input(new_startpage);
    startpage = new_startpage;
    update_app_divs();
}

//When the readability changes
function read_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_readsize = document.getElementById('range_read').value;
    new_readsize = sanitize_input(new_readsize);
    read = new_readsize;
	document.getElementById("modal_header_read").textContent = read+"% "+modal_header_read_text;
}



//When the Appdrawer Icon Size changes
function appdrawericonsize_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_appdrawer_icon_size = document.getElementById('appdrawericonsize_read').value;
    new_appdrawer_icon_size = sanitize_input(new_appdrawer_icon_size);
    appdrawer_icon_size = new_appdrawer_icon_size;
	document.getElementById("modal_header_appdrawericonsize").textContent =  settings_appdrawericonsize_string + ": "+appdrawer_icon_size;
}


//When the readability changes
function caticonsize_change(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_iconsize = document.getElementById('iconside_range').value;
    new_iconsize = sanitize_input(new_iconsize);
    cat_icon_size = new_iconsize;
	document.getElementById("modal_header_cat_icon_size").textContent = cat_icon_size_text+": "+cat_icon_size;
}


//Appdrawer horizontal app representation
function app_drawer_change_horizontal(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_val = document.getElementById('range_app_drawer_horizontal').value;
    new_val = sanitize_input(new_val);
    appdrawer_horizontal = new_val;
    document.getElementById("settings_appdrawer_hori").textContent =  text_app_drawer_hori + ": "+appdrawer_horizontal; 
}

//Appdrawer vertical app representation
function app_drawer_change_vertical(in_c)
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_val = document.getElementById('range_app_drawer_vertical').value;
    new_val = sanitize_input(new_val);
    appdrawer_vertical = new_val;
    document.getElementById("settings_appdrawer_vertical").textContent =  text_app_drawer_verti + ": "+appdrawer_vertical; 
}

//When the homescreen dimensions changes
function homscreen_change_zeilen()
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_val = document.getElementById('range_homescreen_zeilen').value;
    new_val = sanitize_input(new_val);
    zeilen_homescreen = new_val;
	document.getElementById("settings_homescreen_zeilen").textContent =  text_homescreen_zeilen + ": "+zeilen_homescreen; 
}

//When the homescreen dimensions changes
function homescreen_change_spalten()
{
	"use strict";	
	if(still_in_settings == 1){return;}	
    var new_val = document.getElementById('range_homescreen_spalten').value;
    new_val = sanitize_input(new_val);
    spalten_homescreen = new_val;
	document.getElementById("settings_homescreen_spalten").textContent =  text_homescreen_spalten + ": "+spalten_homescreen;
}

//Chose the languages
function show_settings_lang()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_lang_div").style.display = "flex"; 
}



//Show the Orientation Settings
function open_orient_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_orient_div").style.display = "flex";
}


//Convert RGB into hex
//Based on: https://stackoverflow.com/questions/21249688/convert-rgb-to-hex
function rgb2hex(in_rgb)
{
	"use strict";	
	var in_rgb = in_rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (in_rgb && in_rgb.length == 4) ? "#" +("0" + parseInt(in_rgb[1],10).toString(16)).slice(-2) +("0" + parseInt(in_rgb[2],10).toString(16)).slice(-2) +("0" + parseInt(in_rgb[3],10).toString(16)).slice(-2) : '';
}

//Show the color picker for the text color
function show_modal_select_text_color()
{
	"use strict";	
	if( pickerFixed1 == null)
	{
		pickerFixed1 = new Picker({
				parent: document.getElementById("select_color"),
				popup: false,
				alpha: false,
				editor: false,
				editorFormat: 'rgb',
				color: color_text,
				onChange: function(color)
				{
					var new_color = rgb2hex(color.rgbaString);
					document.getElementById("pre_color").style.backgroundColor = new_color ;
					color_text = new_color;
				},
			});
    }
 
    pickerFixed1.setColor(color_text, true);   
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "none"; 
	document.getElementById("settings_colortext_div").style.display = "block"; 
}


//Show the color picker for the homescreen color
function show_modal_select_homescreen_color()
{
	"use strict";	
	var tmp_clock = "";
	if( pickerFixed2 == null)
	{
		
        pickerFixed2 = new Picker({
            parent: document.getElementById("select_color_homescreen"),
            popup: false,
            alpha: false,
            editor: false,
            editorFormat: 'rgb',
            color: color_text_homescreen,
     
            onChange: function(color)
            {				
				var new_color = rgb2hex(color.rgbaString);
				document.getElementById("text_color_pre_homescreen").style.backgroundColor = new_color;
				document.getElementById("pre_color_homescreen").style.backgroundColor = new_color;
				
				color_text_homescreen = new_color;
				
				tmp_clock = clock.split('-');
				clock = tmp_clock[0] + "-" + tmp_clock[1] + "-" + tmp_clock[2] + "-" + new_color + "-" + tmp_clock[4] + "-" + tmp_clock[5] ;
            },
        });
	}
    pickerFixed2.setColor(color_text_homescreen, true);  
       
    document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("homescreen_div").style.display = "none"; 
	document.getElementById("settings_colorhomescreen_div").style.display = "block"; 
}




//Show the font picker for the appdrawer
function show_modal_select_appdrawer_font()
{
	"use strict";				
    document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "none"; 
	document.getElementById("settings_appdrawerfont_div").style.display = "block"; 
}


//Show the font picker for the appdrawer
function show_modal_select_homescreen_font()
{
	"use strict";				
    document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("homescreen_div").style.display = "none"; 
	document.getElementById("settings_homescreenfont_div").style.display = "block"; 
}


//Set the Appdrawer font
function set_appdrawer_font(in_font_name)
{
	"use strict";	
	appdrawer_font = in_font_name;
	back_function();
}

//Set the Homescreen font
function set_homescreen_font(in_font_name)
{
	"use strict";	
	homescreen_font = in_font_name;
	back_function();
}


//Set the navbar padding
function padding_input()
{
	"use strict";	
	if(still_in_settings == 1){return;}
	
	var nav_bar_padding_new = 0;
	
	if(padding_bottom_input_time_tmp == 0)
	{
		setTimeout(pre_view_padding_bottom,300);
		padding_bottom_input_time_tmp = 1;	
	}
	
	var padding_input_field_obj = document.getElementById('padding_input_field');
	nav_bar_padding_new = padding_input_field_obj.value;//document.getElementById('padding_input_field').value;
	
	if( parseInt(parseInt(nav_bar_padding_new)+parseInt(status_bar_padding)) > vhTOpx(70)) //To prevent to much padding...
	{
		padding_input_field_obj.value = nav_bar_padding;
		document.getElementById('padding_top_input_field').value = status_bar_padding;
	}
	else
	{
		document.getElementById("padding_bottom_input").textContent = text_pad_bottom_input + ": "+nav_bar_padding_new;
		nav_bar_padding = nav_bar_padding_new;
	}
	
}
	
//Preview Padding Top
function pre_view_padding_top()
{
	"use strict";	
	padding_top_input_time_tmp = 0;
	resize();
}
	
//Preview Padding Bottom
function pre_view_padding_bottom()
{
	"use strict";	
	padding_bottom_input_time_tmp = 0;
	resize();
}
	
//Set the statusbar padding
function padding_top_input()
{
	"use strict";	
	if(still_in_settings == 1){return;}
	
	var status_bar_padding_new = 0;
	
	if(padding_top_input_time_tmp == 0)
	{
		setTimeout(pre_view_padding_top,300);
		padding_top_input_time_tmp = 1;	
	}
	
	var padding_top_input_field_obj = document.getElementById('padding_top_input_field');
	status_bar_padding_new = padding_top_input_field_obj.value;
	
	if( parseInt(parseInt(nav_bar_padding)+parseInt(status_bar_padding_new)) > vhTOpx(70)) //To prevent to much padding
	{
		padding_top_input_field_obj.value = status_bar_padding;
		document.getElementById('padding_input_field').value = nav_bar_padding;
	}
	else
	{
		document.getElementById("pad_top_input").textContent = text_pad_top_input+": "+status_bar_padding_new;
		status_bar_padding = status_bar_padding_new;
	}
}


//Function for search input field changed
function sif_input()
{	
	"use strict";	
	var serach_for = "";
	
	try
	{
		serach_for = document.getElementById("sif").value;
    }
    catch (error){}
	
	serach_for = sanitize_input(serach_for);
	
    serach_for = serach_for.toLowerCase();
	serach_for = serach_for.trim();

	document.getElementById("scrollable").style.display = "block";
	
	searching = 1;

    for(var i=1;i<cat_anz;i++)
    {
		document.getElementById("table_apps_cat"+i).style.left = "-100vw";
		//document.getElementById("table_apps_cat"+i).style.visibility = "collapse"; 
	}
	
	
    if (serach_for == "") 
    {
		try
		{
			document.getElementById("ss").click();
        }
        catch (error) {}
    }
    else 
    {
        var back = [];
		for(var i = 0; i<all_apps.length; i++)
        {
            var cc = all_apps[i].name;
            if (cc.toLowerCase().indexOf(serach_for.toLowerCase()) !== -1   )
            {
				if(all_apps[i].start_name != "nope")
				{
					back.push(all_apps[i]);
				}
            }

        }
        set_current_apps(back,"table_current_apps");
        
        set_app_drawer_black_white();
        document.getElementById("table_current_apps").style.display = "block";
		document.getElementById("alpha").style.display = "none"; 
		
        new_font_size_adjust();
    }
}


//When the Input Field changes
function searchappselecclock_input()
{
	"use strict";	
	var sf = document.getElementById('searchappselecclock').value;
	sf = sf.toString().toLowerCase();
	sf = sanitize_input(sf);
	var back = []; 
    for(var i = 0; i<all_apps.length; i++)
    {
            var cc = all_apps[i].name.toLowerCase();
            if( cc.toLowerCase().indexOf(sf) !== -1 )
            {
                back.push(all_apps[i]);
            }     
     }
     set_app_list(back);
}



//When the Input Field changes
function searchappselecdate_input()
{
	"use strict";
	var sf = document.getElementById('searchappselecdate').value;
	sf = sf.toString().toLowerCase();
	sf = sanitize_input(sf);
	
	var back = [];
    for(var i = 0; i<all_apps.length; i++)
    {
            var cc = all_apps[i].name.toLowerCase();

            if(  cc.toLowerCase().indexOf(sf) !== -1 )
            {
                back.push(all_apps[i]);
            }     
     }
     set_app_list(back);
}

//List all apps in order to select the clock app
function show_clock_dialog()
{
	"use strict";	
	document.getElementById('searchappselecclock').value = "";
	set_app_list(all_apps);
	document.getElementById("allsettings").style.display = "none";
	document.getElementById("homescreen_div").style.display = "none"; 
	document.getElementById("settings_setclockapp_div").style.display = "flex"; 
}

//List all apps in order to select the date app
function show_date_dialog()
{
	"use strict";	
	document.getElementById('searchappselecdate').value = "";
	set_app_list(all_apps);
	document.getElementById("allsettings").style.display = "none";
	document.getElementById("homescreen_div").style.display = "none"; 
	document.getElementById("settings_setdateapp_div").style.display = "flex";
}


//An App is added to the homescreen
function add_app_to_homescreen()
{
	"use strict";	
	var btn_homescreen_obj = document.getElementById("btn_homescreen");
	
    if ( btn_homescreen_obj.textContent  == rm_app_from_homescreen_text )
    {
        btn_homescreen_obj.textContent = add_app_to_homescreen_text;
    }
    else 
    {
        btn_homescreen_obj.textContent = rm_app_from_homescreen_text;
    }
	
	setTimeout(function() 
	{
		var in_a = document.getElementById("s_app_start_name").textContent;
		
		for(var i = 0; i<all_apps.length; i++)
		{
			if (all_apps[i].start_name == in_a)
			{
				if (all_apps[i].cat == 0 )
				{
					all_apps[i].cat = current_kat;
				}
				else
				{
					all_apps[i].cat = "0"; //Categorie for the homescreen apps
				}
				break;
			}
		}

		var iccd = 0;
		for(var i = 0; i<all_apps.length; i++)
		{
			if (all_apps[i].cat==0 && all_apps[i].start_name == "nope") 
			{
				all_apps.splice(iccd, 1);
				break;
			}  
			iccd = iccd + 1;
		}

		update_homescreen();
		update_single_app_div(current_kat);
		new_font_size_adjust();	

		update_app_position();
		store_apps(apps_to_string(all_apps));
	   
	}, 10);
}



//For editing App Positions on the Homesceen
function edit_homescreen_table()
{	
	"use strict";	
	var table_homescreen_obj = document.getElementById("table_homescreen");
	
    document.getElementById("del_homescreen").style.display = "table";
	table_homescreen_obj.style.border = "solid";
    table_homescreen_obj.style.borderColor = "red";
	table_homescreen_obj.style.borderWidth = "1vh";
    
    //Remove all Badges...
	clear_all_badges();
	
	mySwiper.destroy();
	mySwiper = null;
	
	document.getElementById("app_drawer").style.display = "none";
	

	redipsInit();
	
	adjust_delfromhomescreen_div();
	
	update_font_family();
	
	app_move_mode = 1;
}



//Set the positon of the delete form homescreen seciont
function adjust_delfromhomescreen_div()
{
	"use strict";	
	var elem1 = document.getElementById("removehomescreentext");
	elem1.style.fontSize = "0px"; 
	var max_w = vwTOpx(80);
	
	var max_h = document.getElementById("home_screen_div").offsetHeight;
	max_h = (max_h/100)*30;
	
	var c = 0;	
	var note_break = 0;
	var elemw = 0;
	var t_height = 0;
	
	while(true)
	{
		c = c + 10;
		note_break = note_break + 1;
		elem1.style.fontSize = c + "px"; 

		elemw = parseInt(elem1.offsetWidth);
		if( elemw > max_w)
		{
			break;
		}
		if(note_break > 2000){break;}
	}
	
	c = c - 11;
	
	if(c<0)
	{
		c=0;
	}
	note_break = 0;
	while(true)
	{
		c = c + 1;
		note_break = note_break + 1;
		elem1.style.fontSize = c + "px"; 

		elemw = parseInt(elem1.offsetWidth);
		if( elemw > max_w)
		{
			elem1.style.fontSize = (c-1) + "px"; 
			break;
		}
		if(note_break > 2000){break;}
	}
	
	note_break = 0;
	//Adjust the height
	while(true)
	{
		t_height = parseInt(elem1.offsetHeight);
		if( t_height < max_h)
		{
			break;
		}
		c = c - 1;
		if(note_break > 2000){break;}
		note_break = note_break + 1;
		elem1.style.fontSize = c + "px";
	}
	elemw = parseInt(elem1.offsetWidth);
}



//Update/Init the homescreen table
function update_homescreen() 
{
	"use strict";	
	
    var table_id = document.getElementById("table_homescreen");
	for(var i = table_id.rows.length - 1; i >= 0; i--)
	{
		table_id.deleteRow(i);
	}

    var row_blank = '<div class="home_table_icon_blank" disp_name="nope" start_name="nope"></div>';

	var home_screen_apps_array = [];

	for(var i = 0; i<all_apps.length; i++)
	{
        var cat = all_apps[i].cat;
        
        if (cat == 0  )
        {  
            home_screen_apps_array.push(all_apps[i]);
        }
    }

	
	if ( home_screen_apps_array.length <= (zeilen_homescreen*spalten_homescreen))
	{

		var anz_push = (spalten_homescreen*zeilen_homescreen) - home_screen_apps_array.length;
		for (var it = 0; it < anz_push;it++)
		{
					
			var icon = "nope";
			var disp_name = "nope";
			var start_name = "nope";
			var add_app = new App(start_name, disp_name, icon, 0);
			all_apps.push(add_app);
		}
		var home_screen_apps_array = [];
		
		for(var i = 0; i<all_apps.length; i++)
		{
			var cat = all_apps[i].cat;
        
			if (cat == 0 || cat == "0")
			{  
				home_screen_apps_array.push(all_apps[i]);
			}
		}
	}
	else
	{
	
		var home_max = zeilen_homescreen*spalten_homescreen;
		var homescreen_apps_c = 0;
		for(var i = 0; i<all_apps.length; i++)
		{
	
			if(all_apps[i].cat == 0 && all_apps[i].start_name != "nope")
			{
					homescreen_apps_c = homescreen_apps_c + 1;
			}
		}
		
		var nopes_remove_from_home_screen = parseInt(home_screen_apps_array.length - homescreen_apps_c);
		var remove_real_from_home_screen = parseInt(homescreen_apps_c-home_max);
	
		if(remove_real_from_home_screen<0)
		{
			nopes_remove_from_home_screen = nopes_remove_from_home_screen + remove_real_from_home_screen;
			remove_real_from_home_screen = 0;
		}
		
	
		var home_screen_apps_array = [];
		var nope_count = 0;
		var real_count = 0;
		for(var i = 0; i<all_apps.length; i++)
		{
			var cat = all_apps[i].cat;
        
			if (cat == 0 )
			{  
				
				if(all_apps[i].start_name == "nope")
				{
					nope_count = nope_count + 1;
					if(nope_count > nopes_remove_from_home_screen)
					{ 
						home_screen_apps_array.push(all_apps[i]);
					}		
				}
				else
				{
					real_count = real_count + 1;
					if( real_count > remove_real_from_home_screen)
					{ 
						home_screen_apps_array.push(all_apps[i]);
					}
					else
					{
						all_apps[i].cat = guess_cat(all_apps[i].name , all_apps[i].start_name );
					}
				}		
			}			
		}
	
		if(remove_real_from_home_screen>0)
		{
			for(var i=1;i<cat_anz;i++)
			{
				var catt = apps_by_cat(all_apps, ""+i);
				set_current_apps(catt,"table_apps_cat"+i);
			}
			set_app_drawer_black_white();
			update_font_family();
			new_font_size_adjust();
			update_search_div();
		}
		
	}
	
    home_screen_apps_array.reverse();

	var temp_array_rows = [];
	
	var cc = 0;
	
	for (i = 0; i < (zeilen_homescreen*spalten_homescreen); i++)
	{
		
        if (typeof home_screen_apps_array[i] == 'undefined')
        {
			//console.log("Error");
        }
        else
        {
			
            var disp_name = home_screen_apps_array[i].name;
            var start_name = home_screen_apps_array[i].start_name;
            var icon = home_screen_apps_array[i].icon;
			
			var row = '<div ontouchstart="app_touch_start(event);" ontouchend="app_touch_end(event);" class="home_table_icon redips-drag" disp_name="' + disp_name + '"  start_name="' + start_name + '" icon="' + icon + '" cat="' + cat + '" > <div class="homescreen_wrapper"> <img class="badges" src="icons/0_bad.png"> <div class="home_icon_read"> <img class="homescreenicon" src="' + icon + '"> </div>  </div> </div>';
				
            if (disp_name == "nope" && start_name == "nope") 
            {
                var row = row_blank;
            }
            
			temp_array_rows.push(row);
          
            if (cc == (spalten_homescreen-1)  ) 
            {

				temp_array_rows = temp_array_rows.reverse();

				var full_string = "";
				
				
				for (var it = 0; it < temp_array_rows.length; it++)
				{
					var current_row_string = temp_array_rows[it];
					full_string = full_string + "<td>" + current_row_string + "</td>";
				}
								
				var x = table_id.insertRow(0);
				x.innerHTML='<tr class="child">'+full_string+'</tr>'; 
    
				cc = -1;
				temp_array_rows = [];
            }  
        }
        cc = cc + 1;

    }

	
	document.getElementById("del_homescreen").style.display = "none"; 
	
	if (startpage == "n") 
    {
		document.getElementById("startpmn").checked = true;

        var x = document.querySelectorAll(".home_icon_read");
        for (var i = 0; i < x.length; i++)
		{
			x[i].style.backgroundColor = "transparent";
		}
		
    } 
    else //Background...
    {
		document.getElementById("startpmr").checked = true;
		
    	var x = document.querySelectorAll(".home_icon_read");
		for (var i = 0; i < x.length; i++)
		{
			x[i].style.borderRadius = "20%";
			x[i].style.backgroundColor = "rgba(204, 204, 204,0.4)";
		}
	}

	update_font_family();
	set_homescreen_black_white();


	if(nav_bar_state=="0")
	{
		set_homescreen_padding(0,0);
		unset_trans();
	}
	
	if(nav_bar_state=="1")
	{
		
		var orientation = "";
		if( screen.width > screen.height){orientation = "h";}else{orientation = "v";}
		
		if(bottom_padding_zero == "1" && orientation == "h" ) 
		{
			set_homescreen_padding(status_bar_padding,0);		
		}
		else
		{
			set_homescreen_padding(status_bar_padding,nav_bar_padding);
		}
	
		set_trans();
	
	}

}


//Function for showing hidden Apps
function show_all_hidden_apps()
{
	"use strict";
    end_search();
    
    if(  window.getComputedStyle(document.getElementById("dropdm_popup")).display == "block" ) //Hide Dropdown menu
    {
		 document.getElementById("dropdm_popup").style.display = "none";
	}
	
    document.getElementById("showhiddenappslielement").style.display = "none"; 
    document.getElementById("Cat_name_text").textContent = hidden_apps_text;
    
    for(var i=1;i<cat_anz;i++)
    {
		document.getElementById("table_apps_cat"+i).style.left = "-100vw";
	}

    var abc = apps_by_cat(all_apps, hidden_cat);
    set_current_apps(abc,"table_current_apps");
    
    set_app_drawer_black_white();
	show_hidden = 1;

    document.getElementById("table_current_apps").style.display = "block";
    document.getElementById("header").style.display = "block";
    document.getElementById("appsettings").style.display = "none";
    update_font_family();
    new_font_size_adjust();

}


//Used to hide an App
function hide_app()
{
	"use strict";    
	if ( document.getElementById("btn_app_aus").textContent == hide_app_text )
	{
        document.getElementById("btn_app_aus").textContent = show_app_text;
    }
    else
    {
       document.getElementById("btn_app_aus").textContent = hide_app_text;
    }

	setTimeout(function() 
	{
		var in_a = document.getElementById("s_app_start_name").textContent; 
		
		for(var i = 0; i<all_apps.length; i++)
		{
			if (all_apps[i].start_name == in_a) 
			{
				if (all_apps[i].cat == hidden_cat )
				{
					all_apps[i].cat = guess_cat(all_apps[i].name , all_apps[i].start_name );
				} 
				else
				{
					all_apps[i].cat = hidden_cat; //Categorie with the hidden apps
				}
				break;
			}
		}
		
	   update_app_divs();
    
    }, 10); 
    
}


//When the an app should be started from the detailed view
function start_app_f()
{
	"use strict";	
	var in_a = document.getElementById("s_app_start_name").textContent;
	launch_app(in_a);
}





//When moving Apps is allowed
function allow_app_move()
{
	"use strict";	
	document.getElementById("Cat_name_text").textContent = move_apps_text;
	
	if(swipe_mode=="l")
	{
		//mySwiper.addSlide(0,document.getElementById("app_drawer"));
		//mySwiper.addSlide(1,document.getElementById("homescreen"));
		
		swapNodes(document.getElementById("app_drawer"),document.getElementById("homescreen"));
	
		document.getElementById("scrollable").style.left = "20vw";//20vw
		document.getElementById("alpha").style.left = "20vw";//20vw
		
		if(appdrawer_align == "r")
		{
			document.getElementById("scrollable").style.left = "0vw";//20vw
			document.getElementById("alpha").style.left = "0vw";//20vw
		}
		else
		{
			document.getElementById("scrollable").style.left = "20vw";//20vw
			document.getElementById("alpha").style.left = "20vw";//20vw
		}	
	}	

	mySwiper.destroy();
	
    redipsInit();
    
    if( document.getElementById("dropdm_popup").style.display == "block" ) //Hide Dropdown menu
    {
		 document.getElementById("dropdm_popup").style.display = "none";
	}

    app_move_mode = 1;
    
    var scroll_div = document.getElementById("scrollable");
    scroll_div.style.border = "solid";
	scroll_div.style.borderColor = "red"; 
	scroll_div.style.borderWidth = "1vw";
	
}



//When an App is clicked - might be an long press
function app_touch_start(e)
{
	"use strict";	
	startx = e.touches[0].clientX;
	starty = e.touches[0].clientY;

	move_x = startx;
	move_y = starty;
	
	type_of_touch = 1; //the value is 1, when the touch is started
	
	if( document.getElementById("dropdm_popup").style.display == "block" ) //Hide Dropdown menu Mit computetd style anpassen!!
    {
		 document.getElementById("dropdm_popup").style.display = "none";
	}
	
	setTimeout(function()
	{
		long_touch_check(startx, starty);
	}, long_click_timeout); //Timeout for a long click

}



//Long Press Check for Clock/Date on the Homescreen
function home_touch_start(e)
{
	"use strict";	
	startx = e.touches[0].clientX;
	starty = e.touches[0].clientY;
	
	move_x = startx;
	move_y = starty;
	
	type_of_touch = 1; //the value is 1, when the touch is started
		
	try
	{
		clearTimeout(home_touch_start_timer);
	}
	catch (e) {}
			
	home_touch_start_timer = setTimeout(function()
	{
		long_touch_check(startx, starty);
	}, long_click_timeout*1.3); //Timeout for a long click

}



//If the toch on Clock/Date widget ends
function home_touch_end()
{
	"use strict";
	type_of_touch = 3; //End long touch...
}
 
 

//Movement while touching
function on_touch_move(e)
{
	"use strict";	
	move_x = e.touches[0].clientX;
	move_y = e.touches[0].clientY;	
}

//When a touch is finished
function app_touch_end(e)
{
	"use strict";	
	var dist_x = 0;
	var dist_y = 0;
	
	try
	{
		dist_x = startx - mySwiper.config.currentX;  //mySwiper.touches.currentY;
		dist_y = starty - mySwiper.config.currentY; //mySwiper.touches.currentY
		if(dist_x<0){dist_x = dist_x*-1;}
		if(dist_y<0){dist_y = dist_y*-1;}
	}
	catch(ee)
	{}
	
	var dist_x_m = startx - e.changedTouches[0].pageX;
	var dist_y_m = starty - e.changedTouches[0].pageY;
	if(dist_x_m<0){dist_x_m = dist_x_m*-1;}
	if(dist_y_m<0){dist_y_m = dist_y_m*-1;}

		if( pxTOvw(dist_x) > 2)
		{
			//To much movement
			type_of_touch = 3;
			return;
		}
		
		if( pxTOvh(dist_y) > 2)
		{
			//To much movement
			type_of_touch = 3;
			return;
		}		
		
		if( pxTOvw(dist_x_m) > 2)
		{
			//To much movement
			type_of_touch = 3;
			return;
		}
		
		if( pxTOvh(dist_y_m) > 2)
		{
			//To much movement
			type_of_touch = 3;
			return;
		}	
		
		
		if(type_of_touch==1) //Should not be finished before
		{
				type_of_touch = 3; //Now its finishe
                var ee = document.elementFromPoint(startx, starty);
	
                if (ee != null) 
                {
					var klasse = ee.parentElement.getAttribute("class");
		
                    if (klasse == "gallery redips-drag" || klasse == "gallery redips-drag" ) 
                    {
						var start_name = ee.parentElement.getAttribute("start_name");
                        launch_app(start_name);
                        return;
                    }
                    

                   if (klasse == "home_icon_read" || klasse == "home_icon_read") 
                   {
						var start_name = ee.parentElement.parentElement.parentElement.getAttribute("start_name");
                        launch_app(start_name);
                        return;
                    }
                    
                   if (klasse == "homescreen_wrapper" || klasse == "homescreen_wrapper" )
                    {
						var start_name = ee.parentElement.parentElement.getAttribute("start_name"); 
                        launch_app(start_name);
                        return;
                    }
				}
         }                           
}


//Detailed app settings will be closed
function end_app_settings()
{
	"use strict";	

	var appsettings_obj = document.getElementById("appsettings") ;
	if( window.getComputedStyle(appsettings_obj).display == "block" )
	{	
        end_search();

		document.getElementById("header_blank").style.display = 'block';
		document.getElementById("app_ba").style.display = 'block';
		document.getElementById("appsettings_ba").style.display = 'none';

		if (name_field != null  ) //Still editing the App name...
		{
			update_app_rename();
		}
			
        document.getElementById("table_current_apps").style.display = "none";
        if(searching==0)
        {
			document.getElementById("table_apps_cat"+current_kat).style.left = "0vw";
			//document.getElementById("table_apps_cat"+current_kat).style.visibility = "visible";
        }
        document.getElementById("header").style.display = "block";
        appsettings_obj.style.display = "none";
		document.getElementById("scrollable").style.display = "block";
		
        type_of_touch = 3;
        init_swiper(0);
        return;
    }
}


//Open an App Categorie
function open_categorie(event,in_obj)//,type)
{
	"use strict";

	//LongPress check
	if ( event != null )
	{
		startx = event.touches[0].clientX;
		starty = event.touches[0].clientY;

		move_x = startx;
		move_y = starty;
		
		type_of_touch = 1; //the value is 1, when the touch is started
		try
		{
			clearTimeout(long_press_cat_timer);
		}
		catch (e) {}
			
		long_press_cat_timer = setTimeout(function()
		{
			long_touch_check(startx, starty);
		}, long_click_timeout*1.3); //Timeout for a long click	
	}

	
	
	var dropdm_popup_obj = document.getElementById("dropdm_popup");
	
    if(  window.getComputedStyle(dropdm_popup_obj).display == "block" ) //Hide Dropdown menu
    {
		 dropdm_popup_obj.style.display = "none";
	}
	
	if(show_hidden==1)
	{
		document.getElementById("Cat_name_text").textContent = cat_array[current_kat];//kat_list[current_kat];
		document.getElementById("scrollable").style.display = 'block';
		document.getElementById("table_apps_cat"+current_kat).style.left = "0vw";
		document.getElementById("table_current_apps").style.display = 'none';
		document.getElementById("showhiddenappslielement").style.display = 'block';
		show_hidden = 0;
	}
	
   end_appmove_appdrawer();
	
	if (should_update == 1 )
	{
		update_app_position();
		should_update = 0;
	}
	
    end_search();
    
    
	var table_id = document.getElementById("cat");

	var tds = table_id.getElementsByTagName("tr");
	for (var i=0; i<tds.length; i++)
	{
		if(i==current_kat-1)
		{
			tds[i].classList.remove("active_right");	
			break;
		}
	}
	

	in_obj.parentElement.classList.add("active_right");
	
		
   	var cat_h = table_id.style.top;
   	cat_h = parseInt( cat_h.replace("px","") );
   	
   
   	var elem_r = document.getElementById("right");
   	var cat = 1;

	//elem_r.style.top = cat_h + in_obj.offsetTop+"px";
	//elem_r.style.height = in_obj.offsetHeight+"px";
	cat = in_obj.id;
			
	if(new_indicator_width == -1) //Reduce repaints
	{		
		new_indicator_width = (document.getElementById("1_png").offsetWidth/100)*15;
    }
    //elem_r.style.width = new_indicator_width+"px";
    
    elem_r.style.cssText +=';'+"top:"+ (cat_h + in_obj.offsetTop)+"px;height:"+in_obj.offsetHeight+"px;width:"+new_indicator_width+"px";
    
   
	if(cat < 0 || cat == "" || cat == null)
	{
		cat = 1;
	}
	    
    if(cat == 1)
    {
		if(cat_1_new.length > 0 && cat_1_new.length < 4 )
		{
			setTimeout(function() 
			{
				unset_new_cat(1);
				cat_1_new = [];
			},3000);
		
			for(var i = 0; i<cat_1_new.length; i++)
			{
				set_new_app(cat_1_new[i]);
			}  
		}
	}
	
    if(cat == 2)
    {
		if(cat_2_new.length > 0 && cat_2_new.length < 4 )
		{
			setTimeout(function() 
			{
				unset_new_cat(2);
				cat_2_new = [];
			},3000);
			for(var i = 0; i<cat_2_new.length; i++)
			{
				set_new_app(cat_2_new[i]);
			}  
		}
	}
	
    if(cat == 3)
    {
		if(cat_3_new.length > 0 && cat_3_new.length < 4 )
		{
			setTimeout(function() 
			{
				unset_new_cat(3);
				cat_3_new = [];
			},3000);

			for(var i = 0; i<cat_3_new.length; i++)
			{
				set_new_app(cat_3_new[i]);
			}  
		}
	}
	
    if(cat == 4)
    {
		if(cat_4_new.length > 0 && cat_4_new.length < 4 )
		{
			setTimeout(function() 
			{
				unset_new_cat(4);
				cat_4_new = [];
			},3000);
		
			for(var i = 0; i<cat_4_new.length; i++)
			{
				set_new_app(cat_4_new[i]);
			}  
		}
	}	

    if(cat == 5)
    {
		if(cat_5_new.length > 0 && cat_5_new.length < 4 )
		{
			setTimeout(function() 
			{
				unset_new_cat(5);
				cat_5_new = [];
			},3000);
		
			for(var i = 0; i<cat_5_new.length; i++)
			{
				set_new_app(cat_5_new[i]);
			}  
		}
	}
	
    if(cat == 6)
    {
		if(cat_6_new.length > 0 && cat_6_new.length < 4 )
		{
			setTimeout(function() 
			{
				unset_new_cat(6);
				cat_6_new = [];
			},3000);
			for(var i = 0; i<cat_6_new.length; i++)
			{
				set_new_app(cat_6_new[i]);
			}  
		}
	}
	
	try
	{
		document.getElementById("Cat_name_text").textContent = cat_array[cat-1][1];//kat_list[cat];
	}
	catch( error ){}
	
	if(document.getElementById("header").style.display != "block")
	{
		document.getElementById("header").style.display = 'block';
	}
	
	if(document.getElementById("header_blank").style.display != "block")
	{
		document.getElementById("header_blank").style.display = 'block';
	}
	
	if(document.getElementById("table_current_apps").style.display != 'none')
	{
		document.getElementById("table_current_apps").style.display = 'none';
	}
	
	var app_setting_was_visible = 0;

    end_app_settings();
    
	if(current_kat==cat && app_setting_was_visible == 0)
	{
		return;
	}
	

	if(current_kat!=-1)
	{
		current_kat = cat;
		for(var i=1;i<cat_anz;i++)
		{
			if(i==current_kat)
			{
				document.getElementById("table_apps_cat"+i).style.left = "0vw";
			}
			else
			{
				try
				{
					if(document.getElementById("table_apps_cat"+i).style.left != "-100vw")
					{
						
						try
						{
							document.getElementById("table_apps_cat"+i).style.left = "-100vw";
						}
						catch (e) {}
					}
				}
				catch (e) {}
			}
		}
	}
	else //Just at startup
	{
		for(var i=2;i<cat_anz;i++)
		{
			try
			{
				document.getElementById("table_apps_cat"+i).style.left = "-100vw";
			}
			catch (e) {}
		}
		document.getElementById("table_apps_cat1").style.left = "0vw";
	}
	
	current_kat = cat;
}


//Check if a App starts with Letter X (A,B,C,D...)
function check_b_in_all(in_b)
{
	"use strict";	
    var back = false;
    for(var i = 0; i<all_apps.length; i++)
    {
        var cc = all_apps[i].name;
		
        if(all_apps[i].start_name != "nope")
        {

			cc = cc.charAt(0);
			
			if (cc == in_b)
			{
				back = true;
				break;
			}
			else
			{
				cc = cc.toLowerCase();
				
				//German Umlaute
				cc = cc.replace("ä","a");
				cc = cc.replace("ü","u");
				cc = cc.replace("ö","o");
				cc = cc.replace("ẞ","s");
				cc = cc.replace("$","s");
				cc = cc.replace("ẞ","s");	

				cc = cc.charAt(0);
				if (cc == in_b)
				{
					back = true;
					break;
				}
			}
        
		}

    }
    return back;
}


//Returning Apps Starting with Letters in alphabetic order
function get_all_start()
{
	"use strict";	
    var back = [];

    var current_b;
    for (var i = 0; i < 36; i = i + 1) 
    {

		var ok = false;
        if (i < 10)
        {
            var current_b = i;
			ok = check_b_in_all(current_b);
			if (ok == true)
			{
				back.push(current_b);
			}
        }
        else 
        {
            var current_b_big =  String.fromCharCode(55 + i);
            var current_b_small = String.fromCharCode(87 + i);
            ok = check_b_in_all(current_b_small);
            if (ok == true)
			{
				back.push(current_b_big);
			}
        }
        
    }
   
    return back;
}


//Redips Lib initialization
function redipsInit()
{
	"use strict";
	if(current_view=="homescreen")
	{
		rd.init("homescreen");
	}
	else
	{
		rd.init("redips-drag");		
	}
	
    rd.shift.animation = false;
    rd.style.borderEnabled  = 'none';
    
    rd.event.moved = function() 
    {
        //var tbl = rd.findParent('TABLE', rd.obj);
        if(current_view=="homescreen")
		{
			rd.dropMode = 'switch'; //'switch';
		}
		else
		{
			rd.dropMode = 'shift'; //'shift';
		}
    };
}

//When an element is dropped
rd.event.dropped = function() 
{
	"use strict";	
    should_update = 1;
};


//When an element is deleted
rd.event.deleted = function()
{
	"use strict";
    if ( current_view == "homescreen" )
    {
	
        var row_blank = '<div class="home_table_icon_blank" disp_name="nope" start_name="nope"></div>';
        
        var inner_html = current_cell_element_html;

		var regex2 = /start_name="(.*?)"/;
		var regex3 = /disp_name="(.*?)"/;
	
		var start_name = "";
		var disp_name = "";

		try
		{	
			start_name = regex2.exec(inner_html)[1];
		}
		catch (ee){}			
		
		try
		{	
			disp_name = regex3.exec(inner_html)[1];
			disp_name = disp_name.substring( disp_name.lastIndexOf(">")+1 );
		}
		catch (ee){}
					  
		var into_cat = guess_cat(disp_name,start_name);

		
		
        for(var i = 0; i<all_apps.length; i++)
		{
			if(all_apps[i].start_name == start_name)
			{
				all_apps[i].cat = into_cat;
			}
		}

        current_cell_element.innerHTML = row_blank;
        update_app_position();
    }
    else
    {
        var into_cat = rd.td.target.id;
        var inner_html = current_cell_element_html ;

		var regex1 = /src="(.*?)"/;
		var regex2 = /start_name="(.*?)"/;
		var regex3 = /\">(.*?)<\/div>/;
		var icon = "";
		var start_name = "";
		var disp_name = "";
		
		try
		{
			icon = regex1.exec(inner_html)[1];
		}
		catch (e){}
		
		try
		{
			start_name = regex2.exec(inner_html)[1];
		}
		catch (e){}
		
		try
		{
			disp_name = regex3.exec(inner_html)[1];
			disp_name = disp_name.substring( disp_name.lastIndexOf(">")+1 );
		}
		catch (e){}
		
		if(into_cat != current_kat)
		{		
			var add_app = new App(start_name, disp_name, icon, into_cat);
			all_apps.unshift(add_app);
			
			update_app_position();
			
			update_single_app_div(current_kat);
			update_single_app_div(into_cat);
			
			new_font_size_adjust();
		}
		else
		{
			update_single_app_div(current_kat);
			update_app_position();
			new_font_size_adjust();
		}
		
        end_search();
        redipsInit();

    }	
};

//When an element is moved
rd.event.clicked = function(currentCell)
{
	"use strict";	
    current_cell_element = currentCell;
    current_cell_element_html = currentCell.innerHTML;
};


//This functions is called when a long click happend...
function open_app_settings(in_element)
{
	"use strict";	
	end_search();    

    var inner_html = "<div>" + in_element.innerHTML + "</div>";
    
    if(  inner_html.toLowerCase().indexOf("start_name") == -1  )
    {
		inner_html = "<div>" +  in_element.parentElement.innerHTML + "</div>";
	}

	//Get element propertys
	var regex1 = /src="(.*?)"/;
	var regex2 = /start_name="(.*?)"/;
	var regex3 = /\">(.*?)<\/div>/;		  
	var icon = "";
	var start_name = "";
	var disp_name = "";
	
	try
	{
		icon = regex1.exec(inner_html)[1];
	}
	catch (e){}
	
	try
	{
		start_name = regex2.exec(inner_html)[1];
	}
	catch (e){}
					
	try
	{
		disp_name = regex3.exec(inner_html)[1];
		disp_name = disp_name.substring( disp_name.lastIndexOf(">")+1 );
	}
	catch (e){}
	
	try
	{
		disp_name = regex3.exec(inner_html)[1];
		disp_name = disp_name.substring( disp_name.lastIndexOf(">")+1 );
	}
	catch (e){}
					

	if(disp_name=="")
	{
		return;
	}

	document.getElementById("scrollable").style.display = "none";
	
	if(swipe_mode=="l")
	{
		//Support for swiperjs
		//mySwiper.addSlide(0,document.getElementById("app_drawer"));
		//mySwiper.addSlide(1,document.getElementById("homescreen"));
		
		swapNodes(document.getElementById("app_drawer"),document.getElementById("homescreen"));
	}
	
	mySwiper.destroy();
	
    document.getElementById("s_app_name").textContent = disp_name;
    var s_app_start_name_obj = document.getElementById("s_app_start_name");
    s_app_start_name_obj.textContent = start_name;
    s_app_start_name_obj.style.display = "none"; 
    document.getElementById("s_app_icon").src = icon;
    
    if(black_white == "1")
    {
		document.getElementById("s_app_icon").style.webkitFilter = "grayscale(100%)";
	}
    else
    {
		document.getElementById("s_app_icon").style.webkitFilter = "grayscale(0%)";
	}
		
    document.getElementById("table_current_apps").style.display = "none"; 
	document.getElementById("table_apps_cat"+current_kat).style.left = "-100vw";
    document.getElementById("header").style.display = "none"; 
    document.getElementById("header_blank").style.display = "none"; 
    document.getElementById("app_ba").style.display = "none"; 
    
    document.getElementById("appsettings").style.display = "block";
    document.getElementById("appsettings_ba").style.display = "block";
    
	for(var i = 0; i<all_apps.length; i++)
    {
        if (all_apps[i].start_name == start_name) 
        {
			if(all_apps[i].cat == hidden_cat )
			{
				document.getElementById("btn_app_aus").textContent = show_app_text;
			}
			else
			{
				document.getElementById("btn_app_aus").textContent = hide_app_text;
			}
            break;
        }
    }
    
	//Count Apps on home Screen
	var homescreen_apps = 0;

	for(var i = 0; i<all_apps.length; i++)
    {
			if(all_apps[i].cat == 0 && all_apps[i].start_name != "nope")
			{
					homescreen_apps = homescreen_apps + 1;
			}
    }
    
    var btn_homescreen_obj = document.getElementById("btn_homescreen");
    
	if(homescreen_apps >= (spalten_homescreen*zeilen_homescreen) )
	{
		btn_homescreen_obj.style.display = "none"; 
	}
	else
	{	
		btn_homescreen_obj.style.display = "block";
	}
	
    for(var i = 0; i<all_apps.length; i++)
    {
        if (all_apps[i].start_name == start_name) 
        {
		
			if(all_apps[i].cat == 0)
			{
					btn_homescreen_obj.textContent = rm_app_from_homescreen_text;
					btn_homescreen_obj.style.display = "block";
			}
			else
			{	
				    btn_homescreen_obj.textContent = add_app_to_homescreen_text;			
			}
            break;
        }
    }

}


//The Constructer for an App Object
function App(start_name, name, icon, cat) 
{
	"use strict";	
    this.start_name = start_name;
    this.name = name;
    this.icon = icon;
    this.cat = cat;
}


//This Function is returning all Apps of a categorie
function apps_by_cat(in_array, in_cat)
{
	"use strict";	
    var back = [];
    in_cat = parseInt(in_cat);

    for(var i = 0; i<in_array.length; i++)
    {
        if ( parseInt(in_array[i].cat) == in_cat) 
        {
            back.push(in_array[i]);
        }
    }
    return back;
}


//Set the Font Style for the Appdrawer and the Homescreen
function update_font_family()
{
	"use strict";
		
	document.getElementById("scrollable").style.fontFamily = appdrawer_font; 
	document.getElementById("header").style.fontFamily = appdrawer_font; 
	document.getElementById("searchtable").style.fontFamily = appdrawer_font; 
	document.getElementById("sif").style.fontFamily = appdrawer_font; 
	
	//Homescreen
	document.getElementById("middle").style.fontFamily = homescreen_font;
}


//This functions is showing the current Apps
function set_current_apps(in_array,in_table)
{
	"use strict";	

    //Clear Table
    var table_id = document.getElementById(in_table);
   
    if( table_id == null )
    {
		//Create new...
		new_table = document.createElement('table');
		new_table.setAttribute("id", in_table);
		new_table.setAttribute('class', 'apptable');

		document.getElementById("scrollable").appendChild(new_table);
		table_id = new_table;
		//return;
		new_table.style.left = "-100vw";
	}
    
	for(var i = table_id.rows.length - 1; i >= 0; i--)
	{
		table_id.deleteRow(i);
	}

	var temp_array_rows = [];
	var cc = 0;
	for(var i = 0; i<in_array.length; i++)
	{
        var name = in_array[i].name;
        var icon = in_array[i].icon;
        var cat =  in_array[i].cat;
        var start_name = in_array[i].start_name;

        if (icon == undefined) 
        {
            break;
        }
        
		if(cat == hidden_cat )
		{
			var add_class = "hidden_app";
		}
		else
		{
			var add_class = "normal_app";
		}
  
        var row = '<div ontouchstart="app_touch_start(event);" ontouchend="app_touch_end(event);" class="gallery redips-drag" start_name="' + start_name + '"  ><img class="'+add_class+'" src="' + icon + '"> <div class="desc" start_name="' + start_name + '">' + name + '</div></div>';
     
		temp_array_rows.push(row);
		
        if (cc == spalten_appdrawer-1) 
        {
			var full_string = "";
			for (var it = 0; it < temp_array_rows.length; it++) 
			{
				var current_row_string = temp_array_rows[it];					
				full_string = full_string + "<td>" + current_row_string + "</td>";
			}
				
			var new_row = table_id.insertRow(-1);
			new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
			cc = -1;
			temp_array_rows = [];	
		}
		
        cc = cc + 1;
    }
    
    
    if(temp_array_rows.length > 0)
    {
		var full_string = "";
		for (var it = 0; it < temp_array_rows.length; it++) 
		{
			var current_row_string = temp_array_rows[it];					
			full_string = full_string + "<td>" + current_row_string + "</td>";
		}
		
		var missing = (spalten_appdrawer - temp_array_rows.length);
		
		if(missing > 0 )
		{
			for (var itm = 0; itm < missing; itm++) 
			{				
				full_string = full_string + "<td class='redips-mark' ></td>";
			}
		}
		
		var new_row = table_id.insertRow(-1);
		new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
	}
	
	
	var all_tds = table_id.getElementsByTagName("td");
	for (var i=0; i<all_tds.length; i++)
	{
		all_tds[i].style.width = (80/spalten_appdrawer)+"vw";
	}
	
}


//When the menu button is touched
function menu_icon_click()
{	   
	"use strict";	
	var dropdm_popup_obj = document.getElementById("dropdm_popup");
    if( window.getComputedStyle(dropdm_popup_obj).display == "block" )
    {
		 dropdm_popup_obj.style.display = "none";
	}
	else
	{
		 //Count hidden Apps
		 var bg_tmp = apps_by_cat(all_apps, hidden_cat );
		 if(bg_tmp.length > 0)
		 {
			document.getElementById("showhiddenappslielement").style.display = "block";
	     }
	     else
	     {
			document.getElementById("showhiddenappslielement").style.display = "none"; 
		 }
		 
		 var bg_tmp2 = apps_by_cat(all_apps, current_kat);

		 if(searching == 1 || show_hidden == 1 || bg_tmp2.length < 1)
		 {
			 document.getElementById("allowappmovelielement").style.display = "none";
			 document.getElementById("appoderalphalielement").style.display = "none";
		 }
		 else
		 {
			 if(bg_tmp2.length < 2)
			 {
				document.getElementById("appoderalphalielement").style.display = "none";
			 }
			 else
			 {
				document.getElementById("appoderalphalielement").style.display = "block";
			 }
			 
			 if( app_move_mode == 0)
			 {
				document.getElementById("allowappmovelielement").style.display = "block";
				document.getElementById("appoderalphalielement").style.display = "none";
			 }
			 else
			 {
				 document.getElementById("allowappmovelielement").style.display = "none";
				 document.getElementById("showhiddenappslielement").style.display = "none";
			 } 	

		 }	
		 
		 if(show_hidden == 1)
		 {
			 document.getElementById("showhiddenappslielement").style.display = "none";
			 document.getElementById("appoderalphalielement").style.display = "none";
		 }
		
		 document.getElementById("dropdm_popup").style.display = "block";
	}
}


//When the search icon is touched
function search_icon_click()
{
	"use strict";
	end_appmove_appdrawer();

	searching = 1; //Other functions know, the search Dialog is active
	document.getElementById("sif").value = "";
 	document.getElementById("scrollable").style.display = "none";
	document.getElementById("Cat_name").style.display = "none";
	document.getElementById("table_current_apps").style.display = "none";
    document.getElementById("search_input").style.display = "block";
    document.getElementById("alpha").style.display = "block";
    document.getElementById("searchtable").style.display = "block";
    
    var dropdm_popup_obj = document.getElementById("dropdm_popup");
    if(  window.getComputedStyle(dropdm_popup_obj).display == "block" ) //Hide Dropdown menu
    {
		dropdm_popup_obj.style.display = "none";
	}
	
}


//If the search is opend, this function ends the search
function end_search()
{
	"use strict";
	if(searching==0) //Only when searching is active
	{
		return;
	}
	try
	{
		document.getElementById("scrollable").style.display = "block";
		document.getElementById("Cat_name").style.display = "table";
		document.getElementById("search_input").style.display = "none";
		document.getElementById("alpha").style.display = "none";
		document.getElementById("table_current_apps").style.display = "none";
		document.getElementById("Cat_name_text").textContent = cat_array[current_kat][1];//kat_list[current_kat]  ;
	}
	catch(error){}
	
    for(var i=1;i<cat_anz;i++)
    {
		document.getElementById("table_apps_cat"+i).style.left = "-100vw";
		//document.getElementById("table_apps_cat"+i).style.visibility = "collapse";
	}

	try
	{
		document.getElementById("header").style.display = "block";
		document.getElementById("appsettings").style.display = "none";
		document.getElementById("table_apps_cat"+current_kat).style.left = "0vw";
		//document.getElementById("table_apps_cat"+current_kat).style.visibility = "visible";
	}
	catch(error){}
    
    var dropdm_popup_obj = document.getElementById("dropdm_popup");
    
    if(  window.getComputedStyle(dropdm_popup_obj).display == "block" ) //Hide Dropdown menu
    {
		dropdm_popup_obj.style.display = "none";
	}
	
    searching = 0; //Set searching to 0
}


//Function to show the search for a letter
function show_search_letter(in_element) 
{
	"use strict";	
	searching = 1;	
	
	if(document.getElementById("scrollable").style.display  != "block")
	{
		document.getElementById("scrollable").style.display = "block";	
	}
	
	document.getElementById("table_apps_cat"+current_kat).style.left = "-100vw";

	var in_letter = in_element.textContent;
		
    in_letter = in_letter.toLowerCase();
	in_letter = in_letter.trim();
	
	if(in_letter==""){return;}
    var result_apps_array = [];

    for(var i = 0; i<all_apps.length; i++)
    {
        var current_app = all_apps[i].name;
        current_app = current_app.toLowerCase();
        
        current_app = current_app.replace("ä","a");
		current_app = current_app.replace("ü","u");
		current_app = current_app.replace("ö","o");
		current_app = current_app.replace("ẞ","s");
	
        current_app = current_app.charAt(0);
        if (current_app.toLowerCase() == in_letter)
        {
			if(all_apps[i].start_name != "nope")
			{
				result_apps_array.push(all_apps[i]);
			}
        }
    }
			
	set_current_apps(result_apps_array,"table_current_apps");
   
	set_app_drawer_black_white();
	
	document.getElementById("table_current_apps").style.display = "block";
	document.getElementById("alpha").style.display = "none";
	document.getElementById("header").style.display = "block";
	document.getElementById("search_input").style.display = "none";
	document.getElementById("Cat_name_text").textContent = result_string+": " + in_letter;
	document.getElementById("Cat_name").style.display = "table";
	
	update_font_family();
    new_font_size_adjust();
}


//If the Appdrawer icons should be black and white
function set_app_drawer_black_white()
{
	"use strict";				
	var appdrawer_icon_size_tmp = parseInt(appdrawer_icon_size) + 2;

    if(black_white=="1")
	{
		var normal_apps = document.querySelectorAll(".normal_app");
		for (var i = 0; i < normal_apps.length; i++)
		{
			normal_apps[i].style.webkitFilter = "grayscale(100%)";
			normal_apps[i].style.maxHeight = appdrawer_icon_size_tmp + "vh";
			normal_apps[i].style.maxWidth = appdrawer_icon_size_tmp + "vw";
		}
			
		var hidden_apps = document.querySelectorAll(".hidden_app");
		for (var i = 0; i < hidden_apps.length; i++)
		{
			hidden_apps[i].style.webkitFilter = "grayscale(100%)";
			hidden_apps[i].style.maxHeight = appdrawer_icon_size_tmp + "vh";
			hidden_apps[i].style.maxWidth = appdrawer_icon_size_tmp + "vw";
		}
	}
	else
	{
		var normal_apps = document.querySelectorAll(".normal_app");
	
		for (var i = 0; i < normal_apps.length; i++)
		{
			normal_apps[i].style.webkitFilter = "grayscale(0%)";
			normal_apps[i].style.maxHeight = appdrawer_icon_size_tmp + "vh";
			normal_apps[i].style.maxWidth = appdrawer_icon_size_tmp + "vw";
						
		}
		var hidden_apps = document.querySelectorAll(".hidden_app");
		for (var i = 0; i < hidden_apps.length; i++)
		{
			hidden_apps[i].style.webkitFilter = "grayscale(0%)";
			hidden_apps[i].style.maxHeight = appdrawer_icon_size_tmp + "vh";
			hidden_apps[i].style.maxWidth = appdrawer_icon_size_tmp + "vw";
		}				
	}	
			
}

//If the Homescreen icons should be black and white
function set_homescreen_black_white()
{
	"use strict";	
	if(black_white_homescreen=="1")
	{
		var homescreen_apps = document.querySelectorAll(".homescreenicon");
		for (var i = 0; i < homescreen_apps.length; i++)
		{
			homescreen_apps[i].style.webkitFilter = "grayscale(100%)";
		}
	}
	else
	{
		var homescreen_apps = document.querySelectorAll(".homescreenicon");
		for (var i = 0; i < homescreen_apps.length; i++)
		{
			homescreen_apps[i].style.webkitFilter = "grayscale(0%)";
		}
	}
	
}


//Functin is called when the position of the Apps was changed by the user
function update_app_position()
{
	"use strict";
	if (current_kat != -1) 
	{
		//Delete all Apps the main array
        var delete_string = "";

        for(var i = 0; i<all_apps.length; i++)
        {
			if(current_view == "homescreen")
			{
				if (all_apps[i].cat == 0)
				{
					delete_string = delete_string + i + ",";
				}
			}
			else
			{			
				if (all_apps[i].cat == current_kat)
				{
					delete_string = delete_string + i + ",";
				}
            }
        }

        var delete_array = delete_string.split(',');
        for (var i = delete_array.length - 1; i >= 0; i--)
        {
            if (delete_array[i] != "") 
            {
                var icc = delete_array[i];
                all_apps.splice(icc, 1);
            }
        }			
	
		var regex1 = "";
		var regex2 = "";
		var regex3 = "";
		var table = null;
		
		if(current_view == "homescreen")
		{
			table = document.getElementById("table_homescreen");
			regex1 = /icon="(.*?)"/;
			regex2 = /start_name="(.*?)"/;
			regex3 = /disp_name="(.*?)"/;
		}
		else
		{
			table = document.getElementById("table_apps_cat"+(current_kat));
			regex1 = /src="(.*?)"/;
			regex2 = /start_name="(.*?)"/;
			regex3 = /\">(.*?)<\/div>/;
		}
							
		var r=0;
		var row=null;
		var cell=null;
		while(row=table.rows[r++])
		{
			var c=0;
			while(cell=row.cells[c++])
			{
				var inner_html = cell.innerHTML;
					
				var icon = "";
				var start_name = "";
				var disp_name = "";
				try
				{
					icon = regex1.exec(inner_html)[1];
				}
				catch (e){}
						
				try
				{
					start_name = regex2.exec(inner_html)[1];
				}
				catch (e){}
						
				try
				{
					disp_name = regex3.exec(inner_html)[1];
					disp_name = disp_name.substring( disp_name.lastIndexOf(">")+1 );
				}
				catch (e){}
						
				if(inner_html=="" && current_view == "homescreen")
				{
					//Add blank app
					var add_app = new App("nope", "nope", "nope", 0);
					all_apps.push(add_app);
				}
					
				if (start_name != undefined && start_name != "") 
				{
					if(current_view == "homescreen")
					{
						var add_app = new App(start_name, disp_name, icon, 0);
					}
					else
					{
						var add_app = new App(start_name, disp_name, icon, current_kat);
					}
					all_apps.push(add_app);
				}
			}		
		}
	}	

}


//Function is called to show the settings
function show_settings() 
{
	"use strict";	
	
	end_appmove_appdrawer();
	
	//First show the new Frame..
	
	document.getElementById("settings_ba").style.display = 'block';
	document.getElementById("allsettings").style.display = 'flex';
		
	mySwiper.destroy();
	document.getElementById("swiper_container").style.display = 'none';
		
		
	
    if(  window.getComputedStyle(document.getElementById("dropdm_popup")).display == "block" ) //Hide Dropdown menu
    {
		 document.getElementById("dropdm_popup").style.display = "none";
	}
	
	document.getElementById("modal_date_1").textContent = dayjs().locale('de').format('DD.MM.YYYY');
	document.getElementById("modal_date_2").textContent = dayjs().locale('de').format('DD.MM.YY');
	document.getElementById("modal_date_3").textContent = dayjs().locale('de').format('DD.MM');
	
	document.getElementById("modal_date_8").textContent = dayjs().locale('de').format('MM.DD.YYYY') + " (M.D)";
	document.getElementById("modal_date_9").textContent = dayjs().locale('de').format('MM.DD.YY') + " (M.D)";
	document.getElementById("modal_date_10").textContent = dayjs().locale('de').format('MM.DD') + " (M.D)";
	
	if(lang == "eng")
	{
		document.getElementById("modal_date_4").textContent = dayjs().locale('en').format('D. MMMM');
		document.getElementById("modal_date_5").textContent = dayjs().locale('en').format('dddd, D. MMMM');
		
		document.getElementById("modal_date_6").textContent = dayjs().locale('en').format('dd, DD.MM.YY');
		document.getElementById("modal_date_7").textContent = dayjs().locale('en').format('dd, DD.MM');
		
		document.getElementById("modal_date_11").textContent = dayjs().locale('en').format('dd, MM.DD')  + " (M.D)";
		document.getElementById("modal_date_12").textContent = dayjs().locale('en').format('dd, MM.DD.YY')  + " (M.D)";
	}
	else
	{
		document.getElementById("modal_date_4").textContent = dayjs().locale('de').format('D. MMMM');
		document.getElementById("modal_date_5").textContent = dayjs().locale('de').format('dddd, D. MMMM');
		
		document.getElementById("modal_date_6").textContent = dayjs().locale('de').format('dd, DD.MM.YY');
		document.getElementById("modal_date_7").textContent = dayjs().locale('de').format('dd, DD.MM');
		
		document.getElementById("modal_date_11").textContent = dayjs().locale('de').format('dd, MM.DD')  + " (M.D)";
		document.getElementById("modal_date_12").textContent = dayjs().locale('de').format('dd, MM.DD.YY')  + " (M.D)";
	}


	end_search();
		
	if(swipe_mode=="l")
	{
		//Support for swiperjs
		//mySwiper.addSlide(0,document.getElementById("app_drawer"));
		//mySwiper.addSlide(1,document.getElementById("homescreen"));
		swapNodes(document.getElementById("app_drawer"),document.getElementById("homescreen"));
	}	

	
			
    if(force_update_applist==1)
	{
		force_update_applist = 0;
		set_app_list(all_apps);
	}

	document.getElementById("searchappselecclock").value = '';
	document.getElementById("searchappselecdate").value = '';
	
}


//Updaten all divs ( Appdrawer, Homescreen and Search div)
function update_app_divs()
{
	"use strict";

	for(var i=1;i<cat_anz;i++)
	{
		var cat_content = apps_by_cat(all_apps,i);
		set_current_apps(cat_content,"table_apps_cat"+i);
	}
	
	if(searching==0)
	{
		document.getElementById("alpha").style.display = 'none';
		document.getElementById("search_input").style.display = 'none';
	}
	
	update_font_family();
	new_font_size_adjust();	
	update_homescreen();
	update_search_div();
	set_app_drawer_black_white();
	
	
	if(should_wait_loadscreen == 0)
	{
		should_wait_loadscreen = -1; //Unset
		document.getElementById("main_app_div").style.opacity = "1";
		document.getElementById("loading_div").style.display = 'none';
		/*
		if( window.getComputedStyle(document.getElementById("loading_div")).display == "flex" )
		{
			document.getElementById("loading_div").classList.add('fade');
			setTimeout(function()
			{				
				document.getElementById("loading_div").style.display = 'none';
				document.getElementById("loading_div").classList.remove('fade');
								
			},500);
		}*/
	}
	if(should_wait_loadscreen == 1)
	{
		should_wait_loadscreen = -1; //Unset
		document.getElementById("loading_div").style.display = 'flex';
		setTimeout(function()
		{
			document.getElementById("loading_div").classList.add('fade');
			setTimeout(function()
			{
				document.getElementById("main_app_div").style.opacity = "1";				
				document.getElementById("loading_div").style.display = 'none';
				document.getElementById("loading_div").classList.remove('fade');
			},800);
			
		},3800);
		
		/*
		if( window.getComputedStyle(document.getElementById("loading_div")).display == "flex" )
		{
			setTimeout(function()
			{
				document.getElementById("loading_div").classList.add('fade');
				setTimeout(function()
				{				
					document.getElementById("loading_div").style.display = 'none';
					document.getElementById("loading_div").classList.remove('fade');
				},800);
			
			},3800);
			return;
		}
		*/
		//document.getElementById("loading_div").style.display = 'none';
	}
	
}




//Update the Search div
function update_search_div()
{
	"use strict";	

	var table_id = document.getElementById("searchtable");
	var alpha_id = document.getElementById("alpha");
	
	var should_show =  window.getComputedStyle(alpha_id).display;
	
	alpha_id.style.display = "block";

	table_id.style.display = "block";
    
    var array_l = get_all_start();

    var zeilen = 0;
   
    if( JSON.stringify(array_l) == JSON.stringify(update_search_div_speed_up)) //Array compare
    {
		zeilen = update_search_div_speed_up_zeilen; //Cut redraw costs
	}
	else
	{
		table_id.innerHTML = "";
		
		var cc = 0;
		var row1 = "";
		var row2 = "";
		var row3 = "";
		var row4 = "";

		for(var i = 0; i<array_l.length; i++)
		{
			var current = array_l[i];

			if (cc == 0) 
			{
				row1 = '<div class="ss_e" ontouchstart="show_search_letter(this)" > <div class="sletter"> ' + current + '</div> </div>';
			}

			if (cc == 1) 
			{
				row2 = '<div class="ss_e" ontouchstart="show_search_letter(this)" > <div class="sletter"> ' + current + '</div></div>';
			}

			if (cc == 2)
			{
				row3 = '<div class="ss_e" ontouchstart="show_search_letter(this)" > <div class="sletter"> ' + current + '</div></div>';
			}

			if (cc == 3)
			{
				row4 = '<div class="ss_e" ontouchstart="show_search_letter(this)" > <div class="sletter"> ' + current + '</div></div>';
				var x = table_id.insertRow(-1);
				x.innerHTML='<tr class="child"><td>' + row1 + '</td><td>' + row2 + '</td><td>' + row3 + '</td><td>' + row4 + '</td></tr>';
				cc = -1;
				zeilen = zeilen + 1;
			}

			cc = cc + 1;
		}

		if (cc == 1)
		{
			var x = table_id.insertRow(-1);
			x.innerHTML='<tr class="child"><td>' + row1 + '</td></tr>';
			zeilen = zeilen + 1;
		}
		
		if (cc == 2) 
		{
			var x = table_id.insertRow(-1);
			x.innerHTML='<tr class="child"><td>' + row1 + '</td><td>' + row2 + '</td></tr>';
			zeilen = zeilen + 1;
		}

		if (cc == 3) 
		{
			var x = table_id.insertRow(-1);
			x.innerHTML='<tr class="child"><td>' + row1 + '</td><td>' + row2 + '</td><td>' + row3 + '</td></tr>';
			zeilen = zeilen + 1;
		}
		
		update_search_div_speed_up_zeilen = zeilen;
		update_search_div_speed_up = array_l;
	}


	var horizontal = vwTOpx(80) / 4;
	var padding = parseInt(status_bar_padding) +  parseInt(nav_bar_padding) ;
	var ges_h = vhTOpx(85) - padding; //90 -10
	var vertical = ges_h / zeilen;  //vhTOpx(90) / zeilen;

	
	
	if(horizontal > vertical)
	{
		var margin = (vwTOpx(80) / 4  ) - vertical ;
		
		vertical = vertical - vhTOpx(4);
	
		var t_ss_e = document.getElementsByClassName('ss_e');
		for (var i = 0; i < t_ss_e.length; i++)
		{
			t_ss_e[i].style.width = vertical+"px";
			t_ss_e[i].style.height = vertical+"px";
		}
			
		var tds = table_id.getElementsByTagName("td");
		for (var i=0; i<tds.length; i++)
		{
			tds[i].style.height = (vertical+vhTOpx(4))+"px";
		}
		
		var x_sif  = vhTOpx(2)+(margin/2);
		document.getElementById("sif").style.left = x_sif+"px"; 
	}
	else
	{	
		horizontal = horizontal - vwTOpx(4);
		var t_ss_e = document.getElementsByClassName('ss_e');
		for (var i = 0; i < t_ss_e.length; i++)
		{
			t_ss_e[i].style.width = horizontal+"px";
			t_ss_e[i].style.height = horizontal+"px";
		}		
		
		var tds = table_id.getElementsByTagName("td");
		for (var i=0; i<tds.length; i++)
		{
			tds[i].style.height = (horizontal+vwTOpx(4))+"px";
		}

		document.getElementById("sif").style.left = "2vw"; 
	}
	
	
	var max = 0;
	try
	{
		max = document.getElementsByClassName("ss_e")[0].offsetHeight;
	}
	catch(error)
	{
		return;
	}
	
	
	document.getElementsByClassName("sletter")[0].style.fontSize = "0px";
	
	var border_size = (max / 100)*4;
	
	var t_ss_e = document.getElementsByClassName('ss_e');
	for (var i = 0; i < t_ss_e.length; i++)
	{
		t_ss_e[i].style.border = "solid";
		t_ss_e[i].style.borderColor = "white";
		t_ss_e[i].style.borderWidth = border_size+"px";
	}	
			
	max = document.getElementsByClassName("ss_e")[0].offsetHeight;
	
	var c = 0;
	var note_break = 0;

	while(true)
	{
		note_break = note_break + 1;
		c = c + 100;
		document.getElementsByClassName("sletter")[0].style.fontSize = c+"px";
		var gesh = document.getElementsByClassName("sletter")[0].offsetHeight;
		if( max < gesh){break;}
		
		var gesw = document.getElementsByClassName("sletter")[0].offsetWidth;
		if( max < gesw){break;}

		if(note_break > 2000){break;}
	}
	
	//To big...
	c = c - 101;
	while(true)
	{
		c = c + 20;
		note_break = note_break + 1;
		document.getElementsByClassName("sletter")[0].style.fontSize = c+"px";
		var gesh = document.getElementsByClassName("sletter")[0].offsetHeight;
		if( max < gesh){break;}
		var gesw = document.getElementsByClassName("sletter")[0].offsetWidth;
		if( max < gesw){break;}
		if(note_break > 2000){break;}
	}
	
	//To big...
	c = c - 21;
	while(true)
	{
		c = c + 10;
		note_break = note_break + 1;
		document.getElementsByClassName("sletter")[0].style.fontSize = c+"px";
		var gesh = document.getElementsByClassName("sletter")[0].offsetHeight;
		if( max < gesh){break;}
		var gesw = document.getElementsByClassName("sletter")[0].offsetWidth;
		if( max < gesw){break;}
		if(note_break > 2000){break;}
	}

	//To big...
	c = c - 11;
	if(c<=0)
	{
		c=0;
	}
	
	while(true)
	{
		c = c + 1;
		note_break = note_break + 1;
		document.getElementsByClassName("sletter")[0].style.fontSize = c+"px";
		var gesh = document.getElementsByClassName("sletter")[0].offsetHeight;
		if( max < gesh){break;}
		var gesw = document.getElementsByClassName("sletter")[0].offsetWidth;
		if( max < gesw){break;}
		if(note_break > 2000){break;}
	}

	
	var x = document.querySelectorAll(".sletter");
	for (var i = 0; i < x.length; i++)
	{
		x[i].style.fontSize = c+"px";
	}
	
	if (should_show != "block" || searching == 0) 
	{
		document.getElementById("alpha").style.display = "none";
		document.getElementById("searchtable").style.display = "none";
	}

}


//Updating a single App Div...
function update_single_app_div(in_cat)
{
	"use strict";	
	var catt = apps_by_cat(all_apps, ""+in_cat);

	set_current_apps(catt,"table_apps_cat"+in_cat);
	set_app_drawer_black_white();
	update_font_family();
	
	if(searching==0)
	{
		document.getElementById("alpha").style.display = 'none';
		document.getElementById("search_input").style.display = 'none';
	}
	
}




//Build an app string from an array of apps (often the array all_apps)
//Special chars ; and |  -> not allowed in app Name!!
function apps_to_string(in_array)
{
	"use strict";	
	var back = "";
	var start_name;
	var disp_name;
	var icon;
	var cat;
	
	for(var i = 0; i<all_apps.length; i++)
	{
		start_name = all_apps[i].start_name;
		disp_name = all_apps[i].name;
		icon = all_apps[i].icon;
		cat = all_apps[i].cat;
		back = back + "!;!"+start_name+"!;!"+disp_name+"!;!"+icon+"!;!"+cat+"||";  //Seperator: !;!  and ||
	}
	return back;
}

//Create App objects from a given string
function string_to_apps(in_string)
{
	"use strict";	
	var back = [];
	var myarray = in_string.split('||');
	var icon;
	var cat;
	var disp_name;
	var start_name;
	
	for (var i = 0; i < myarray.length; i++)
	{
		if (myarray[i] != "")
		{
			var spt = myarray[i].split("!;!");
			start_name = spt[1];
			disp_name = spt[2];
			icon = spt[3];
			cat = spt[4];

			var app = new App(start_name, disp_name, icon, cat);
			back.push(app);
		}
	}
	return back;
}

//Check if a special app name is available as an Object in the Launcher
function is_app_in_all_apps(in_start_name)
{
	"use strict";	
    for(var i = 0; i<all_apps.length; i++)
    {
        if (all_apps[i].start_name == in_start_name)
        {
            //Exists
            return true;
        }
    }
    return false;
}

//Check if an app is still installed on the device
function is_app_in_installed_apps( in_array , in_start_name)
{
	"use strict";	
	if( in_start_name.startsWith('virtualapp_') == true)
	{
		return true;
	}
	
	if (in_start_name=="nope")
	{
		return true;
	}

    for(var i = 0; i<in_array.length; i++)
    {
        if (in_array[i].start_name == in_start_name)
        {
            return true;
        }
    }
    return false;
}



//The app list to slecet the date and clock app
function set_app_list(in_array)
{
	"use strict";	
	var element_clock_list = document.getElementById('clock_app_list');
	var element_date_list = document.getElementById('date_app_list');
	
	element_date_list.innerHTML = "";
	element_clock_list.innerHTML = "";
	
	var string_add_clock = "";
	var string_add_date = "";
	
	for(var i = 0; i<in_array.length; i++)
	{
		var icon = in_array[i].icon;
		var name = in_array[i].name;
		var start_name = in_array[i].start_name;
		
		if(start_name !== "nope")
		{
			string_add_clock = string_add_clock +"<a href='#' onclick='set_clock_app(\""+start_name+"\");' class='select_app_text'><span><img class= 'select_app_icon' src='"+icon+"' /></span>"+name+"</a>";
			string_add_date = string_add_date + "<a href='#' onclick='set_date_app(\""+start_name+"\");' class='select_app_text'><span><img class= 'select_app_icon' src='"+icon+"' /></span>"+name+"</a>";
		}	
	}	
	
    element_clock_list.innerHTML = element_clock_list.innerHTML + string_add_clock;
    element_date_list.innerHTML = element_date_list.innerHTML + string_add_date;
			
}

//Launch the date app
function start_date_app()
{
	"use strict";	
	if( date_app != "" && date_app != "-" )
	{
		launch_app(date_app);
	}
	else
	{
		try
		{
			androidinfo.start_date( function ok(){}, function bad()
			{
				//toast_notification(settings_error_string,"short", "top" );
			} );
		}
		catch (err){}
	}
}


//Based on https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
function dateDiffInDays(a, b)
{
	"use strict";	
	var  _MS_PER_DAY = 1000 * 60 * 60 * 24;
	var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


//Display the next alarm, if set
function update_next_alarm()
{
	"use strict";	

	var alarm_clock  = ""; 
	
	if (clock != "0") //Show the clock
    {
        tmp_date_counter = tmp_date_counter + 1;
        
        var array_s = clock.split("-");
        alarm_clock = array_s[5];
    }
    
	if(alarm_clock != "0")
	{
		try
		{
			androidinfo.get_next_alarm( function ok(next_alarm)
			{
				
				if( next_alarm != "-1")
				{
					var alarm_time = new Date(Math.round(next_alarm));
			
					var alarm_time_string = "";
					
					var alarm_h = 0;
					var alarm_m = 0;
					var current_date_obj = new Date();
					var display_date = "";
					var date_diff = 0;
					
					var date_diff = dateDiffInDays(current_date_obj, alarm_time);
					
					alarm_h = alarm_time.getHours();
					if(alarm_h < 10){alarm_h = "0"+ alarm_h}; //Pad the leading zero
					
					alarm_m = alarm_time.getMinutes();
					if(alarm_m < 10){ alarm_m = "0" + alarm_m;}//Pad the leading zero
					
					alarm_time_string = alarm_h + ":" + alarm_m;

					if(date_diff == 0)
					{
						document.getElementById("homescreen_alarm_text").textContent = "◷ " + alarm_time_string + " ◷";
					}
					
					if(date_diff == 1)
					{
						display_date = next_day_string;
						document.getElementById("homescreen_alarm_text").textContent = "◷ " + display_date + " " + alarm_time_string +" ◷";
					}
					
					if(date_diff > 1)
					{
						var alarm_d = alarm_time.getDate()
						var alarm_m = alarm_time.getMonth();
						var alarm_y = alarm_time.getFullYear();
						
						if(alarm_d < 10){alarm_d = "0"+alarm_d;}
						if(alarm_m < 10){alarm_m = "0"+alarm_m;}
		

						if(datum != "1" && datum != "8" )
						{
							alarm_y = alarm_y.substr(-2);
						}
				
											
						if(parseInt(datum, 10) >= 8)
						{
							display_date = alarm_m + "." +alarm_d + "." + alarm_y;
						}
						else
						{
							display_date = alarm_d + "." +alarm_m + "." + alarm_y;
						}
						
						document.getElementById("homescreen_alarm_text").textContent = "◷ " + display_date + " - " + alarm_time_string + " ◷";
					}
					
				}
				else
				{
					document.getElementById("homescreen_alarm_text").textContent = "";
				}
				
					
			}, function bad(){} );
				
		

		}
		catch (err)
		{
			document.getElementById("homescreen_alarm_text").textContent = "";
		}
		
	}
	else
	{
		try
		{
			document.getElementById("homescreen_alarm_text").textContent = "";
		}
		catch (error){}
	}
	
}




//Launch the clock app
function start_clock_app()
{
	"use strict";	
	
	update_next_alarm();
	
				
	if( clock_app != "" && clock_app != "-" )
	{
		launch_app(clock_app);
	}
	else
	{
		try
		{
	
			androidinfo.start_clock( function ok(){}, function bad()
			{
				//toast_notification(settings_error_string,"short","top");
			} );
		}
		catch (err){}
	}
}

//Get the display name of an app by the start name
function get_app_name_by_start_name(in_start_name)
{
	"use strict";	
	var back = "";
	for(var i = 0; i<all_apps.length; i++)
	{
		var start_name = all_apps[i].start_name;
		if(start_name == in_start_name)
		{
			back = all_apps[i].name;
			break;
		}	
	}
	return back;
}




//Get the display name of an app by the start name
function check_if_app_exists(in_start_name)
{
	"use strict";	
	var back = false;
	for(var i = 0; i<all_apps.length; i++)
	{
		var start_name = all_apps[i].start_name;
		if(start_name == in_start_name)
		{
			back=true;
			break;
		}	
	}
	return back;
}




//Set a new clock app
function set_clock_app(in_start_name)
{
	"use strict";	
	clock_app = in_start_name;
	back_function();
}

//Set a new date app
function set_date_app(in_start_name)
{  
	"use strict";	
	date_app = in_start_name;
	back_function();
}


//Open the wallpaper Settings in android
//Old wallpaper method
/*
function force_update_wallpaper()
{
	"use strict";	

	toast_notification(msg_success, "2000",  "bottom");

	update_wallpaper()	
}
*/



//Set the font size for all elements
function new_font_size_adjust()
{
	"use strict";	
    if (color_text != "") 
    {
        document.getElementById("header").style.color = color_text;

        var x = document.querySelectorAll(".desc");
		for (var i = 0; i < x.length; i++)
		{
			x[i].style.fontSize = (font_size_app*0.090)+"vmax";
			x[i].style.color = color_text;
		}
    }
    else
    {
		var x = document.querySelectorAll(".desc");
		for (var i = 0; i < x.length; i++)
		{
			x[i].style.fontSize = (font_size_app*0.090)+"vmax";
		}
	}
	
	var cat_name_el = document.getElementById('Cat_name_text');
	
	cat_name_el.style.fontSize = (font_size_header*0.090)+"vmax"; 
	
	if( fontSize_getComputedStyle_speedup == -1)
	{
		fontSize_getComputedStyle_speedup = window.getComputedStyle(cat_name_el, null).getPropertyValue('font-size');
	}

	if( parseFloat(fontSize_getComputedStyle_speedup) > vhTOpx(9) )
	{
		cat_name_el.style.fontSize = (font_size_header*0.090)+"vh";
	}
		
}


//Manuell update the app list
function update_app_list()
{
	"use strict";	
	force_update_applist = 0;

	toast_notification(app_list_updated,"short","bottom");

	setTimeout(function() 
	{
		compare_apps_with_installed_apps();
	}, 50);	
}


/* When the window sice changes... */
function resize()
{
	"use strict";
	
	new_indicator_width = -1;
	fontSize_getComputedStyle_speedup = -1;
	
	if(current_view == "homescreen" && app_move_mode == 1) 
	{ 
		end_appmove_homescreen();
	}
	
	if(current_view == "appdrawer" && app_move_mode == 1)
	{ 
	   end_appmove_appdrawer();
	}
	
	if(app_move_mode==1)
	{
		return;
	}
	
	if(appdrawer_align == "r")
	{
		document.getElementById("cat").style.left = "80vw";
		document.getElementById("cat_bg").style.left = "80vw";
		document.getElementById("app_ba").style.left = "0vw";
		document.getElementById("scrollable").style.left = "0vw";
		document.getElementById("header").style.left = "0vw";
		document.getElementById("header_blank").style.left = "0vw";
		document.getElementById("appsettings_ba").style.left = "0vw";
		document.getElementById("appsettings").style.left = "0vw";
		document.getElementById("right").style.right = "auto";
		document.getElementById("right").style.left = "80vw";
		document.getElementById("dropdm_popup").style.right = "20vw";
		document.getElementById("icon_dialog").style.left = "15vw";
		document.getElementById("select_iconpack_dialog").style.left = "15vw";
		document.getElementById("all_icons_dialog").style.left = "15vw";

		if(swipe_mode=="r")
		{
			document.getElementById("scrollable").style.left = "0vw";//20vw
			document.getElementById("alpha").style.left = "0vw";//20vw
		}
		else
		{
			document.getElementById("scrollable").style.left = "100vw";//20vw
			document.getElementById("alpha").style.left = "100vw";//20vw
		}
		
	}
	else
	{	
		document.getElementById("cat").style.left = "0vw";
		document.getElementById("cat_bg").style.left = "0vw";
		document.getElementById("app_ba").style.left = "20vw";
		document.getElementById("scrollable").style.left = "0vw";
		document.getElementById("header").style.left = "20vw";
		document.getElementById("header_blank").style.left = "20vw";
		document.getElementById("appsettings_ba").style.left = "20vw";
		document.getElementById("appsettings").style.left = "20vw";
		document.getElementById("right").style.left = "auto";
		document.getElementById("right").style.right = "80vw";
		document.getElementById("dropdm_popup").style.right = "2vw";
		document.getElementById("icon_dialog").style.left = "35vw";
		document.getElementById("select_iconpack_dialog").style.left = "35vw";
		document.getElementById("all_icons_dialog").style.left = "35vw";
		
		if(swipe_mode=="r")
		{
			document.getElementById("scrollable").style.left = "20vw";//20vw
			document.getElementById("alpha").style.left = "20vw";//20vw
		}
		else
		{
			document.getElementById("scrollable").style.left = "120vw";//20vw
			document.getElementById("alpha").style.left = "120vw";//20vw
		}
	}
	
	var orientation = "";
	if( screen.width > screen.height)
	{
		orientation = "h";
		try
		{
			NavigationBar.backgroundColorByHexString("set_nav",true);
		}
		catch (e){}
	
		spalten_appdrawer = appdrawer_horizontal;
		

		//document.body.style.backgroundSize = "cover"; 
		//document.body.style.backgroundPosition = "0 -43vw";
		//document.body.style.backgroundPosition = "0 -100vh";
		//document.body.style.backgroundPosition = "0px 0px";
	}
	else
	{		
		orientation = "v";
		spalten_appdrawer = appdrawer_vertical;

		//document.body.style.backgroundSize = "cover"; 
		//document.body.style.backgroundPosition = "0px 0px";
	}
	
	if(statusbar_state=="1") //Show Statusbar
	{	
		if(nav_bar_state=="1")
		{
			if(bottom_padding_zero == "1" && orientation == "h" ) 
			{
				set_padding_appdrawer(status_bar_padding,0);
				set_homescreen_padding(status_bar_padding,0);		
			}
			else
			{
				set_padding_appdrawer(status_bar_padding,nav_bar_padding);
				set_homescreen_padding(status_bar_padding,nav_bar_padding);
			}
			
		}	
		else
		{
			set_padding_appdrawer(0,0);
			set_homescreen_padding(0,0);
		}
		//set_trans(); //may lead to a endless recall of redraw
	}
	else //Invisible Statusbar
	{
		if(nav_bar_state=="1")
		{
			if(bottom_padding_zero == "1" && orientation == "h" ) 
			{
				set_padding_appdrawer(0,0);
				set_homescreen_padding(0,0);	
			}
			else
			{
				set_padding_appdrawer(0,nav_bar_padding);
				set_homescreen_padding(0,nav_bar_padding);	
			}
			
		}
		else
		{
			set_padding_appdrawer(0,0);
			set_homescreen_padding(0,0);				
		}
		//unset_trans(); //may lead to a endless recall of redraw
	}
	
	update_app_divs();
	update_homescreen_clock_position();
	
	if(mySwiper != null && mySwiper != 0)
	{
		try
		{
			mySwiper.update();
		}
		catch(error)
		{
		}
	}
	

}

//Add the + icon to a categorie
function set_new_cat(in_cat)
{
	"use strict";	
	if(in_cat < 1 || in_cat >cat_anz){return;}

	if(in_cat == current_kat) //As its the current Cat..
	{
		return;
	}
	var element = document.getElementById(in_cat+"_new");
	
    if(typeof(element) != 'undefined' && element != null)
    {
		//Exist
		return;
	} 
   
	try
	{
		var img = document.createElement("img");
		img.src ="icons/new.png";
		img.className = "new_app";
		img.id = in_cat+"_new";

		img.style.height = (document.getElementById(in_cat+"_png").offsetHeight/1.8) +"px";

		var right = ((document.getElementById(""+in_cat).offsetWidth /2) - document.getElementById(in_cat+"_png").offsetWidth  ) ;
		if(right<0){right = 0;}

		img.style.right = right+"px";

	
		var src = document.getElementById("div_"+in_cat+"_item");
		src.appendChild(img);
	}
	catch (e){}
	
	store_apps(apps_to_string(all_apps));
}

//Remove the + icon from a categorie
function unset_new_cat(in_cat)
{
	"use strict";	
	if(in_cat < 1 || in_cat >cat_anz){return;}
	
	try
	{
		var image_x = document.getElementById(in_cat+'_new');
		image_x.parentNode.removeChild(image_x);
	}
	catch (e){}
}

//Animate a new installed app
function set_new_app(in_start_name)
{
	"use strict";	
	var normal_apps_t = document.getElementsByClassName('normal_app');

	var puls_element = null;
	for (var i = 0; i < normal_apps_t.length; i++) 
	{
		var start_name_t = normal_apps_t[i].parentElement.getAttribute("start_name");
		if( start_name_t == in_start_name)
		{
			puls_element = normal_apps_t[i];
			break;
		}
	}  
	if(puls_element!=null)
	{
		pulsate_element(puls_element);   
	}  
}

//When there is a scrolling event
function scrolling()
{
	"use strict";	
	type_of_touch = 3; //To prevent erros
}

var da=0;
//Set the transparency for the Appdrawer
function set_trans()
{
	"use strict";	
	if(da==1){return;}
	da = 1;
	if(nav_bar_state==1)
	{
		try
		{
			NavigationBar.backgroundColorByHexString("set_trans1",true);
		}
		catch (e){}
	}
}

//Remove the transparency for the Appdrawer
function unset_trans()
{
	"use strict";	
	da = 0;
	try
	{
		NavigationBar.backgroundColorByHexString("unset_trans1",true);
	}
	catch (e){}
}

//Set the padding (navigation- and statusbar) for the Appdrawer
function set_padding_appdrawer(padding_top,padding_button)
{
	"use strict";	
	var tmp_vh_100_px = vhTOpx(100);
	
	
	padding_top = parseFloat(padding_top);
	padding_button = parseFloat(padding_button);
	
	var cat_obj = document.getElementById("cat");
	
	cat_obj.style.top = padding_top + "px";
	var cat_height = tmp_vh_100_px - padding_button - padding_top;
	cat_obj.style.height = cat_height+"px";
	
	var new_fa = cat_anz + (10-cat_icon_size) ;
	
	

	var x = document.querySelectorAll(".cat_item img");
	for (var i = 0; i < x.length; i++)
	{
			x[i].style.maxHeight = (parseInt(cat_icon_size)+2)+"vh";
	}
	
	
	document.getElementById("header").style.top = padding_top + "px";
	document.getElementById("header_blank").style.height = padding_top + "px";
	
	var scrollable_obj = document.getElementById("scrollable");
	scrollable_obj.style.top = (vhTOpx(10)+padding_top)+ "px";
	scrollable_obj.style.height = (vhTOpx(90)-padding_top-padding_button)+ "px";
	document.getElementById("dropdm_popup").style.top = ( vhTOpx(10)+padding_top)+ "px";

	document.getElementById("app_ba").style.top = ( vhTOpx(10)+padding_top)+ "px";
	
	var appsettings_obj = document.getElementById("appsettings");
		
	appsettings_obj.style.top = padding_top+"px";
	var h_appsettings = (tmp_vh_100_px-padding_top-padding_button);
	appsettings_obj.style.height = h_appsettings+ "px";
	

	var x = document.querySelectorAll(".app_setting_button");
	var btn_h = (h_appsettings/15);
	var btn_pad = (h_appsettings/22);

	var s_app_icon_obj = document.getElementById("s_app_icon");
	
	s_app_icon_obj.style.height = (btn_h*3)+ "px";
	s_app_icon_obj.style.marginBottom = (btn_pad/2)+ "px";
	s_app_icon_obj.style.marginTop = btn_pad+ "px";
	
	var s_app_name_obj = document.getElementById("s_app_name");
	s_app_name_obj.style.fontSize = btn_h+"px";
	s_app_name_obj.style.marginBottom = btn_pad+"px";
	
	for (var i = 0; i < x.length; i++)
	{
		x[i].style.fontSize = (btn_pad/1.5)+"px";
		x[i].style.height = btn_h+"px";
		x[i].style.marginBottom = btn_pad+"px";
	}

	document.getElementById("alpha").style.top = (vhTOpx(10)+padding_top)+"px";
	
	var allsettings_obj = document.getElementById("allsettings");
	
	
	allsettings_obj.style.top =  (padding_top)+ "px";
	allsettings_obj.style.height = ( tmp_vh_100_px-padding_top-padding_button)+ "px";

	var x = document.querySelectorAll(".second_settings");
	for (var i = 0; i < x.length; i++)
	{
			ot = x[i].style.top =  (padding_top)+ "px";
			oh = x[i].style.height = ( tmp_vh_100_px-padding_top-padding_button)+ "px";
	}

	var x = document.querySelectorAll(".third_settings");
	for (var i = 0; i < x.length; i++)
	{
			ot = x[i].style.top =  (padding_top)+ "px";
			oh = x[i].style.height = ( tmp_vh_100_px-padding_top-padding_button)+ "px";
	}
			
	
	try
	{ 
		var x = document.querySelectorAll(".active_right");
		var ot = 0;
		var oh = 0;
	
		for (var i = 0; i < x.length; i++)
		{
				ot = x[i].offsetTop;
				oh = x[i].offsetHeight;
				break;
		}
	
		var cat_h = document.getElementById("cat").style.top;
		cat_h = parseInt( cat_h.replace("px","") );
		document.getElementById("right").style.top = cat_h + ot +"px";
		document.getElementById("right").style.height = oh+"px";
		
		var new_indicator_width = document.getElementById("1_png").offsetWidth;

		document.getElementById("right").style.width = (new_indicator_width/100)*15+"px";
		
		var x = document.querySelectorAll(".new_app");

		for (var i = 0; i < x.length; i++)
		{
				var cat_p = x[i].id;
				cat_p = cat_p.replace("_new","");
				unset_new_cat(cat_p);
				set_new_cat(cat_p);
		}
	}
	catch (e){}
    	
}

//Set the padding (navigation- and statusbar) for the Homescreen
function set_homescreen_padding(padding_top,padding_button)
{
	"use strict";	
	
	padding_top = pxTOvh(padding_top);
	padding_button =  pxTOvh(padding_button);

	// 2/3 Apps, 1/3 Clock
	var new_ges_height = 100 - padding_top - padding_button;
	var home_clock_height = new_ges_height / 3;
	var home_app_height = (new_ges_height / 3)*2;
	var new_height = home_app_height;
	
	var home_screen_div_obj = document.getElementById('home_screen_div');
	
	home_screen_div_obj.style.top = (padding_top + home_clock_height )+ "vh";
	home_screen_div_obj.style.height = new_height+"vh";
	document.getElementById("del_homescreen").style.bottom = home_app_height+padding_button+"vh";
	
	home_clock_height = home_clock_height - 1;

	var homescreen_out_clock_obj = document.getElementById("homescreen_out_clock");
	

	homescreen_out_clock_obj.style.top = padding_top+"vh";
	homescreen_out_clock_obj.style.height = home_clock_height+"vh";
		
	if( app_move_mode == 1 || app_move_mode=="1")
	{
		adjust_delfromhomescreen_div();
	}
	
	var vh_two = vhTOpx(2);
	var table_h = home_screen_div_obj.offsetHeight - vh_two; 
	var table_w = home_screen_div_obj.offsetWidth - vwTOpx(10) - vh_two; 

	var table_id = document.getElementById("table_homescreen");
	var tds = table_id.getElementsByTagName("td");
	
	
	
	for (var i=0; i<tds.length; i++)
	{
		tds[i].style.width = (table_w/spalten_homescreen) + "px";
		tds[i].style.height = (table_h/zeilen_homescreen) + "px";
	}
		
	var img_h1 = (table_h/zeilen_homescreen);
	var img_w1 = (table_w/spalten_homescreen);
	
	if(img_h1 > img_w1)
	{
		//H is bigger so w should be used..
		var full_size = img_w1;
		var full_size_70 = (full_size/100)*75;
		var full_size_90 = (full_size/100)*90;
		
		var t_home_icon_read = document.getElementsByClassName('home_icon_read');
		for (var i = 0; i < t_home_icon_read.length; i++)
		{
			t_home_icon_read[i].style.width = full_size_90+"px";
			t_home_icon_read[i].style.height = full_size_90+"px";
		}  
			
		var t_home_screen_read = document.getElementsByClassName('homescreenicon');
		for (var i = 0; i < t_home_screen_read.length; i++)
		{
			t_home_screen_read[i].style.width = full_size_70+"px";
			t_home_screen_read[i].style.height = full_size_70+"px";
		}  
			
		var t_home_screen_wrapper = document.getElementsByClassName('homescreen_wrapper');
		for (var i = 0; i < t_home_screen_wrapper.length; i++)
		{
			t_home_screen_wrapper[i].style.width = full_size+"px";
			t_home_screen_wrapper[i].style.height = full_size+"px";
		} 
		 
	}
	else
	{
		//W is bigger, so H should be used
		var full_size = img_h1;
		var full_size_70 = (full_size/100)*75;
		var full_size_90 = (full_size/100)*90;
	
		var t_home_icon_read = document.getElementsByClassName('home_icon_read');
		for (var i = 0; i < t_home_icon_read.length; i++)
		{
			t_home_icon_read[i].style.width = full_size_90+"px";
			t_home_icon_read[i].style.height = full_size_90+"px";
		}  
			
		var t_home_screen_read = document.getElementsByClassName('homescreenicon');
		for (var i = 0; i < t_home_screen_read.length; i++)
		{
			t_home_screen_read[i].style.width = full_size_70+"px";
			t_home_screen_read[i].style.height = full_size_70+"px";
		}  
			
		var t_home_screen_wrapper = document.getElementsByClassName('homescreen_wrapper');
		for (var i = 0; i < t_home_screen_wrapper.length; i++)
		{
			t_home_screen_wrapper[i].style.width = full_size+"px";
			t_home_screen_wrapper[i].style.height = full_size+"px";
		}
	}
	


	//Homescreen badges for notificatiosn
	try
	{
		var bad_w = document.getElementsByClassName("homescreenicon")[0].offsetWidth;
		var bad_h = document.getElementsByClassName("homescreenicon")[0].offsetHeight;

		bad_w = (bad_w/100)*35//30;
		bad_h = (bad_h/100)*35//30;

		var badges_el_t = document.getElementsByClassName('badges');
		for (var i = 0; i < badges_el_t.length; i++) 
		{
			if(bad_w > bad_h)
			{
				badges_el_t[i].style.width = bad_h + "px";
				badges_el_t[i].style.height = bad_h + "px";
			}
			else
			{
				badges_el_t[i].style.width = bad_w + "px";
				badges_el_t[i].style.height = bad_w+ "px";
			}
		}  
	
	}
	catch( error ){}

}		
	
//A notification for homescreen app (add the + icon)
function new_badges(in_start_name)
{
	"use strict";	
	var back = null;
	for(var i = 0; i<all_apps.length; i++)
	{
		var start_name = all_apps[i].start_name;
		
		if(start_name == in_start_name )
		{
			back = all_apps[i];
			break;
		}	
	}
	//Only when on the homescreen
	if(back.cat != "0")
	{
		return;
	}	

	var badges_el_t = document.getElementsByClassName('home_table_icon');
	var badges_el = null;
	
	for (var i = 0; i < badges_el_t.length; i++) 
	{
		var start_name_t = badges_el_t[i].getAttribute("start_name");
		
		if( start_name_t == in_start_name || start_name_t == in_start_name  )
		{
			badges_el = badges_el_t[i];
			break;
		}
	}  
	
	if(badges_el==null) { return; }
	
	try
	{
		badges_el = badges_el.getElementsByClassName("badges")[0];	
		badges_el.setAttribute('src','icons/new_bad.png');
	}
	catch( error ){}
}

//Remove a notification for a homescreen app (remove the +)
function del_badges(in_start_name)
{
	"use strict";	
	var back = null;
	
	for(var i = 0; i<all_apps.length; i++)	
	{
		var start_name = all_apps[i].start_name;
		
		if(start_name == in_start_name)
		{
			back = all_apps[i];
			break;
		}	
	}

	//Only on the homescreen
	if(back.cat != 0)
	{
		return;
	}	
	
	var badges_el_t = document.getElementsByClassName('home_table_icon');
	var badges_el = null;
	
	for (var i = 0; i < badges_el_t.length; i++) 
	{
		var start_name_t = badges_el_t[i].getAttribute("start_name");
		
		if( start_name_t == in_start_name)
		{
			badges_el = badges_el_t[i];
			break;
		}
	}  

	if(badges_el==null)
	{ 
		return;
	}
	
	try
	{
		badges_el_t = badges_el.getElementsByClassName("badges")[0];	
		badges_el_t.setAttribute('src','icons/0_bad.png');
	}
	catch( error ) {}

}

//Remove all notifionations for homescreen apps ( remove all +)
function clear_all_badges()
{
	"use strict";	
	for(var i = 0; i<all_apps.length; i++)	
	{
		var icat = all_apps[i].cat;
		
		if( icat == "0" || icat == 0 )
		{
			var in_start_name = all_apps[i].start_name;			
			del_badges(in_start_name);
		}	
	}	
}


//Custom fadeOut
function fadeOut(el_o, ms_o,in_func_o)
{
	"use strict";		
	var steps2 = ms_o / 20;
	var op2 = 1;  // initial opacity
	var timer2 = setInterval(function ()
	{
		op2 = op2 - 0.05;
		if (op2 < 0.05)
		{
			clearInterval(timer2);
			el_o.style.display="none";
			try 
			{
				in_func_o();
			}
			catch(error) {}
		}
		el_o.style.opacity = op2;
	}, steps2);
}


//Custom fadeIn
function fadeIn(el_i, ms_i ,in_func_i)
{
	"use strict";	
	var steps = ms_i / 20;
	var op = 0.05;  // initial opacity
	el_i.style.display="block";
	var timer = setInterval(function ()
	{
		op = op + 0.05;
		if (op >= 1)
		{
			clearInterval(timer);
			timer = 0;
			try
			{
				in_func_i();
			}
			catch( error ) {}
		}

		el_i.style.opacity = op;
	}, steps);
	  
}

//Simple method to prevent XSS in the app, should be improved in the future
function sanitize_input(in_string)
{
	"use strict";	
	var temp = document.createElement('div');
	temp.textContent = in_string;
	return temp.innerHTML;
}

//Pulsate animation (for a new app)
function pulsate_element(in_e)
{
	"use strict";
	setTimeout(function()
	{ 
		var border_w = in_e.offsetWidth ;
		in_e.setAttribute('style', 'outline: '+  (border_w / 9 )  +'px solid white !important');
	
		var base = (border_w/ 3) /100 ;
		if(black_white=="1"){in_e.style.webkitFilter = "grayscale(100%)";}
		pulsate_timer(100,in_e,3,base);

	},100); //Wait 100 ms to start pulsate

	return;
}

//Animation for a new installed App
function pulsate_timer(in_count,in_e,repeat,base)
{
	"use strict";	
	in_count = in_count - 1;
	var real_set =  base * (100-in_count);
	in_e.style.outlineOffset = real_set+"px";
	
	if( repeat < 1)
	{
		in_e.style.outline = "0px solid white";
		if(black_white=="1"){in_e.style.webkitFilter = "grayscale(100%)";}
		return;
	}

	if(in_count>0)
	{	
		setTimeout (pulsate_timer, 8 ,in_count,in_e,repeat,base);
	}
	else
	{	
		repeat = repeat - 1;
		setTimeout (pulsate_timer, 8 ,100,in_e,repeat,base);
	}
}

//Rename an app and update the corresponding div
function update_app_rename()
{
	"use strict";	
	if(name_field == null)
	{
		return;
	}
	
	var new_name_string = name_field.value;	
		
	new_name_string = sanitize_input( new_name_string );
	
	if(new_name_string == "")
	{
		new_name_string = "-";
	}
	new_name_string = new_name_string.replace("!;!","");
	new_name_string = new_name_string.replace("||","");
	
	new_name_string = new_name_string.split('!;!').join('');
	new_name_string = new_name_string.split('\|\|').join('');
	
	var in_start_name = document.getElementById("s_app_start_name").textContent;

	if(in_start_name == ""){return;}
	
	setTimeout(function() 
	{
		for(var i = 0; i<all_apps.length; i++)
		{
			if (all_apps[i].start_name == in_start_name)
			{
				all_apps[i].name = "" + new_name_string;
				break;
			}
		}
					
		update_app_divs();
		new_font_size_adjust();
		store_apps(apps_to_string(all_apps));
	}, 10);		
}

//Edit the App name has to end
function end_input()
{
	"use strict";	
	try
	{
		name_field.parentNode.removeChild(name_field);
	}
	catch(error) {}
	
	var s_app_name_tmp = document.getElementById("s_app_name");
	s_app_name_tmp.color = "white";
	s_app_name_tmp.textContent = ""+name_field.value;
	update_app_rename();
	name_field = null;
}

//Make the App name editable
function edit_input()
{
	"use strict";	
	if( name_field != null)
	{
		return;
	}
	
	var in_element = null;
	
	in_element = document.getElementById("s_app_name");

	name_field = document.createElement("INPUT");
	name_field.setAttribute("type", "text");
	name_field.style.width = "100%";
	name_field.style.background = "rgba(255,255, 255, 0.3)";
	name_field.style.borderColor = "transparent";
	
	var sapn_element = document.getElementById("s_app_name");
	
	var style = window.getComputedStyle(sapn_element, null).getPropertyValue('font-size');
	var fontSize = parseFloat(style); 

	name_field.style.fontSize = fontSize + "px";
	name_field.style.height = fontSize + "px";
	name_field.classList.add("editable");
	name_field.setAttribute("type", "input");
	
	var old_val = in_element.textContent;
	in_element.textContent = "";
	name_field.value =  ''+old_val;
	name_field.style.color = "white";
	name_field.fontSize = ( document.getElementById("s_app_name").offsetHeight )+"px";
	name_field.focus(); 
	
	in_element.appendChild(name_field);

	name_field.focus(); 
	name_field.addEventListener("blur", end_input);
	
	return;
}




//Hide the Popup Menu in the Appdrawer
function end_popup_menu()
{
	"use strict";	
    if(  window.getComputedStyle(document.getElementById("dropdm_popup")).display == "block" ) //Hide Dropdown menu
    {
		 document.getElementById("dropdm_popup").style.display = "none";
	}
	
}

//Stops the movement of Apps in the Appdrawer
function end_appmove_appdrawer()
{
	"use strict";	
	if (should_update == 1 )
	{
		update_app_position();
		should_update = 0;
	}
	
   if (current_view == "appdrawer" && app_move_mode == 1)
   { 
	   document.getElementById("Cat_name_text").textContent = cat_array[current_kat-1][1];//kat_list[current_kat]
	   app_move_mode = 0;
	   
	   update_app_position();
	   update_app_divs();

	   store_apps(apps_to_string(all_apps));
	   init_swiper(0);
	   
	   if(appdrawer_align == "r")
	   {
		  
		  if(swipe_mode=="r")
		  {
				document.getElementById("scrollable").style.left = "0vw";//20vw
				document.getElementById("alpha").style.left = "0vw";//20vw
		  }
		  else
		  {
				document.getElementById("scrollable").style.left = "100vw";//20vw
				document.getElementById("alpha").style.left = "100vw";//20vw
		  }			
		}
		else
		{
		  if(swipe_mode=="r")
		  {
				document.getElementById("scrollable").style.left = "20vw";//20vw
				document.getElementById("alpha").style.left = "20vw";//20vw
		  }
		  else
		  {
				document.getElementById("scrollable").style.left = "120vw";//20vw
				document.getElementById("alpha").style.left = "120vw";//20vw
		  }	 
		}
	   
	   
	   var div_scrollable = document.getElementById("scrollable");
	   div_scrollable.style.border = "solid";
	   div_scrollable.style.borderColor = "red";
	   div_scrollable.style.borderWidth = "0vw";
	}
	
}

//Stops the momvement of Apps on the Homescreen
function end_appmove_homescreen()
{

	if (should_update == 1 )
	{
		update_app_position();
		should_update = 0;
	}
	
	if (current_view == "homescreen" && app_move_mode == 1) 
	{ 
		app_move_mode = 0;
		document.getElementById("app_drawer").style.display = "block";
		document.getElementById("app_drawer").style.opacity = "0.0";

		
		var table_homescreen_div = document.getElementById("table_homescreen");
		
		table_homescreen_div.style.border = "solid";
		table_homescreen_div.style.borderColor = "red";
		table_homescreen_div.style.borderWidth = "0vh";

		update_app_divs(); //Update all divs - also the homescreen div
	
		
		if(appdrawer_align == "r")
		{
			if(swipe_mode=="r")
			{
					document.getElementById("scrollable").style.left = "0vw";//20vw
					document.getElementById("alpha").style.left = "0vw";//20vw
			}
			else
			{
					swapNodes(document.getElementById("app_drawer"),document.getElementById("homescreen"));
					document.getElementById("scrollable").style.left = "100vw";//20vw
					document.getElementById("alpha").style.left = "100vw";//20vw
			}			
		 }
		else
		{
			if(swipe_mode=="r")
			{
					document.getElementById("scrollable").style.left = "20vw";//20vw
					document.getElementById("alpha").style.left = "20vw";//20vw
			}
			else
			{
					swapNodes(document.getElementById("app_drawer"),document.getElementById("homescreen"));
					document.getElementById("scrollable").style.left = "120vw";//20vw
					document.getElementById("alpha").style.left = "120vw";//20vw
			}	 
		}
		
		init_swiper(0);
		store_apps(apps_to_string(all_apps));

		
		setTimeout(function()
		{
			if(swipe_mode=="r")
			{
				mySwiper.scroll(1,true); 
			}
			else
			{
				mySwiper.scroll(0,true); 
			}
				  
			document.getElementById("app_drawer").style.opacity = "1.0";
			
		}, 100);
    }
}

//Shows the replace/select icon Dialog
function open_select_icon()
{
	"use strict";	
	display_icon_select();
}

//Shows the dialog for the Appdrawer Alignment
function open_align_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "none"; 
	document.getElementById("settings_align_div").style.display = "flex"; 
}

//Shows the dialog for the swipe direction of the Appdrawer
function open_swipe_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_appdrawer_div").style.display = "none"; 
	document.getElementById("settings_swipe_div").style.display = "flex"; 
}




//Shows the six default cat icons from lukelauncher
function open_symbol_orgicon_cat()
{
	"use strict";	
	document.getElementById("icon_dialog_cat").style.display = "none";
	document.getElementById("all_icons_cat_dialog").style.display = "block";
	document.getElementById("searchiconinpack_cat_input").style.display = "none";
	
	var table_id = document.getElementById("table_iconpackicons_cat_list");
			
	for(var i = table_id.rows.length - 1; i >= 0; i--)
	{
		table_id.deleteRow(i);
	}
	
	var full_string  = "";		

	for(var i = 0; i < 6; i++)
	{
			if( i % 3 == 0 && i != 0)
			{			
				var new_row = table_id.insertRow(-1);
				new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
				full_string = "";
			}
	
			var current_row_string = '<th> <img ontouchend="applay_cat_org_icon(\''+(i+1)+'\')" class="iconpackicon" src="icons/'+(i+1)+'.png""> </th>';	
			full_string = full_string  +current_row_string;	
	}
			
	if( full_string != "" )
	{
		var new_row = table_id.insertRow(-1);
		new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
		full_string = "";
	}
			 
	table_id.scrollIntoView(false); 	
}

//A lukelauncher icon is used for a categorie
function applay_cat_org_icon(in_icon)
{
	"use strict";	
	cat_array[cat_row][0] = "icons/"+in_icon  + ".png";
	document.getElementById(cat_row + "_cat" ).src = "icons/"+in_icon  + ".png?" + new Date().getTime();
	hide_icon_select_cat();
}




//Recives the installd iconpacks
function successinfo_icon_packs(message)
{
	"use strict";	
	var table_id = document.getElementById("table_iconpackicons_list");
			
	for(var i = table_id.rows.length - 1; i >= 0; i--)
	{
		table_id.deleteRow(i);
	}
	
	var full_string  = "";		
	var str_array = message.split(',');

	for(var i = 0; i < str_array.length-1; i++)
	{
		if( i % 3 == 0 && i != 0)
		{			
			var new_row = table_id.insertRow(-1);
			new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
			full_string = "";
		}
				
		var tmpa = str_array[i].split('-');
		var img_string = tmpa[0];
		var drawable = tmpa[1];
				
		var current_row_string = '<th> <img ontouchend="icon_pack_icon_selected(\''+drawable+'\')" class="iconpackicon" src="data:image/png;base64,'+img_string+'"> </th>';	
		full_string = full_string  +current_row_string;	
	}
			
	if( full_string != "" )
	{
		var new_row = table_id.insertRow(-1);
		new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
		full_string = "";
	}
			 
	table_id.scrollIntoView(false); 	
}


//Recievs the installed iconpacks, for selecting a new categorie icon
function successinfo_icon_packs_cat(message)
{
	"use strict";	
	var table_id = document.getElementById("table_iconpackicons_cat_list");
			
	for(var i = table_id.rows.length - 1; i >= 0; i--)
	{
		table_id.deleteRow(i);
	}
	
	var full_string  = "";		
	var str_array = message.split(',');

	for(var i = 0; i < str_array.length-1; i++)
	{
		if( i % 3 == 0 && i != 0)
		{			
			var new_row = table_id.insertRow(-1);
			new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
			full_string = "";
		}
				
		var tmpa = str_array[i].split('-');
		var img_string = tmpa[0];
		var drawable = tmpa[1];
				
		var current_row_string = '<th> <img ontouchend="icon_pack_icon_cat_selected(\''+drawable+'\')" class="iconpackicon" src="data:image/png;base64,'+img_string+'"> </th>';	
		full_string = full_string  +current_row_string;	
	}
			
	if( full_string != "" )
	{
		var new_row = table_id.insertRow(-1);
		new_row.innerHTML='<tr class="child">'+full_string+'</tr>'; 
		full_string = "";
	}
			 
	table_id.scrollIntoView(false); 	
}


//No Iconpacks are recieved	
function failinfo_icon_packs(message)
{
	"use strict";	
	toast_notification("Error!","short", "bottom");
}
	



//Search in a iconpack for a icon, but wait 650ms until typing finished - For normal Appicons/iconpacks
function search_for_icon()
{
	"use strict";	
	try
	{
		clearTimeout(iconpack_timer);
	}
	catch( error ){}
	
	iconpack_timer = setTimeout(function()
	{
		final_search();
	}, 650);
}

//Search in a iconpack for a icon, but wait 650ms until typing finished - For Categories Icons/iconpacks
function search_for_icon_cat()
{
	"use strict";	
	try
	{
		clearTimeout(iconpack_timer);
	}
	catch( error ){}
	
	iconpack_timer = setTimeout(function()
	{
		final_search_cat();
	}, 650);
}



//Show the select a new icon dialog for a app
function display_icon_select()
{
	"use strict";			
	document.getElementById("icon_dialog").style.display = "block";
	document.getElementById("icon_dialog_bg").style.display = "block";	
	document.getElementById("select_iconpack_dialog").style.display = "none";
	document.getElementById("all_icons_dialog").style.display = "none";
	
	var current_app = "";
	current_app = document.getElementById("s_app_start_name").textContent;
	
	if(current_app != "")
	{
		if(current_app.startsWith('virtualapp_') == false) //Virtualapps cant restore their icon
		{
			document.getElementById("btn_orginal_icon").style.display = "block";
		}
		else
		{
			document.getElementById("btn_orginal_icon").style.display = "none";
		}
	}

}

//The the select icon Dialog for app
function hide_icon_select()
{
	"use strict";			
	document.getElementById("icon_dialog").style.display = "none";
	document.getElementById("select_iconpack_dialog").style.display = "none";
	document.getElementById("all_icons_dialog").style.display = "none";
	document.getElementById("icon_dialog_bg").style.display = "none";
}


/*will hopefully never be called - catches all errors and perform a restart*/
function catch_all_erros()
{
	//Restart - hopefully it solves the problem and remains usable
	location.reload(); 
}


//Init function for the lukelauncher
function init_luke_launcher()
{
	"use strict";		
	
	window.onerror = function(event) { catch_all_erros(); }

	document.getElementById("searchicon").ontouchstart = function (event){ search_icon_click(); };
	document.getElementById("menudialogicon").ontouchstart = function (event){ menu_icon_click(); };
	document.getElementById("s_app_name").ontouchstart = function (event){ edit_input(); };
	
	document.getElementById("btn_start_app").ontouchstart = function (event){ start_app_f(); };
	document.getElementById("btn_homescreen").ontouchstart = function (event){ add_app_to_homescreen(); };
	document.getElementById("btn_app_aus").ontouchstart = function (event){ hide_app(); };
	document.getElementById("btn_app_uninstall").ontouchstart = function (event){ uninstall(); };

	document.getElementById("scrollable").ontouchstart = function (event){ end_popup_menu(); end_appmove_appdrawer(); };
	document.getElementById("home_screen_div").ontouchstart = function (event){ end_appmove_homescreen(); };
	
	document.getElementById("Cat_name").ontouchstart = function (event){ end_popup_menu(); };
	document.getElementById("alpha").ontouchstart = function (event){ end_popup_menu(); };

	
	document.getElementById("redips-drag").ontouchmove = function (event){ on_touch_move(event); };
	//document.getElementById("home_screen_div").ontouchmove = function (event){ on_touch_move(event); };
	document.getElementById("homescreen").ontouchmove = function (event){ on_touch_move(event); };


	document.getElementById("s_app_icon").ontouchstart = function (event){ open_select_icon(event); };
	
	document.getElementById("btn_orginal_icon").ontouchstart = function (event){ revert_icon(event); };
	document.getElementById("btn_gallery_icon").ontouchstart = function (event){ open_gallery_icon(event); };
	document.getElementById("btn_symbol_icon").ontouchstart = function (event){ open_symbol_icon(event); };
	
	
	document.getElementById("btn_symbol_cat_icon").ontouchstart = function (event){ open_symbol_icon_cat(event); };
	document.getElementById("btn_orginal_cat_icon").ontouchstart = function (event){ open_symbol_orgicon_cat(event); };
	document.getElementById("btn_gallery_cat_icon").ontouchstart = function (event){ open_gallery_icon_cat(event); };
	
	document.getElementById("add_new_cat_button").ontouchstart = function (event){ add_app_cat(); };
	
	document.getElementById("homescreen_clock_green").ontouchstart = function (event){ home_touch_start(event); };
	document.getElementById("homescreen_clock_green").ontouchend = function (event){ home_touch_end(event); };
		
	document.getElementById("allsettings").style.display = "none";
	document.getElementById("settings_ba").style.display = "none";
	document.getElementById("appsettings").style.display = "none";

	window.addEventListener('resize', function(event){ resize();  });
	
	document.addEventListener("resume", onResume, false);
	document.addEventListener("backbutton", onBackKeyDown, false);
	

	document.getElementById("padding_input_field").addEventListener('input', padding_input, false);
	document.getElementById("padding_top_input_field").addEventListener('input', padding_top_input, false);
	
	load_settings();
	
	hct = document.getElementById("homescreen_clock_text");
	hctb = document.getElementById("homescreen_clock_text_b");
	hdt = document.getElementById("homescreen_datum_text");
	
	
	setTimeout(function()
	{
		ticken();
	},100);
	
}

//Oders the apps in a appcategorie alphabetical
function oderappalpha()
{
	"use strict";		
	
	end_appmove_appdrawer();
	
	var apps_cat = apps_by_cat( all_apps, current_kat);
	
	function compare( a, b ) 
	{
		if ( a.name < b.name )
		{
			return -1;
		}
		
		if ( a.name > b.name )
		{
			return 1;
		}
		
		return 0;
	}

	apps_cat.sort( compare );

	//Delete all Apps the main array
    var delete_string = "";
  
    for(var i = 0; i<all_apps.length; i++)
    {		
		if (all_apps[i].cat == current_kat)
		{
			delete_string = delete_string + i + ",";
		}
     }
        
     var delete_array = delete_string.split(',');
     for (var i = delete_array.length - 1; i >= 0; i--)
     {
          if (delete_array[i] != "") 
          {
              var icc = delete_array[i];
              all_apps.splice(icc, 1);
          }
      }			
	
	  for(var i = 0; i<apps_cat.length; i++)
	  {
			if(apps_cat[i].start_name != "nope")
			{
				all_apps.push(apps_cat[i]);		
			}
       }

	document.getElementById("dropdm_popup").style.display = "none";
 
	update_single_app_div(current_kat);
	new_font_size_adjust();	

	update_app_position();
	store_apps(apps_to_string(all_apps));
	
}


//Hides the select Icon dialog for categorie Icons
function hide_icon_select_cat()
{
	"use strict";			
	document.getElementById("icon_dialog_cat").style.display = "none";
	document.getElementById("icon_dialog_cat_bg").style.display = "none";
	document.getElementById("select_iconpack_cat_dialog").style.display = "none";
	document.getElementById("all_icons_cat_dialog").style.display = "none";
}

//Show the select Dialog for a new categorie icon
function select_cat_icon(in_row)
{
	"use strict";	
	cat_row = in_row;
	document.getElementById("icon_dialog_cat").style.display = "block";
	document.getElementById("icon_dialog_cat_bg").style.display = "block";
}



//Set a global icon pack and trigger the use of the iconpack
function set_global_iconpack(set_icon_pack)
{
	"use strict";		
	//Only if there is a difference...
	if(set_icon_pack != global_icon_pack)
	{
		global_icon_pack = set_icon_pack;
		applay_icon_pack(set_icon_pack,1);
	}
	else
	{
		global_icon_pack = set_icon_pack;
		setTimeout(function()
		{
			back_function();
		},50);
	}
}


//Replace all in string...        
String.prototype.replaceAll = function(search, replacement)
{
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



/* 
 * 
 * 
 * 
 * Functions  using Native Code 
 * might be changed in order to Support different platforms
 * 
 * 
 * 
 */
 
 

/* First function, when everything is loaded... */
function ready_function() 
{				
	"use strict";
	
	navigator.splashscreen.show();
	
	window.plugins.intentShim.getIntent(function(short_cut_info)
	{
		//Wait for finished loading
		setTimeout(function() 
		{
			 set_shortcut_after_loading(short_cut_info)
		},100);
		
			function set_shortcut_after_loading(short_cut_info)
			{	
				if(loading_finished==0) //Still loading...
				{
					setTimeout(function() 
					{
						set_shortcut_after_loading(short_cut_info)
					},200);
					return;
				}
		
				
				var short_cut_info_array = short_cut_info.split("|!!|");
				
				var package_name = short_cut_info_array[0];
				var disp_name = short_cut_info_array[1];
				var icon = short_cut_info_array[2];
				var shortcut_id = short_cut_info_array[3];
				var user_id = short_cut_info_array[4];


				//Add the virtualapp					
				if( icon == "blank") //There must be an Error
				{
					return;
				}
					
				//package_name = sanitize_input(package_name);
					
				var new_package_name = "virtualapp_" + package_name + "!!.!!" + shortcut_id + "!!.!!" + user_id;   //+ package_name + "!.!" + url;
					
				//Check if app exists...
				if(check_if_app_exists(new_package_name) == true)
				{
					//Link is already present...
					return;
				}
				
					
				var cat = guess_cat(disp_name,new_package_name);
					
				var tmp_app = new App(new_package_name,disp_name,icon,cat);
				
				all_apps.unshift(tmp_app);
						
				set_app_list(all_apps);	
				
				update_app_divs();
				
				new_font_size_adjust();

		
				if(cat==2)
				{	
					if(current_kat != 2)
					{
						cat_2_new.push(tmp_app.start_name);
						set_new_cat(2);
					}
				}
				else
				{
					if(current_kat != 1)
					{
						cat_1_new.push(tmp_app.start_name);
						set_new_cat(1);	
					}
				}
				
				
				set_app_drawer_black_white();
		}
	
	}, function fail(){} );

						
	var firstbr = window.plugins.intentShim.registerBroadcastReceiver(
	{
			filterActions:
			[
				'android.intent.action.PACKAGE_ADDED',
				'android.intent.action.PACKAGE_REMOVED'
			],
			filterDataSchemes:
			[
				'package'
			]
	},function(){});


	var secondbr = window.plugins.intentShim.registerBroadcastReceiver(
	{
	  filterActions: 
	  [
		'luke.launcher.ACTION', //  Scans
		'com.android.launcher.action.INSTALL_SHORTCUT', //  Messages from service
	  ],
	  filterCategories: 
	  [
		'com.android.intent.category.DEFAULT'
	  ]
	},
	function(intent)
	{
		force_update_applist = 0; //Workaround for the new app installed bug
		
		var shortcut = ""+intent;
		var array_s = shortcut.split("|,|");	 
		var package_name = array_s[0];
		package_name = package_name.replace("ComponentInfo{", "");
		package_name = package_name.replace("}", "");
		var disp_name = array_s[1];
		var url = array_s[2];
		var icon = array_s[3];        
			

		if( url == "blank") //There must be an Error
		{
			setTimeout(function() 
			{
				compare_apps_with_installed_apps();
				update_app_divs();
				new_font_size_adjust();
				
			}, 150);
			return;
		}
			
		if( url == "icon") //There must be an Error
		{
			return;
		}
			
		url = sanitize_input(url);
		package_name = sanitize_input(package_name);
			
		var new_package_name = "virtualapp_" + package_name + "!.!" + url;
			
		//Check if app exists...
		if(check_if_app_exists(new_package_name) == true)
		{
			//Link is already present...
			return;
		}
			
		var cat = guess_cat(disp_name,new_package_name);
			
		var tmp_app = new App(new_package_name,disp_name,icon,cat);
		all_apps.unshift(tmp_app);
			
		update_app_divs();
		set_app_list(all_apps);
		new_font_size_adjust();

		if(cat==2)
		{	
			if(current_kat != 2)
			{
				cat_2_new.push(tmp_app.start_name);
				set_new_cat(2);
			}
		}
		else
		{
			if(current_kat != 1)
			{
				cat_1_new.push(tmp_app.start_name);
				set_new_cat(1);	
			}
		}
		
		set_app_drawer_black_white();
			
		return;		
	});


	window.plugins.intentShim.onIntent(function (intent) //HomeScreen Button Press
	{

		if(  window.getComputedStyle(document.getElementById("settings_ba")).display == "block" ) //Hide Dropdown menu
		{
			back_function();
			return;
		}
		
		
		if (app_move_mode == 1)
		{ 
			app_move_mode = 0;
			if( current_view == "appdrawer")
			{
				document.getElementById("scrollable").style.display = 'block';
				init_swiper(0);
							
				document.getElementById("scrollable").style.border = "solid";
				document.getElementById("scrollable").style.borderColor = "red";
				document.getElementById("scrollable").style.borderWidth = "0vw";

				update_app_position();
				update_app_divs();
				store_apps(apps_to_string(all_apps));
			}
			else
			{
				document.getElementById("app_drawer").style.display = "block";
				document.getElementById("table_homescreen").style.border = "solid";
				document.getElementById("table_homescreen").style.borderColor = "red";
				document.getElementById("table_homescreen").style.borderWidth = "0vh";
					
				update_app_position();
				update_app_divs(); //Update all divs - also the homescreen div
				init_swiper(1);
				store_apps(apps_to_string(all_apps));
			}
		}
		
		if(mySwiper!=null)
		{
			if (current_view == "appdrawer" )
			{
				//To Show the homescreen agian
				if(swipe_mode=="r")
				{
					//mySwiper.slideNext();
					if(mySwiper!= null){mySwiper.scroll(1, true);}
				}
				else
				{
					if(mySwiper!= null){mySwiper.scroll(0, true);}
					//mySwiper.slidePrev();
				}
			}
		}
	});


	notificationListener.listen(function(n)
	{ 
		if (homescreen_nofitications == "1") 
		{
				
			if(n.clear==true)
			{
					 
				if(  (n.key).toLowerCase().indexOf("@") == -1  )
				{
					if(n.action=="del")
					{
						del_badges(n.package);
					}
					else
					{
						new_badges(n.package);
					}
				}
			}
			 
		}
			 
	}, function(e){});
		   
		
		
		
		
	var successinfo = function(message) 
	{
		var array_s = "";
		array_s = message.split(",");
						
		nav_pad_tmp = "";
		status_pad_tmp = "";
						
		nav_pad_tmp = array_s[0]; 
		status_pad_tmp = array_s[1]; 

		if(nav_pad_tmp<0)
		{
			nav_pad_tmp = "-1";
		}
						
		if(status_pad_tmp<0)
		{
			status_pad_tmp = "-1";
		}
											
		if(nav_pad_tmp == ""){nav_pad_tmp = "-1";}
						
		if(status_pad_tmp == ""){status_pad_tmp = "-1";}			
				
		init_luke_launcher();
	};
			
	var failinfo = function(message) {};
	androidinfo.getall("getall", successinfo, failinfo); //Start
}



//Back Button is pressed
function onBackKeyDown() 
{
	"use strict";
	back_function();
}


//Icon from a iconpack is selected as a categorie icon
function icon_pack_icon_cat_selected(drawable)
{
	"use strict";
	var save_file = cat_row + ".png";

	try
	{	
		androidinfo.applay_icon_iconpack_cat(save_file,disp_current_iconpack, drawable,new_icon_width,new_icon_height, function ok()
			{ 	
				cat_array[cat_row][0] = "/data/data/luke.launcher/customcaticons/"+save_file;
				document.getElementById(cat_row + "_cat" ).src = "file:///data/data/luke.launcher/customcaticons/"+save_file  + "?" + new Date().getTime();
				
				hide_icon_select_cat();
			}, function bad()
			{
				hide_icon_select_cat();
			} );
	}
	catch( error ){}
}
 
//Displays an iconpack for selecting a new App Icons
function display_iconpack(in_name)
{
	"use strict";	
	document.getElementById("icon_dialog").style.display = "none";
	document.getElementById("select_iconpack_dialog").style.display = "none";
	document.getElementById("all_icons_dialog").style.display = "block";
	
	disp_current_iconpack = in_name;
	
	var table_id = document.getElementById("table_iconpackicons_list");
			
	for(var i = table_id.rows.length - 1; i >= 0; i--)
	{
		table_id.deleteRow(i);
	}
	
	var new_row = table_id.insertRow(-1);
				
	new_row.innerHTML='<tr class="child"> <br><b>Lade ...</b></tr>'; 
	 			
	setTimeout(function()
	{
		try
		{	
			androidinfo.geticons_frompack(disp_current_iconpack,"","1", successinfo_icon_packs, failinfo_icon_packs);
		}
		catch(error){}
	}, 10);
	document.getElementById('searchiconinpack_input').value = '';	
}
 

//Displays an Iconpack for selecting a new categorie icon
function display_cat_iconpack(in_name)
{
	"use strict";
	document.getElementById("icon_dialog_cat").style.display = "none";
	document.getElementById("select_iconpack_cat_dialog").style.display = "none";
	
	document.getElementById("all_icons_cat_dialog").style.display = "block";
	
	disp_current_iconpack = in_name;
	
	var table_id = document.getElementById("table_iconpackicons_cat_list");
			
	for(var i = table_id.rows.length - 1; i >= 0; i--)
	{
		table_id.deleteRow(i);
	}
	
	var new_row = table_id.insertRow(-1);
				
	new_row.innerHTML='<tr class="child"> <br><b>Lade ...</b></tr>'; 
	 			
	setTimeout(function()
	{
		try
		{	
			androidinfo.geticons_frompack(disp_current_iconpack,"","1", successinfo_icon_packs_cat, failinfo_icon_packs);
		}
		catch( error ){}
	}, 10);
	document.getElementById('searchiconinpack_cat_input').value = '';	
}



//Typing finished (after 650ms) now display the results	- For normal Appicons/iconpacks
function final_search()
{		
	"use strict";		
	var iconpack_page_number = 1;
	var table_iconpacklist = document.getElementById("table_iconpackicons_list");
	for(var i = table_iconpacklist.rows.length - 1; i >= 0; i--)
	{
		table_iconpacklist.deleteRow(i);
	}
	
	var search_icon_pack = document.getElementById("searchiconinpack_input").value;
	
	try
	{	
		androidinfo.geticons_frompack(disp_current_iconpack,search_icon_pack,iconpack_page_number, successinfo_icon_packs, failinfo_icon_packs);
	}
	catch( error ){}
}

//Typing finished (after 650ms) now display the results	- For Categories Icons/iconpacks
function final_search_cat()
{
	"use strict";					
	var iconpack_page_number = 1;
	var table_iconpacklist = document.getElementById("table_iconpackicons_cat_list");
	for(var i = table_iconpacklist.rows.length - 1; i >= 0; i--)
	{
		table_iconpacklist.deleteRow(i);
	}
	
	var search_icon_pack = document.getElementById("searchiconinpack_cat_input").value;
	
	try
	{	
		androidinfo.geticons_frompack(disp_current_iconpack,search_icon_pack,iconpack_page_number, successinfo_icon_packs_cat, failinfo_icon_packs);
	}
	catch( error ){}
}




//Reverts the Appicon to the original one
function revert_icon()
{
	"use strict";			
	var current_app = document.getElementById("s_app_start_name").textContent;
	
	try
	{	
		androidinfo.revert_icon(current_app, function ok()
		{
			document.getElementById("s_app_icon").src = "file:///data/data/luke.launcher/appicons/"+current_app+".png?" + new Date().getTime();
				
			for(var i = 0; i<all_apps.length; i++)
			{
				if (all_apps[i].start_name == current_app)
				{
					all_apps[i].icon ="file:///data/data/luke.launcher/appicons/"+current_app+".png?"+ new Date().getTime();
					update_single_app_div(current_kat);
					new_font_size_adjust();	
					hide_icon_select();
					break;
				}
			}
				
		}, function fail(){});
	}
	catch( error ){}
}



//An icon is selected from an iconpack
function icon_pack_icon_selected(drawable)
{
	"use strict";
	setTimeout(function()
	{ 
		var current_app = document.getElementById("s_app_start_name").textContent;
		var tmp_img = document.getElementById('s_app_icon'); 
		var width_tmp = tmp_img.naturalWidth;
		var height_tmp = tmp_img.naturalHeight;
		
		var back_icon = "";
		for(var i = 0; i<all_apps.length; i++)
		{
			var start_name = all_apps[i].start_name;
			if(start_name == current_app)
			{
				back_icon = all_apps[i].icon;
				break;
			}	
		}
		
		try
		{
			back_icon = back_icon.substring(back_icon.lastIndexOf('/')+1);
		}
		catch( error ){}	
		
		if(  back_icon.indexOf("?") !== -1 )
		{
			try
			{
				back_icon = back_icon.substring(0,back_icon.lastIndexOf('?'));
			}
			catch( error ){}	   
		}
		
		
		if(back_icon=="")
		{
			
			toast_notification("Error!", "short","bottom");
			return;	
		}
		
		try
		{	
			androidinfo.applay_icon_iconpack(back_icon,disp_current_iconpack, drawable,width_tmp,height_tmp, function ok()
			{ 	
				document.getElementById("s_app_icon").src = "file:///data/data/luke.launcher/appicons/"+back_icon+"?" + new Date().getTime();

				for(var i = 0; i<all_apps.length; i++)
				{
					if (all_apps[i].start_name == current_app)
					{
						all_apps[i].icon ="file:///data/data/luke.launcher/appicons/"+back_icon+"?"+ new Date().getTime();
						update_single_app_div(current_kat);
						new_font_size_adjust();	
						hide_icon_select();
						break;
					}
				}
						
			},function bad()
			{
				toast_notification("Error!", "short", "bottom");
			} );
		}
		catch( error ){}
		
	}, 100);
	
}


//Show all Iconpacks, for app icon replacement
function open_symbol_icon()
{
	"use strict";	
	document.getElementById("icon_dialog").style.display = "none";
	document.getElementById("all_icons_dialog").style.display = "none";
	document.getElementById("select_iconpack_dialog").style.display = "block";
	
		
	var successinfo_icon_packs = function(message) 
	{
		//No Iconpack installed!
		if(message=="")
		{
			var string_add = "";
			var element_iconpack_list  = document.getElementById("iconpack_list");
			element_iconpack_list.innerHTML = "";
			var string_no_iconpack = "<br> <a href='#' class='select_iconpack_text'><span id='no_icon_pack_installed' >"+no_iconpack_installed_string+"</span></a>";
			element_iconpack_list.innerHTML = string_no_iconpack;		
			return;
		}
		
		var str_array = message.split(',');

		var string_add = "";
		var element_iconpack_list  = document.getElementById("iconpack_list");
		element_iconpack_list.innerHTML = "";
		
		var sptwo = null;
		var package_name = "";
		var name_pack = "";
		var icon_pack = "";
		
		for(var i = 0; i < str_array.length-1; i++)
		{
			sptwo = str_array[i].split('-');
			package_name = sptwo[0];
			name_pack = sptwo[1];
			icon_pack = sptwo[2];
			
			if( package_name != "")
			{
				string_add = "<a ontouchend='display_iconpack(\""+package_name+"\");'   href='#' class='select_iconpack_text'><span><img class= 'select_app_icon' src='data:image/png;base64,"+icon_pack+"' /></span>"+name_pack+"</a>";
				element_iconpack_list.innerHTML = element_iconpack_list.innerHTML + string_add;
			}
		}
	};
	
	var failinfo_icon_packs = function(message)
	{
		var string_add = "";
		var element_iconpack_list  = document.getElementById("iconpack_list");
		element_iconpack_list.innerHTML = "";
		var string_no_iconpack = "<br> <a href='#' class='select_iconpack_text'><span id='no_icon_pack_installed'>"+no_iconpack_installed_string+"</span></a>";
		element_iconpack_list.innerHTML = string_no_iconpack;
	};
	
	try
	{				
		androidinfo.getalliconpacks("getalliconpacks", successinfo_icon_packs, failinfo_icon_packs);
	}
	catch(ee)
	{
		var string_add = "";
		var element_iconpack_list  = document.getElementById("iconpack_list");
		element_iconpack_list.innerHTML = "";
		var string_no_iconpack = "<br> <a href='#' class='select_iconpack_text'><span id='no_icon_pack_installed'>"+no_iconpack_installed_string+"</span></a>";
		element_iconpack_list.innerHTML = string_no_iconpack;
	}
}


//Show all Iconpacks for custom Cat Icons
function open_symbol_icon_cat()
{
	"use strict";	
	document.getElementById("icon_dialog_cat").style.display = "none";
	document.getElementById("select_iconpack_cat_dialog").style.display = "block";
	
	var successinfo_icon_packs = function(message) 
	{
		if(message=="")
		{
			var string_add = "";
			var element_iconpack_list  = document.getElementById("iconpack_cat_list");
			element_iconpack_list.innerHTML = "";
			var string_no_iconpack = "<br> <a href='#' class='select_iconpack_text'><span id='no_icon_pack_installed' >"+no_iconpack_installed_string+"</span></a>";
			element_iconpack_list.innerHTML = string_no_iconpack;		
			return;
		}
		
		var str_array = message.split(',');

		var string_add = "";
		var element_iconpack_list  = document.getElementById("iconpack_cat_list");
		element_iconpack_list.innerHTML = "";
		
		var sptwo = null;
		var package_name = "";
		var name_pack = "";
		var icon_pack = "";
		for(var i = 0; i < str_array.length-1; i++)
		{
			sptwo = str_array[i].split('-');
			package_name = sptwo[0];
			name_pack = sptwo[1];
			icon_pack = sptwo[2];
			
			if( package_name != "")
			{
				string_add = "<a ontouchend='display_cat_iconpack(\""+package_name+"\");' href='#' class='select_iconpack_text'><span><img class= 'select_app_icon' src='data:image/png;base64,"+icon_pack+"' /></span>"+name_pack+"</a>";
				element_iconpack_list.innerHTML = element_iconpack_list.innerHTML + string_add;
			}
		}
	};
	var failinfo_icon_packs = function(message) {};
		
	try
	{					
		androidinfo.getalliconpacks("getalliconpacks", successinfo_icon_packs, failinfo_icon_packs);
	}
	catch(ee)
	{
		
		var string_add = "";
		var element_iconpack_list  = document.getElementById("iconpack_cat_list");
		
		element_iconpack_list.innerHTML = "";

		var string_no_iconpack = "<br> <a href='#' class='select_iconpack_text'><span id='no_icon_pack_installed'>"+no_iconpack_installed_string+"</span></a>";
			
		element_iconpack_list.innerHTML = string_no_iconpack;
	}

}


//Select an icon from the User Gallery
function open_gallery_icon()
{
	"use strict";	
	var tmp_img = document.getElementById('s_app_icon'); 

	var width_tmp = tmp_img.naturalWidth;
	var height_tmp = tmp_img.naturalHeight;
		
	var size_to = 100;
	
	if(width_tmp > height_tmp)
	{
		size_to = width_tmp;
	}
	else
	{
		size_to = height_tmp ;
	}
	
	var options = 
    {
        targetHeight : (size_to*2),
        targetWidth : (size_to*2),
        destinationType: Camera.DestinationType.FILE_URI,  
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };
 
	navigator.camera.getPicture(function cameraSuccess(imageUri)
	{
        var current_app = document.getElementById("s_app_start_name").textContent;
        
		var back_icon = "";
		for(var i = 0; i<all_apps.length; i++)	
		{
			var start_name = all_apps[i].start_name;
			if(start_name == current_app)
			{
				back_icon = all_apps[i].icon;
				break;
			}	
		}
		
		try
		{
			back_icon = back_icon.substring(back_icon.lastIndexOf('/')+1);
		}
		catch( error ){}	
		
		if(  back_icon.indexOf("?") !== -1 )
		{
			try
			{
				back_icon = back_icon.substring(0,back_icon.lastIndexOf('?'));
			}
			catch( error ){}	   
		}
		
		if(back_icon=="")
		{
			toast_notification("Error!", "short", "bottom");
			return;	
		}
            
		try
		{	
			androidinfo.applay_icon(back_icon , imageUri , width_tmp ,  height_tmp , function ok()
			{
		
				document.getElementById("s_app_icon").src = "file:///data/data/luke.launcher/appicons/"+back_icon+"?" + new Date().getTime(); 
				
				for(var i = 0; i<all_apps.length; i++)
				{
					if (all_apps[i].start_name == current_app)
					{
						all_apps[i].icon ="file:///data/data/luke.launcher/appicons/"+back_icon+"?"+ new Date().getTime();
						update_single_app_div(current_kat);
						new_font_size_adjust();	
						hide_icon_select();
						break;
					}
				}
				
			}, 
			function fail()
			{
				toast_notification( "Error!","short","top");
			});
		}
		catch( error ){}
    }, 
    function cameraError(error){}, options);
}

//Select an icon from the gallery for a custom categorie
function open_gallery_icon_cat()
{
	"use strict";	

	var options = 
    {
        targetHeight : (size_to*2),
        targetWidth : (size_to*2),
        destinationType: Camera.DestinationType.FILE_URI,  
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };
 

	navigator.camera.getPicture(function cameraSuccess(imageUri)
	{
		try
		{	
			androidinfo.applay_icon_cat(cat_row+".png" , imageUri , new_icon_width ,  new_icon_height , function ok()
			{
					cat_array[cat_row][0] = "file:///data/data/luke.launcher/customcaticons/"+cat_row+".png";
					document.getElementById(cat_row + "_cat" ).src = "file:///data/data/luke.launcher/customcaticons/"+cat_row+".png?" + new Date().getTime();
					hide_icon_select_cat();
			}, 
			function fail()
			{
				toast_notification("Error!","short","top");
			});
		}
		catch( error ){}
    }, 
    function cameraError(error){}, options);
}


//Compare the app objects with the real installed apps
function compare_apps_with_installed_apps()
{
	"use strict";
	//List with all installed apps	
	try
	{
		navigator.IntentList.getList(function(applist) 
		{
		
			var all_installed_apps = [];
			var obj = applist;//parse the JSON string
			var name = "";
			var start_name = "";
			var icon = "";
				   
			Object.keys(obj).forEach(function(key) 
			{
				name = obj[key].label;
				start_name = obj[key].package;
				
				name = name.replace("!;!","");
				name = name.replace("||","");
				
				name = name.split(';;').join('');
				name = name.split('\|\|').join('');
				
				start_name = start_name.replace("!;!","");
				start_name = start_name.replace("||","");

				start_name = start_name.split('!;!').join('');
				start_name = start_name.split('\|\|').join('');
		
				start_name = sanitize_input(start_name);
				name = sanitize_input(name);
				
				if(start_name!="luke.launcher") //exclude the luke launcher
				{
					icon = "file:///data/data/luke.launcher/appicons/"+start_name+".png";
					var tmp_app = new App(start_name,name,icon, "1");
					all_installed_apps.push(tmp_app);
				}

			});

			
			var new_apps_found = 0;
			for(var i = 0; i<all_installed_apps.length; i++)
			{
				if ( is_app_in_all_apps(all_installed_apps[i].start_name) == false) 
				{
					//The app must be new!
					//Guess a categorie for the app
					
					//Applay the current Icon Pack to the new installed app
					if(global_icon_pack != "default" && (all_installed_apps[i].start_name.startsWith('virtualapp_')) == false)
					{

						try
						{	
							androidinfo.applay_icon_iconpack_app(all_installed_apps[i].start_name,global_icon_pack,new_icon_width,new_icon_height, function ok(){}, function bad(){} );
						}
						catch( error ){}
						
					}
				
					var pot_cat = guess_cat(all_installed_apps[i].name , all_installed_apps[i].start_name);
					//var tmp_app = new App(all_installed_apps[i].start_name,all_installed_apps[i].name,all_installed_apps[i].icon, pot_cat);
					var tmp_app = new App(all_installed_apps[i].start_name,all_installed_apps[i].name,all_installed_apps[i].icon+"?"+ new Date().getTime(), pot_cat);
					all_apps.unshift(tmp_app);
					new_apps_found = new_apps_found + 1;
					
					if(new_apps_found < 4)
					{
						//Add the app to the new app array
						if(pot_cat == 1){ cat_1_new.push(tmp_app.start_name); }
						if(pot_cat == 2){ cat_2_new.push(tmp_app.start_name); }
						if(pot_cat == 3){ cat_3_new.push(tmp_app.start_name); }
						if(pot_cat == 4){ cat_4_new.push(tmp_app.start_name); }
						if(pot_cat == 5){ cat_5_new.push(tmp_app.start_name); }
						if(pot_cat == 6){ cat_6_new.push(tmp_app.start_name); }
					}
				}  
			}
			
			//To many new apps -> disable new app notification
			if(new_apps_found > 5)
			{
				cat_1_new = [];
				cat_2_new = [];
				cat_3_new = [];
				cat_4_new = [];
				cat_5_new = [];
				cat_6_new = [];		
			}
			
			if(current_kat == 1){ cat_1_new = []; }
			if(current_kat == 2){ cat_2_new = []; }
			if(current_kat == 3){ cat_3_new = []; }
			if(current_kat == 4){ cat_4_new = []; }
			if(current_kat == 5){ cat_5_new = []; }
			if(current_kat == 6){ cat_6_new = []; }
	
				
			//The otherway arround - check if all apps are really installed
			var del = "";
			for(var i = 0; i<all_apps.length; i++)
			{
				if ( is_app_in_installed_apps( all_installed_apps ,  all_apps[i].start_name) == false) 
				{
					//Should be deleted from all apps!
					del = del + i + ",";
					close_app_setting( all_apps[i].start_name );
				}  
			}

			var myarray = del.split(',');
			for (var i = myarray.length - 1; i >= 0; i--)
			{
				if (myarray[i] != "")
				{
					var icc = myarray[i];
					all_apps.splice(icc, 1);
				}
			 }
			
			//If the Iconpack was uninstalled
			if(check_if_app_exists(global_icon_pack)==false && global_icon_pack != "default" )
			{
				global_icon_pack = "default";
				applay_icon_pack("default",0);
			}
			
			//update_app_divs();
			set_app_list(all_apps);
			
			applay_settings(get_current_settings());

			if( cat_1_new.length > 0 && cat_1_new.length < 4){ set_new_cat(1); }
			if( cat_2_new.length > 0 && cat_2_new.length < 4){ set_new_cat(2); }
			if( cat_3_new.length > 0 && cat_3_new.length < 4){ set_new_cat(3); }
			if( cat_4_new.length > 0 && cat_4_new.length < 4){ set_new_cat(4); }
			if( cat_5_new.length > 0 && cat_5_new.length < 4){ set_new_cat(5); }
			if( cat_6_new.length > 0 && cat_6_new.length < 4){ set_new_cat(6); }

			loading_finished = 1;
			
		},function(ee) 
		{
			loading_finished = 1;
		});		

	}
	catch (ee)
	{
			set_app_list(all_apps);
			loading_finished = 1;
	}	
			
}


//Load settings from the android device
function load_settings()
{
	"use strict";	
		
	var defaut_settings_string = "r||0||1-0-1-#000000-1-1||#ffffff||70||eng||com.android.deskclock||com.android.calendar||1||0||1||-1||-1||0||27||20||100||3-4||5-5||1||5||null||default||l||r||10||1||||||automatic";
	
	//If German is avalible
	if (navigator.language.indexOf("de") > -1)
	{
		 defaut_settings_string = defaut_settings_string.replace("||eng||", "||de||");
	}

	var device_manufacturer = "";
	try
	{
		device_manufacturer = device.manufacturer;
		device_manufacturer = device_manufacturer.toLowerCase()
	}catch(err){}
	
	if( device_manufacturer == "xiaomi")
	{
		//On Xiaomi Miui devices, the alarm manager is not reliable -> So showing the alarm is in default not active
		defaut_settings_string = defaut_settings_string.replace("1-0-1-#000000-1-1", "1-0-1-#000000-1-0");
	}
	
	try 
	{

		NativeStorage.getItem("settings",
		function(ine)
		{
			var new_settings = ""+ine;
			
			should_wait_loadscreen = 0; 
			
			applay_settings(new_settings);

			init_swiper(1); //Start at the Homescreen -> not the Appdrawer
			current_view = "homescreen";
				
			setTimeout(function(){ update_homescreen_clock_position();	}, 1500);//15000); //Wait for the first interval...


			setTimeout(function()
			{ 
				open_categorie( null, document.getElementById("1") );
			}, 10);
			
			load_saved_apps();
		},
		function()
		{
			should_wait_loadscreen = 1; //Might be the first run
			applay_settings(defaut_settings_string);
			
			init_swiper(0);	
			current_view = "appdrawer";
			
			setTimeout(function(){ update_homescreen_clock_position();	}, 1500);//Wait for the first interval...
			
			setTimeout(function()
			{
				open_categorie( null,document.getElementById("1") );
			}, 10);
			
			load_saved_apps();
		});
	
	}
	catch (error)
	{
		should_wait_loadscreen = 1; // 1 Might be the first run
		applay_settings(defaut_settings_string);	
		
		init_swiper(0);	 //Auf 0!
		current_view = "appdrawer";
		
		setTimeout(function(){ update_homescreen_clock_position();	}, 1500);//Wait for the first interval...

		setTimeout(function()
		{
			open_categorie( null, document.getElementById("1") );
		}, 10);
		load_saved_apps();
	}
}


//Load saved apps (and positions!) from the android device
function load_saved_apps()
{
	"use strict";	
	var back = "";
	try 
	{
		NativeStorage.getItem("apps",
		function(e)
		{
			back = ""+e;
			all_apps = string_to_apps(back);
			update_app_divs();
			
			setTimeout(function() 
			{
				compare_apps_with_installed_apps();
			}, 10);
    
		},
		function()
		{
			setTimeout(function() 
			{
				compare_apps_with_installed_apps();
			}, 10);
			force_update_applist = 0; 
		});
	}
	catch (eror)
	{
		back = "com.fdsaffdduu7d7fkkk95!;!dsafdsafsadfasdfdsaf!;!icons/app.png!;!1||!;!com.fdsaudu7df5!;!1!;!icons/app.png!;!1||!;!codffm.fdsauu7df5!;!9!;!icons/app.png!;!1||!;!co0om.fdsauu7df5!;!8!;!icons/app.png!;!1||";
	
		all_apps = string_to_apps(back);
		update_app_divs();
	}
}


//Store the App string on the android device
function store_apps(in_string)
{
	"use strict";	
	try 
	{
		NativeStorage.setItem("apps",""+in_string,function(){},function(){});		
	}
	catch (e){}
}


//Store the setting string on the android device
function store_settings(in_string)
{
	"use strict";	
	try 
	{
		NativeStorage.setItem("settings",""+in_string,function(){},function(){});
	}
	catch (e){}	
}

//Launch an App with an app name
function launch_app(in_app)
{
	"use strict";
	//Launch a ShortCut
	if( in_app.startsWith('virtualapp_') == true)
	{
		if( in_app.includes("!!.!!") == true)
		{
			var array_s = in_app.split("!!.!!");
		 
			var package_name = array_s[0];
			var shortcut_id = array_s[1];
			var user_id = array_s[2];
			package_name = package_name.replace("virtualapp_", "");
			try
			{	
				androidinfo.start_shortcut(package_name,shortcut_id,user_id, function ok(){}, function bad(){} );
			}
			catch( error ){}
		}
		else
		{
			var array_s = in_app.split("!.!");
		 
			var package_name = array_s[0];
			package_name = package_name.replace("ComponentInfo{", "");
			package_name = package_name.replace("}", "");
			package_name = package_name.replace("virtualapp_", "");
			
			if(  package_name.toLowerCase().indexOf("/") !== -1  )
			{
				package_name = package_name.split("/").shift();
			}
			
			var url = array_s[1];
		
			if( package_name == "default") //Open with the SystemBrowser
			{
				var sAppdefault = startApp.set(
				{
					"action": "ACTION_VIEW",
					"uri": url
				});
				sAppdefault.start(function(success) {}, function(error)
				{
					//The default Browser is not working...
					toast_notification("Error!","short", "bottom");
				});
			}
			else //Not the Default Browser...
			{
				var sAppndf = startApp.set(
				{
					"action": "ACTION_VIEW",
					"application":package_name,
					"uri": url
				});
					
				sAppndf.start(function(success) {}, function(error)
				{
					//Error with the not Default Browser, so now use the Dauflt one...
					var sAppba = startApp.set(
					{
						"action": "ACTION_VIEW",
						"uri": url
					});
					sAppba.start(function(success) {}, function(error)
					{
						//Even the default Browser is not working...
						toast_notification("Error!", "short", "bottom" );
					});
				});
			}	
			
		}
	}

	for (var i = 0; i < app_stores.length; i++)
	{
	    if(in_app == app_stores[i])
	    {
			force_update_applist = 1;
			break;
		}    
	}

	//Remove Notification
	for(var i = 0; i<all_apps.length; i++)
	{	
		if(in_app == all_apps[i].start_name)
	    {
			var icat = all_apps[i].cat;
			if( icat == "0" || icat == 0 )
			{
				del_badges(in_app);
			}
		}
	}

	try 
	{
		startApp.set({"application":in_app }).start();
	}
	catch (e)
	{
	}
}




//Show the information menu (The creator and the version number)
function open_info_settings()
{
	"use strict";	
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_extra_div").style.display = "none"; 
	document.getElementById("settings_info").style.display = "flex"; 
	
	var version_nr = "-";
	try
	{
		cordova.getAppVersion.getVersionNumber(
			function (version)
			{
				version_nr = version;
				document.getElementById("settings_info_text2").textContent = info_text2+ " "+ version_nr;
			},
			function()
			{
				document.getElementById("settings_info_text2").textContent = info_text2+ " "+ version_nr;
			}
		);
	}
	catch(ee)
	{
		document.getElementById("settings_info_text2").textContent = info_text2+ " "+ version_nr;
	}
}




//Export Settings to the external Storage
function export_all()
{
	"use strict";
	
	//Ask for write permisson:
	cordova.plugins.diagnostic.requestExternalStorageAuthorization(function(status)
	{
		if(status == cordova.plugins.diagnostic.permissionStatus.GRANTED)
		{
			
			try
			{
				cordova.plugins.diagnostic.requestRuntimePermission(function(status)
				{
					if(status == cordova.plugins.diagnostic.permissionStatus.GRANTED)
					{
						setTimeout(function()
						{
							var export_save_string =  apps_to_string(all_apps) + "|_!!!_|" + get_current_settings();
							try
							{	
								androidinfo.exportall(export_save_string, function ok()
								{
									toast_notification( export_msg_string,"3500","bottom");
							
								}, function bad()
								{
									toast_notification("Error","3500", "bottom");
								} );
							}
							catch( error )
							{
								toast_notification("Error", "3500", "bottom");	
							}
						}, 150);
						
					}
					else
					{
						toast_notification("Error", "3500", "bottom");	
					}
				
					
				}, function(error)
				{
					toast_notification("Error", "3500", "bottom");
				}, cordova.plugins.diagnostic.permission.WRITE_EXTERNAL_STORAGE);
			}
			catch( error )
			{
				toast_notification("Error", "3500", "bottom");	
			}

		}	
		else
		{
			toast_notification("Error", "3500", "bottom");
		}	
	}, 
	function(error){});
	
}


//This function is used to close the expanded/info view of an app
function close_app_setting(in_app)
{
	"use strict";
	
	if(in_app=="")
	{
		return;
	}
		
	var current_app_setting_app = document.getElementById("s_app_start_name").textContent;
	
	if(in_app == current_app_setting_app)
	{
		//Delete the Icon...
		var back_icon = document.getElementById("s_app_icon").getAttribute("src");
		
		try
		{
			back_icon = back_icon.substring(back_icon.lastIndexOf('/')+1);
		}
		catch( error ){}	
		
		if(  back_icon.indexOf("?") !== -1 )
		{
			try
			{
				back_icon = back_icon.substring(0,back_icon.lastIndexOf('?'));
			}
			catch( error ){}	   
		}
		
		if(back_icon !="")
		{
			try
			{	
				androidinfo.remove_icon(back_icon, function ok(){}, function bad(){} );
			}
			catch( error ){}
		}

		end_app_settings();
	}
		
	return;
}


//Opens the settings in order to uninstall an app
function uninstall()
{
	"use strict";	
    var in_a = document.getElementById("s_app_start_name").textContent;
    force_update_applist = 1;

	
    if( in_a.startsWith('virtualapp_') == true) //Remove Virtual APP
	{
		var del = "";	
		for(var i = 0; i<all_apps.length; i++)
		{
			if ( all_apps[i].start_name == in_a) 
			{
				//Should be deleted from all apps!
				del = del + i + ",";
				close_app_setting( in_a );
			}  
		}

		var myarray = del.split(',');
		for (var i = myarray.length - 1; i >= 0; i--)
		{
			if (myarray[i] != "")
			{
				var icc = myarray[i];
				all_apps.splice(icc, 1);
			}
		 }
		
		//update_app_divs();
		set_app_list(all_apps);
		applay_settings(get_current_settings());
		store_apps(apps_to_string(all_apps));
		
		
	}
	else //Normal App
	{
		try 
		{
			window.cordova.plugins.settings.open("application_details"+in_a, function()
			{
				compare_apps_with_installed_apps();
			},function () {});
		}
		catch (e){}
	}
}

//Update the wallpaper of the Launcher
/*
 *Old method of displaying the wallpaper
function update_wallpaper()
{
	"use strict";
	
	var bg = "";
	try {
			window.plugins.wallpaper.setImage(" ",
			function(sucess)
			{
				bg = "file:///data/data/luke.launcher/wallpaper.jpg";
				document.body.style.backgroundImage = 'url(' + bg + '?random='+ new Date().getTime()+' )';
			},
			function(error) 
			{
				//No update of wallpaper necessary
				if(document.body.style.backgroundImage == "" || document.body.style.backgroundImage == null || document.body.style.backgroundImage == undefined)
				{
					bg = "file:///data/data/luke.launcher/wallpaper.jpg";
					document.body.style.backgroundImage = 'url(' + bg + '?random='+ new Date().getTime()+' )';
				}
					
			});
	}
	catch(error) {}			
}
*/


//When LukeLauncher is activated again
function onResume()
{
	"use strict";	
	//ReInit ticken
	ticken();

    if(force_update_applist==1)
	{
		if(searching==1)
		{
			end_search();
		}
		force_update_applist = 0;
		compare_apps_with_installed_apps();
	}
	
	//Alarm Clock update
	var array_s = clock.split("-");
    var alarm_clock = array_s[5];
  	//Only when the alarm clock is activated	
	
	update_next_alarm();
}


//Ok Button is pressed -> Now open the settings
function home_notifi_ok()
{
	"use strict";

	document.getElementById("asknotifi_dialog_bg").style.display = "none"; 
	document.getElementById("asknotifi_dialog").style.display = "none"; 
		
	setTimeout(function()
	{ 
		
		try 
		{
			window.cordova.plugins.settings.open("accessibility", function() {},function () {});
		}
		catch (e){}
	}, 50);		

}


//Display a native Toast Notification
function toast_notification( in_message , in_duration , in_position)
{
		try
		{  
			window.plugins.toast.showWithOptions({message: in_message, duration : in_duration, position: in_position});
		}
		catch( error ){}
		
		if(debug == 1)
		{
			alert( in_message );
		}
}


//All App Categorie settings are resetted and with guess_cat.js the Apps are resorted
function start_resort()
{
	"use strict";
	document.getElementById("askresort_dialog_bg").style.display = "none"; 
	document.getElementById("askresort_dialog").style.display = "none"; 

	if( default_cats == 1 )
	{

		toast_notification(sort_apps_new_string,"short","bottom");
		
		var save_links = [];
		for(var i = 0; i<all_apps.length; i++)
        {
            var cc = all_apps[i].start_name;
            if ( cc.startsWith('virtualapp_') == true)
            {
				if(cc != "nope")
				{
					save_links.push(all_apps[i]);
				}
            }

        }
        all_apps = [];
        all_apps = save_links;
		
		setTimeout(function() 
		{
			compare_apps_with_installed_apps();
		}, 50);
	}
	else
	{
		toast_notification( resort_error_string,"3500","bottom");
	}			
}



//Show the select icon dialog for the "global" icon pack
//The global iconpack is used for every app (a new instaled one or an existing app)
function open_global_iconpack()
{
	"use strict";		
	document.getElementById("allsettings").style.display = "none"; 
	document.getElementById("settings_seticonpack_div").style.display = "flex"; 
	
	document.getElementById("progress_dialog").style.display = "none";
	document.getElementById("progress_dialog_bg").style.display = "none";
		
	var element_iconpack_list = document.getElementById('iconpack_select_list');
	element_iconpack_list.innerHTML = "";
	
	var string_add_iconpacklist = "";
	
	string_add_iconpacklist = "<a href='#' ontouchend='set_global_iconpack(\"default\");' class='select_app_text'><span><img class= 'select_app_icon' src='icons/app_set.png' /></span>"+default_string+"</a>";
	
	element_iconpack_list.innerHTML = element_iconpack_list.innerHTML + string_add_iconpacklist;
    
	var successinfo_icon_packs = function(message) 
	{
		var str_array = message.split(',');
		var string_add_iconpacklist = "";

		var sptwo = null;
		var package_name = "";
		var name_pack = "";
		var icon_pack = "";
		
		for(var i = 0; i < str_array.length-1; i++)
		{
			sptwo = str_array[i].split('-');
			package_name = sptwo[0];
			name_pack = sptwo[1];
			icon_pack = sptwo[2];
			
			if( package_name != "")
			{
				string_add_iconpacklist = "<a ontouchend='set_global_iconpack(\""+package_name+"\");' style='color:white'  href='#' class='select_iconpack_text'><span><img class= 'select_app_icon' src='data:image/png;base64,"+icon_pack+"' /></span>"+name_pack+"</a>";
				element_iconpack_list.innerHTML = element_iconpack_list.innerHTML + string_add_iconpacklist;
			}
		}
		
	};
	
	var failinfo_icon_packs = function(message) {};
	try
	{				
		androidinfo.getalliconpacks("getalliconpacks", successinfo_icon_packs, failinfo_icon_packs);
	}
	catch( error ){}
}



//Every Appicon is overwritten with the Iconpack Icon
function applay_icon_pack(in_pack,visible)
{
	"use strict";	
	//Display the Progress Dialog..
	if(visible==1)
	{
		document.getElementById("progress_dialog").style.display = "block";
		document.getElementById("progress_dialog_bg").style.display = "block";
	}
	
	setTimeout(function()
	{

		//First return to normal Icons...
		for(var counter1 = 0; counter1<all_apps.length; counter1++)
		{
			var target_app = all_apps[counter1].start_name;		
			if(target_app != "nope" && target_app.startsWith('virtualapp_') == false )
			{
				try
				{	
					androidinfo.revert_icon(target_app, function ok(){}, function fail(){});
				}
				catch( error ){}
				all_apps[counter1].icon = "file:///data/data/luke.launcher/appicons/"+target_app+".png?"+ new Date().getTime();
			}
		}
		
		if(in_pack == "default")
		{
			update_app_divs();
			new_font_size_adjust();	
			document.getElementById("progress_dialog").style.display = "none";
			document.getElementById("progress_dialog_bg").style.display = "none";
			back_function();
			return;
		}

		for(var counter2 = 0; counter2<all_apps.length; counter2++)
		{
				var target_app = all_apps[counter2].start_name;	
				if(target_app != "nope" && target_app.startsWith('virtualapp_') == false)
				{
						try
						{	
							androidinfo.applay_icon_iconpack_app(target_app,in_pack,new_icon_width,new_icon_height, function ok(){}, function bad(){} );
						}
						catch( error ){}
						all_apps[counter2].icon = "file:///data/data/luke.launcher/appicons/"+target_app+".png?"+ new Date().getTime();
				}
		}
		
		update_app_divs();
		new_font_size_adjust();	
		document.getElementById("progress_dialog").style.display = "none";
		document.getElementById("progress_dialog_bg").style.display = "none";
		back_function();
	},100);
}


if(debug == 1)
{
	document.onkeyup = function(e) 
	{
		"use strict";			
		if (e.keyCode == 8) 
		{
			back_function();
		}	
	};
}
//logcat chromium:D SystemWebViewClient:D *:S
//
