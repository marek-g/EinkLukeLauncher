var settings_text_clock_app = "";
var settings_text_date_app = "";
var search_place_holder = "";
var app_order_li = "";
var app_move_li = "";
var hide_app_li = "";
var settings_li = "";
var rename_app = "";
var start_app = "";
var add_app_to_homescreen_text = "";
var rm_app_from_homescreen_text = "";
var hide_app_text = "";
var show_app_text = "";
var app_unin = "";
var settings_header = "";
var settings_homescreen_icons_text = "";
var settings_appdrawer_text = "";
var settings_icon_type_text = "";
var settings_icon_type_homescreen_text = "";
var settings_homescreen_day_time_text = "";
var settings_text_color_text = "";
var settings_text_colorhome_text = "";
var settings_read_text = "";
var modal_header_text_color_text = "";
var modal_header_homescreentext_color_text = "";
var ok_t_color_text = "";
var ok_th_color_text = "";
var modal_header_apd_text = "";
var modal_header_ormode_text = "";
var modal_ormode_l_text = "";
var modal_ormode_r_text = "";
var modal_header_homescreen_icon_text = " ";
var modal_homescreen_icon_r_text = "";
var modal_homescreen_icon_k_text = "";
var modal_header_read_text = "";
var modal_header_clock_pos_text = "";
var btn_applay_clock_pos_text = "";
var modal_header_clock_settings_text = "";
var modal_clock_show_text = "";
var modal_sec_show_text = "";
var modal_hour_show_text = "";
var modal_date_show_text = "";
var clock_showing_true = "";
var clock_showing_false ="";
var bg_color_text = "";
var bg_img_text = "";
var modal_header_lang_text = "";
var modal_lang_ger_text = "";
var modal_lang_eng_text = "";
var current_lang = "";
var modal_header_lang_text2 = "";
var settings_hs_sp_text = "";
var settings_hs_sp_text_header = "";
var settings_error_string = "";
var move_apps_text = "";
var result_string = "";
var removehomescreen_string = "";
var app_list_updated = "";
var settings_update_app_list_text = "";
var settings_navbar_text = "";
var hidden_apps_text = "";
var font_size_text = "";
var font_cat_text = "";
var font_app_text = "";
var font_homescreen_text = "";
var text_navbar_complete_transparent = "";
var header_navbar_text = "";
var text_navbar_none_transparent = "";
var text_pad_top_input = "";
var text_pad_bottom_input = "";
var settings_homescreeen_notification_text = "";
var text_settings_app_drawer = "";
var text_app_drawer_hori = "";
var text_app_drawer_verti = "";
var text_homescreensettings_drawer = "";
var text_homescreen_zeilen = "";
var	text_homescreen_spalten = "";
var settings_statusbar_text = "";
var cat_settings_text = "";
var info_text1 = "";
var info_text2 = ""; 
var info_text3 = "";
var cat_icon_size_text = "";
var header_icon_source_text = "";
var btn_orginal_icon_text = "";
var btn_gallery_icon_text = "";
var btn_symbol_icon_text = "";
var header_select_icon_pack = "";
var header_select_icon_from_iconpack_text = "";
var header_iconpack_choose_text = "";
var default_string = "";
var progress_info_string = "";
var export_string = "";
var import_string = "";
var add_new_catbtn_string = "";
var resortapplist_string = "";
var ask_resport_string = "";
var resort_btn_string = "";
var abort_btn_string = "";		 
var resort_error_string = "";
var export_msg_string = "";
var aling_left_string = "";
var aling_right_string = "";	
var swipe_header_string = "";
var settings_appdrawericonsize_string = "";
var sort_apps_new_string = "";
var modal_border_show_string = "";
var cat_default_text = "";
var extra_text_string = "";
var appdrawer_align_string = "";
var cat_custom_text = "";
var del_cat_text = "";
var notifi_allow_string = "";
var notifi_allow_ok_string = "";
var no_iconpack_installed_string = "";
var overwrite_import_string = "";
var import_btn_string = "";
var btn_bottomzero_string = "";
var msg_success = "";
var modal_alarm_clock_text = "";
var next_day_string = "";
var warn_sort_cat_string = "";
var font_string = "";
var font_select_string = "";
var orient_text = "";
var orient_auto = "";
var orient_horizontal = "";
var orient_vertical = "";
var expand_notification_text = "";

//All element strings are changed in order to apply the current language
function applay_lang()
{
	//English
	if(lang == "eng")
	{
		 info_text1 = "Created by Lukas Sökefeld";
		 info_text2  = "Version:";
		 info_text3 = "More information:";
		 hidden_apps_text = "Hidden apps";
		 settings_navbar_text = "Transparent navigation bar";
		 settings_statusbar_text = "Show status bar";
		 settings_update_app_list_text = "Update app list";
		 app_list_updated = "App list updated!";
		 removehomescreen_string = "Remove from homescreen";
		 result_string = "Results";
		 move_apps_text = "Move apps";
		 settings_error_string = "Error! - check settings!";
		 settings_text_date_app  = "Select date app";
		 settings_text_clock_app = "Select clock app";
		 search_place_holder = "Search...";
		 app_order_li = "Sort A-Z";
		 app_move_li = "Move apps";
		 hide_app_li = "Show hidden apps";
		 settings_li = "Settings";
		 rename_app = "Rename";
		 start_app = "Start";
		 add_app_to_homescreen_text = "Add to homescreen";
		 rm_app_from_homescreen_text = "Remove from homescreen";
		 hide_app_text = "Hide";
		 show_app_text = "Show";
		 app_unin = "Uninstall";
		 settings_header = "Settings";
		 settings_homescreen_icons_text = "Homescreen icons";
		 settings_appdrawer_text = "App-Drawer type";
		 settings_icon_type_text = "App-Drawer icons black/white";
		 settings_icon_type_homescreen_text = "Homescreen icons black/white";
		 settings_homescreen_day_time_text = "Time/date homescreen";
		 settings_text_color_text = "Text color app-drawer";
		 settings_text_colorhome_text = "Text color homescreen";
		 settings_read_text = "Readability app-drawer";
		 modal_header_text_color_text = "App-Drawer text color";
		 modal_header_homescreentext_color_text = "Homescreen text color";
		 ok_t_color_text = "Applay";
		 ok_th_color_text = "Applay";
		 modal_header_apd_text = "App-Drawer:";
		 modal_header_ormode_text = "Choose orientation";
		 modal_ormode_l_text = "left";
		 modal_ormode_r_text = "right";
		 modal_header_homescreen_icon_text = "Homescreen icons";
		 modal_homescreen_icon_r_text = "Cube";
		 modal_homescreen_icon_k_text = "None";
		 modal_header_read_text = "Readability";
		 modal_header_clock_pos_text = "Clock position";
		 btn_applay_clock_pos_text = "Applay";
		 modal_header_clock_settings_text = "Clock setting";
		 modal_clock_show_text = "Display";
		 modal_sec_show_text = "Show seconds";
		 modal_hour_show_text = "Show bold hours";
		 modal_date_show_text = "Show date";
		 clock_showing_true = "Is displayed";
		 clock_showing_false ="Is not displayed";
		 bg_color_text = "Color";
		 bg_img_text = "Image";
		 modal_header_lang_text = "Language";
		 modal_header_lang_text2 = "Select language";
		 modal_lang_ger_text = "German";
		 modal_lang_eng_text = "English";
		 current_lang = "English";
		 settings_hs_sp_text = "Homescreen columns";
		 settings_hs_sp_text_header = "Select homescreen columns";
		 font_size_text = "Fontsize";
		 font_cat_text = "Category title";
		 font_app_text = "App Names";
		 font_homescreen_text = "Homescreen clock";
		 text_navbar_complete_transparent = "Complete";
		 header_navbar_text = "Navigation bar transparency";
		 text_navbar_none_transparent = "None";
		 text_pad_top_input = "Padding top";
		 settings_homescreeen_notification_text = "Homescreen notifications";
		 text_pad_bottom_input = "Padding button";
		 text_settings_app_drawer = "App-drawer settings";
		 text_app_drawer_hori = "Columns (When horizontal)";
		 text_app_drawer_verti = "Columns (When vertical)";
		 text_homescreensettings_drawer = "Homescreen settings";
		 text_homescreen_zeilen = "Rows";
		 text_homescreen_spalten = "Columns";
		 cat_settings_text = "App categories";
		 cat_default_text = "Default";
		 cat_custom_text = "Custom";
		 cat_icon_size_text = "Icon size";
		 header_icon_source_text = "Icon source";
		 btn_orginal_icon_text = "Orginal";
		 btn_gallery_icon_text = "From gallery";
		 btn_symbol_icon_text = "From symbol pack";
		 header_select_icon_pack = "Select pack";
		 header_select_icon_from_iconpack_text = "Select icon";
		 header_iconpack_choose_text = "Select icon pack";
		 default_string = "Default";
		 progress_info_string = "Apply...";
		 extra_text_string = "Additional";
		 export_string = "Export settings";
		 import_string = "Import settings";
		 add_new_catbtn_string = "Add a new cat";
		 resortapplist_string = "Resort app list";
		 ask_resport_string = "Attention! The app sorting is discarded!";
		 resort_btn_string = "Sort";
		 abort_btn_string = "Abort";
		 resort_error_string = "Resort only works with default categories";
		 export_msg_string = "Settings are exported to standard storage";
		 appdrawer_align_string = "Alignment";
		 aling_left_string = "Left";
		 aling_right_string = "Right";
		 swipe_header_string = "Swipe direction";
		 settings_appdrawericonsize_string = "Icon size";
		 sort_apps_new_string = "Apps are sorted new";
		 modal_border_show_string = "Background";
		 del_cat_text = "Delete";
		 notifi_allow_string = "Allow LukeLauncher in order to recive notifications";
		 notifi_allow_ok_string = "Ok";
		 no_iconpack_installed_string = "No icon pack installed!";
		 overwrite_import_string = "Attention! The existing settings will be overwritten!";
		 import_btn_string = "Import";
		 btn_bottomzero_string = "Padding bottom 0 when horizontal";
		 msg_success = "Success!";
		 modal_alarm_clock_text = "Show alarm";
		 next_day_string = "Tomorrow";
		 warn_sort_cat_string = "From now on Apps won't be sorted automatically!";
		 font_string = "Typeface";
		 font_select_string = "Select typeface:";
		 orient_text = "Orientation";  
		 orient_auto = "Automatic";
		 orient_horizontal = "Horizontal";
		 orient_vertical = "Vertical";
		 expand_notification_text = "Gesture to expand statusbar";
		 
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

	}
	else
	{
		 //German
		 info_text1 = "Erstellt von Lukas Sökefeld";
		 info_text2 = "Version:";
		 info_text3 = "Mehr Information:";
		 text_pad_top_input = "Abstand oben";
		 font_size_text = "Schriftgröße";
		 hidden_apps_text = "Versteckte Apps";
		 settings_navbar_text = "Transparente Navigationsleiste";
		 settings_statusbar_text = "Statusbar anzeigen";
		 settings_update_app_list_text = "App-liste aktualisieren";
		 app_list_updated = "App-liste wurde aktualisiert!";
		 removehomescreen_string = "Entfernen von Startbildschirm";
		 result_string = "Ergebnisse";
		 move_apps_text = "Apps verschieben";
		 settings_error_string = "Fehler! Einstellungen!";
		 settings_text_date_app = "Datum App";
		 settings_text_clock_app = "Uhr App";
		 search_place_holder = "Suche...";
		 app_order_li = "Sortieren A-Z";
		 app_move_li = "Apps verschieben";
		 hide_app_li = "Versteckte Apps";
		 settings_li = "Einstellungen";
		 rename_app = "Umbenennen";
		 start_app = "Starten";
		 add_app_to_homescreen_text = "Hinzufügen - Startbildschirm";
		 rm_app_from_homescreen_text = "Entfernen - Startbildschirm";
		 hide_app_text = "Verstecken";
		 show_app_text = "Anzeigen";
		 app_unin = "Deinstallieren";
		 settings_header = "Einstellungen";
		 settings_homescreen_icons_text = "Startbildschirm Icons";
		 settings_appdrawer_text = "App-Übersicht Art";
		 settings_icon_type_text = "App-Übersicht Icons Schwarz/Weiß";
		 settings_icon_type_homescreen_text = "Schwarz/Weiß Startbildschirm Icons";
		 settings_homescreen_day_time_text = "Zeit/Datum Startbildschirm";
		 settings_text_color_text = "Text Farbe App-Übersicht";
		 settings_text_colorhome_text = "Text Farbe Startbildschirm";
		 settings_read_text = "Lesbarkeit App-Übersicht";
		 modal_header_text_color_text = "App-Übersicht Text Farbe";
		 modal_header_homescreentext_color_text = "Startbildschirm Text Farbe";
		 ok_t_color_text = "Anwenden";
		 ok_th_color_text = "Anwenden";
		 modal_header_apd_text = "App-Übersicht:";
		 modal_header_ormode_text = "Kategorien Position";
		 modal_ormode_l_text = "links";
		 modal_ormode_r_text = "rechts";
		 modal_header_homescreen_icon_text = "Startbildschirm Icons";
		 modal_homescreen_icon_r_text = "Rechteckig";
		 modal_homescreen_icon_k_text = "Keine";
		 modal_header_read_text = "Lesbarkeit";
		 modal_header_clock_pos_text = "Position der Uhr";
		 btn_applay_clock_pos_text = "Anwenden";
		 modal_header_clock_settings_text = "Uhr Einstellungen";
		 modal_clock_show_text = "Darstellen";
		 modal_sec_show_text = "Sekunden anzeigen";
		 modal_hour_show_text = "Stunden fett anzeigen";
		 modal_date_show_text = "Datum anzeigen";
		 clock_showing_true = "Wird angezeigt";
		 clock_showing_false ="Wird nicht angezeigt";
		 bg_color_text = "Farbe";
		 bg_img_text = "Bild";
		 modal_header_lang_text = "Sprache";
		 modal_header_lang_text2 = "Sprache auswählen";
		 modal_lang_ger_text = "Deutsch";
		 modal_lang_eng_text = "Englisch";
		 current_lang = "Deutsch";
		 settings_hs_sp_text = "Startbildschirm Spalten";
		 settings_hs_sp_text_header = "Startbildschirm Spalten auswählen";
		 font_cat_text = "Kategorien Titel";
		 font_app_text = "App Namen";
		 font_homescreen_text = "Startbildschirm Uhr";
		 header_navbar_text = "Navigationsleiste Transparenz:";
		 text_navbar_complete_transparent = "Komplett";
		 text_navbar_none_transparent = "Keine";
		 settings_homescreeen_notification_text = "Startbildschirm Benachrichtigungen";
		 text_pad_bottom_input = "Abstand unten";
		 text_settings_app_drawer = "App-Übersicht";
		 text_app_drawer_hori = "Spalten (Wenn Horizontal)";
		 text_app_drawer_verti = "Spalten (Wenn Vertikal)";
		 text_homescreensettings_drawer = "Startbildschirm";
		 text_homescreen_zeilen = "Zeilen";
		 text_homescreen_spalten = "Spalten";
		 cat_settings_text = "App Kategorien";
		 cat_default_text = "Standard";
		 cat_custom_text = "Angepasst";
		 cat_icon_size_text = "Icon Größe";
		 header_icon_source_text = "Icon Quelle";
		 btn_orginal_icon_text = "Orginal";
		 btn_gallery_icon_text = "Aus Gallerie";
		 btn_symbol_icon_text = "Aus Symbol Paket";
		 header_select_icon_pack = "Paket wählen";
		 header_select_icon_from_iconpack_text = "Icon wählen";
		 header_iconpack_choose_text = "Icon-pack wählen";
		 default_string = "Standard";
		 progress_info_string = "Wende an...";	
		 extra_text_string = "Weiteres";
		 export_string = "Einstellungen exportieren";
		 import_string = "Einstellungen importieren";
		 add_new_catbtn_string = "Neue Kategorie hinzufügen";
		 resortapplist_string = "Appliste neu sortieren";
		 ask_resport_string = "Achtung! die bestehende App-Sortierung wird verworfen!";
		 resort_btn_string = "Sortieren";
		 abort_btn_string = "Abbrechen";
		 resort_error_string = "Sortieren funktioniert nur bei Standard App Kategorien";
		 export_msg_string = "Einstellungen sind auf Standardspeicher exportiert";	
		 appdrawer_align_string = "Ausrichtung";
		 aling_left_string = "Links";
		 aling_right_string = "Rechts";
		 swipe_header_string = "Geste";
		 settings_appdrawericonsize_string = "Icon Größe";
		 sort_apps_new_string = "Sortiere Apps neu";
		 modal_border_show_string = "Hintergrund";  
		 del_cat_text = "Löschen";
		 notifi_allow_string = "LukeLauncher erlauben, um Benachrichtigungen zu erhalten";
		 notifi_allow_ok_string = "Ok";
		 no_iconpack_installed_string = "Kein Icon pack installiert!";		
		 overwrite_import_string = "Achtung die bestehenden Einstellungen werden überschrieben!";
		 import_btn_string = "Importieren";
		 btn_bottomzero_string = "Abstand unten auf 0, wenn horrizontal";
		 msg_success = "Erfolgreich!";
		 modal_alarm_clock_text = "Alarm anzeigen";
		 next_day_string = "Morgen";
		 warn_sort_cat_string = "Apps werden nun nicht automatisch sortiert!";
		 font_string = "Schriftart";
		 font_select_string = "Schriftart wählen:";
		 orient_text = "Ausrichtung";
		 orient_auto = "Automatisch";
		 orient_horizontal = "Horizontal";
		 orient_vertical = "Vertikal";	
		 expand_notification_text = "Wischen um Statusbar auszuklappen";
		 	  
		if(default_cats==1)
		{
			cat_array = [];
			cat_array = [
			['icons/1.png', "Nachrichten"],
			['icons/2.png', "Internet"],
			['icons/3.png', "Medien"],
			['icons/4.png', "Spiele"],
			['icons/5.png', "Werkzeuge"],
			['icons/6.png', "Einstellungen"]
			];
		}
	}


	document.getElementById("modal_header_clock_settings").textContent = modal_header_clock_settings_text;
	document.getElementById("settings_homescreen").textContent = text_homescreensettings_drawer;
	document.getElementById("modal_header_homescreen_settings").textContent = text_homescreensettings_drawer;
	document.getElementById("modal_header_app_drawer_settings").textContent = text_settings_app_drawer;
	document.getElementById("settings_app_drawer").textContent = text_settings_app_drawer;
	document.getElementById("padding_bottom_input").textContent = text_pad_bottom_input;
	document.getElementById("pad_top_input").textContent = text_pad_top_input;
	document.getElementById("settings_homescreeen_notification").textContent = settings_homescreeen_notification_text;
	document.getElementById("modal_trans_0").textContent = text_navbar_none_transparent;
	document.getElementById("modal_trans_2s").textContent = text_navbar_complete_transparent;
	document.getElementById("modal_header_text_navbar").textContent = header_navbar_text;
	document.getElementById("text_font_cat").textContent = font_cat_text;
	document.getElementById("text_font_appnames").textContent = font_app_text;
	document.getElementById("text_font_homescreen").textContent = font_homescreen_text;
	document.getElementById("modal_header_fontsize").textContent =  font_size_text;
	document.getElementById("settings_font_size").textContent =  font_size_text;
	document.getElementById("settings_navbar").textContent = settings_navbar_text;
	document.getElementById("settings_statusbar").textContent = settings_statusbar_text;
	document.getElementById("settings_update_app_list").textContent = settings_update_app_list_text;
	document.getElementById("removehomescreentext").textContent = removehomescreen_string;
	document.getElementById("modal_header_date").textContent = settings_text_date_app ;
	document.getElementById("modal_header_clock").textContent = settings_text_clock_app ;
	document.getElementById("settings_date_app").textContent = settings_text_date_app ;
	document.getElementById("settings_clock_app").textContent = settings_text_clock_app;
	document.getElementById("sif").placeholder = search_place_holder;
	document.getElementById("searchappselecclock").placeholder = search_place_holder;
	document.getElementById("searchappselecdate").placeholder = search_place_holder;
	document.getElementById("app_order_li").textContent = app_order_li;
	document.getElementById("app_move_li").textContent = app_move_li;
	document.getElementById("hide_app_li").textContent = hide_app_li;
	document.getElementById("settings_li").textContent = settings_li;
	document.getElementById("rnb").textContent = rename_app;
	document.getElementById("btn_start_app").textContent = start_app;
	document.getElementById("btn_homescreen").textContent = add_app_to_homescreen_text;
	document.getElementById("btn_app_aus").textContent = hide_app_text;
	document.getElementById("btn_app_uninstall").textContent = app_unin;
	document.getElementById("settings_text_header").textContent = settings_header;
	document.getElementById("settings_homescreen_icons").textContent = settings_homescreen_icons_text;
	document.getElementById("settings_icon_type").textContent = settings_icon_type_text;
	document.getElementById("settings_icon_type_homescreeen").textContent = settings_icon_type_homescreen_text;
	document.getElementById("settings_homescreen_day_time").textContent = settings_homescreen_day_time_text;
	document.getElementById("settings_text_color").textContent = settings_text_color_text;
	document.getElementById("settings_homescreen_color").textContent = settings_text_colorhome_text;
	document.getElementById("settings_read").textContent = settings_read_text;
	document.getElementById("modal_header_text_color").textContent = modal_header_text_color_text;
	document.getElementById("modal_header_text_colorhomescreen").textContent = modal_header_homescreentext_color_text;
	document.getElementById("modal_homescreen_icon_k").textContent = modal_homescreen_icon_k_text;
	document.getElementById("modal_homescreen_icon_r").textContent = modal_homescreen_icon_r_text;
	document.getElementById("modal_header_read").textContent = modal_header_read_text;
	document.getElementById("modal_clock_show").textContent = modal_clock_show_text;
	document.getElementById("modal_sec_show").textContent = modal_sec_show_text;
	document.getElementById("modal_hour_show").textContent = modal_hour_show_text;
	document.getElementById("modal_date_show").textContent = modal_date_show_text;
	document.getElementById("modal_alarm_clock").textContent = modal_alarm_clock_text;
	
	//From main.js
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
	
	document.getElementById("settings_lang").textContent = modal_header_lang_text;
	document.getElementById("modal_header_lang").textContent = modal_header_lang_text2;
	document.getElementById("modal_lang_ger").textContent = modal_lang_ger_text;
	document.getElementById("modal_lang_eng").textContent = modal_lang_eng_text;
	document.getElementById("settings_current_lang").textContent = current_lang;
	document.getElementById("settings_info_text1").textContent = info_text1;
	document.getElementById("settings_info_text3").textContent = info_text3;
	document.getElementById("settings_cat").textContent = cat_settings_text;
	document.getElementById("cat_dis_0").textContent = cat_default_text;
	document.getElementById("cat_dis_1").textContent = cat_custom_text;
	document.getElementById("modal_header_catdis").textContent = cat_settings_text;
	document.getElementById("header_icon_source_dialog").textContent = header_icon_source_text;
	document.getElementById("btn_orginal_icon").textContent = btn_orginal_icon_text;
	document.getElementById("btn_gallery_icon").textContent = btn_gallery_icon_text;
	document.getElementById("btn_symbol_icon").textContent = btn_symbol_icon_text;
	document.getElementById("header_select_icon_pack").textContent = header_select_icon_pack;	 
	document.getElementById("header_select_icon_from_iconpack").textContent = header_select_icon_from_iconpack_text;	
	document.getElementById("searchiconinpack_input").placeholder = search_place_holder;
	document.getElementById("searchiconinpack_cat_input").placeholder = search_place_holder;

	document.getElementById("header_icon_source_cat").textContent = header_icon_source_text;
	document.getElementById("btn_orginal_cat_icon").textContent = btn_orginal_icon_text;
	document.getElementById("btn_gallery_cat_icon").textContent = btn_gallery_icon_text;
	document.getElementById("btn_symbol_cat_icon").textContent = btn_symbol_icon_text;
	
	document.getElementById("header_icon_select_pack_cat").textContent = header_select_icon_pack ;
	document.getElementById("header_searchiconinpack_cat").textContent = header_select_icon_from_iconpack_text;
	
	document.getElementById("header_iconpack_choose").textContent = header_iconpack_choose_text;	 
		 
	document.getElementById("header_progress_dialog").textContent = progress_info_string;
	document.getElementById("settings_extra_header").textContent = extra_text_string;
		 
	document.getElementById("modal_header_extra_settings").textContent = extra_text_string;
    
    
	document.getElementById("settings_export").textContent = export_string;
	document.getElementById("settings_import").textContent = import_string;
	
	document.getElementById("add_new_cat_button").textContent = add_new_catbtn_string;
	document.getElementById("settings_resortapplist").textContent = resortapplist_string;
		     
	document.getElementById("modal_header_askquestion_settings").textContent = ask_resport_string;
	
	document.getElementById("btn_resort_start").textContent = resort_btn_string;
	document.getElementById("btn_resort_abort").textContent = abort_btn_string;	     

	document.getElementById("settings_appdrawer_align").textContent = appdrawer_align_string;
	document.getElementById("modal_header_align").textContent = appdrawer_align_string;
	
	document.getElementById("settings_appdrawer_swipe").textContent =  swipe_header_string;

	document.getElementById("settings_appdrawericonsize").textContent = settings_appdrawericonsize_string;

	document.getElementById("modal_border_show").textContent = modal_border_show_string;
	
	document.getElementById("modal_header_notifi_allow").textContent = notifi_allow_string;

	document.getElementById("btn_notifi_allow").textContent = notifi_allow_ok_string;
	
	document.getElementById("modal_header_askimport_settings").textContent = overwrite_import_string;
	
	
	document.getElementById("btn_import_start").textContent = import_btn_string;
	document.getElementById("btn_import_abort").textContent = abort_btn_string;
	
	document.getElementById("padding_bottom_input_set_zero").textContent = btn_bottomzero_string;
	
	document.getElementById("settings_text_font_appdrawer").textContent = font_string;
	document.getElementById("modal_header_text_font_appdrawer").textContent = font_select_string;
	
	document.getElementById("settings_text_font_homescreen").textContent = font_string;
	document.getElementById("modal_header_text_font_homescreen").textContent = font_select_string;
	
	document.getElementById("normal_font_appdrawer_item").textContent = default_string;
	document.getElementById("normal_font_homescreen_item").textContent = default_string;
	
	document.getElementById("settings_orient").textContent = orient_text;
	document.getElementById("modal_header_orient").textContent = orient_text;
	
	document.getElementById("modal_orient_auto").textContent = orient_auto;
	document.getElementById("modal_orient_horizontal").textContent = orient_horizontal;
	document.getElementById("modal_orient_vertical").textContent = orient_vertical;
	
	document.getElementById("settings_notification_expand_text").textContent = expand_notification_text;
		 
	if(current_kat!=-1)
	{
		if(current_kat > cat_array.length)
		{
			current_kat = 1;
		}
		document.getElementById("Cat_name_text").textContent = cat_array[current_kat-1][1];// kat_list[current_kat];
	}
}

