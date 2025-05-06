// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-04-30
// @description  try to take over the world!
// @author       You
// @match        https://play.typeracer.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=typeracer.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';



 
    //add icons
    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(fa);
    

    const DEBUG = true;

    const styles = document.createElement("style");
    styles.textContent = `
    .inputContainer{
    display: flex;
    text-align: center;
    align-items: center;
    }
    .paletteSearchIcon{
        justify-content: center;
    }
    .suggestionContainer{
       display: flex;

        text-align: center;
        padding: .3rem;
         user-select: none;


    }
         .fas.fa-fw.fa-chevron-right.chevronIcon{
             margin-left: 1rem;
             margin-top: 2px;
         }
    .suggestionContainer:hover{
         background: #d1d0c5;
    }
    .categoryDiv{margin-left: 1rem;}
    .valueDiv {
        margin-left: 6rem;
    }
    .paletteArrow{
        margin-left: 1rem;
    }
    #font-roboto >.valueDiv{
        font-family: roboto;

    }
    #font-sans-serif >.valueDiv:{
        font-family: 'sans serif';
    }

.paletteIcon{
width: 23px;
height: 12.8px;
}
.paletteCheck{
    
    }
    .inputValuePanel > input{
           font-family: Roboto;
    background: inherit;
    border: none;
    color: rgb(100, 102, 105);

    }
    .paletteSearchIcon{
        color:rgb(100, 102, 105) !important; 
        width: 20px;
        height: 16px;
        
    }
        .fas.fa-fw.fa-search{
         color:rgb(100, 102, 105) !important; 
          margin-left: 6px; 
          width: 20px;
          height: 16px;
        
    font-weight: 900;
        }

        .inputSettingsList{
            max-height: calc(100vh - 15rem);
            overflow-y: scroll;
                scrollbar-width: thin;
               scrollbar-color: rgb(100, 102, 105) transparent
               

        }
               .palette{
               max-height: calc(100vh - 15rem);
               }
body > div.DialogBox.trPopupDialog.ChangeThemePopup{
opacity: 0}

`






    document.head.appendChild(styles);
    //https://play.typeracer.com/redesign/images/themes/base/banner.svg


// ======================
// 🧠 Logic & Utilities
// ======================

    function getObjectFromId(id) {




        for (const [category, value] of Object.entries(paletteSuggestions)){
            for (const [innerKey, innerValue] of Object.entries(value)){
             const _id = innerValue.id;
             if(_id == id){
                return innerValue;
             }
            }
        }
        return;
    }

    // ============================================
// 🧠  UI Building functions
// ============================================
function createInputValuePanel() {
    const inputValuePanel = document.createElement('div');
    inputValuePanel.style.position = 'fixed';
    inputValuePanel.style.top = '20%';
    inputValuePanel.style.left = '50%';
    inputValuePanel.style.transform = 'translateX(-50%)';
    inputValuePanel.style.background = 'white';
    inputValuePanel.style.padding = '10px';
    inputValuePanel.style.zIndex = '10002';
    inputValuePanel.style.display = 'none';
    inputValuePanel.style.minWidth = '400px';
    inputValuePanel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    inputValuePanel.style.flexDirection = 'column';
    inputValuePanel.style.background = "#333438";
    inputValuePanel.style.borderRadius = ".5rem";
    inputValuePanel.style.width = "30rem";
    inputValuePanel.style.color = "#323437";
    inputValuePanel.className = "inputValuePanel";

    const input = document.createElement("input");
    inputValuePanel.appendChild(input);
    return inputValuePanel;
}

    function createPalette() {
        const palette = document.createElement('div');
        palette.style.position = 'fixed';
        palette.style.top = '20%';
        palette.style.left = '50%';
        palette.style.transform = 'translateX(-50%)';
        palette.style.background = 'white';
        palette.style.padding = '10px';
        palette.style.zIndex = '10001';
        palette.style.display = 'none';
        palette.style.minWidth = '300px';
        palette.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        palette.style.display = 'none';
        palette.style.flexDirection = 'column';
        palette.style.background = "#333438";
        palette.style.borderRadius = ".5rem";
        palette.style.width = "37rem";
        palette.style.color = "#323437";
        palette.className = "palette";
        return palette;
    }





    function createPaletteInputBox() {
        const searchIcon = document.createElement("div");
        searchIcon.innerText = "🔎";
        searchIcon.className = "paletteSearchIcon";
        searchIcon.style.color = "rgb(100, 102, 105)";
        const favIcon = document.createElement("i");
        favIcon.style.width = "20px";
        favIcon.style.height = "16px";
        favIcon.className = "fas fa-fw fa-search";
        favIcon.style.color = "rgb(100, 102, 105)";
        
        //searchIcon.appendChild(favIcon);
        const inputContainer = document.createElement("div");
        inputContainer.className = "inputContainer";
        //const searchIcon = document.createElement("")
    

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type a command...';
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.fontSize = '16px';
        input.style.boxSizing = 'border-box';
        input.className = "paletteInput";
        input.placeholder = "Search...";
        input.style.background = "#333438";
        input.style.border = "none";
        input.style.outline = "none";
        input.style.color = "#d1d0c5";
        inputContainer.appendChild(favIcon);
        inputContainer.appendChild(input);
        return inputContainer;
    }


    function createPaletteList() {
        const inputSettingsList = document.createElement("ul");
        inputSettingsList.className = "inputSettingsList";
        inputSettingsList.height = 'auto';
        inputSettingsList.minHeight = "0";
        inputSettingsList.style.paddingLeft = "0px";
        inputSettingsList.style.display = 'flex';
        inputSettingsList.style.flexDirection = 'column';
        inputSettingsList.style.marginTop = "0px";
        inputSettingsList.style.color = "#646669";
        return inputSettingsList;
    }

    //=================
    // 🧠 MAIN UI ELEMENT CREATION
    //=================
    var palette = createPalette(); //Box that contains the commands and search box etc.
    var paletteInput = createPaletteInputBox();
    var paletteList = createPaletteList(); //represents an unordered list with unique commands (suggestions)
    var inputValuePanel = createInputValuePanel();
    

    palette.appendChild(paletteInput);
    palette.appendChild(paletteList);
    document.body.appendChild(palette);
    document.body.appendChild(inputValuePanel);

// ============================================
// 🧠 Set command handlers
// ============================================
    function setFontHandler(font) {
        const exclude = document.querySelector('.inputSettingsList');
        const exclude2 = document.querySelector(".inputContainer > i");

        // Get all elements
        const allElements = document.querySelectorAll('*');

        allElements.forEach(el => {
            // Skip if the element is the excluded one, its children, or its ancestors
            if (
                el === exclude || el == exclude2 ||
                exclude.contains(el) || exclude2.contains(el) ||
                el.contains(exclude) || el.contains(exclude2)
            ) return;

            el.style.fontFamily = font;
        });
    }

    function setBackgroundHandler(value) {

            document.querySelector("#universe-background").style.display = value;
            console.log("BACKGROUND REMOVE ACTIVATED SOMEHOW");

    }

    function setDefaultThemeHandler(theme, panelOpened = false) {
       
        if (!panelOpened) {
            const allAnchors = document.querySelectorAll(".gwt-Anchor");
            const themeOptionsButton = document.querySelector('.OptionsWrapper .OptionsWidget li:nth-child(3) a');
            const themeDialogButton = document.querySelector('#dUI .mainViewport tr:nth-child(5) td ul li:nth-child(3) a');
            const themeButtons = [themeOptionsButton, themeDialogButton].filter(button => button);
            const themeAnchor = Array.from(allAnchors).filter(anchor => anchor?.previousSibling?.textContent.includes("Theme"));
            const themePopup = document.querySelector("body > div.DialogBox.trPopupDialog.ChangeThemePopup");
            
          //  themePopup?.style?.visibility = "hidden";
          
          if (themePopup && themePopup.style) {
            themePopup.style.opacity = "0";
          }
            
            console.log(allAnchors);
            let radioButtons;
            if (themePopup ) {
         
                 //  themePopup exists, do nothing for now,  you can add logic here if needed
                 radioButtons = document.querySelectorAll("input[type='radio']");
                 let filteredButtons =  Array.from(radioButtons).filter(button => button);
                 filteredButtons.forEach((btn)=>{
                  
                    if(btn.nextSibling.children[0].textContent.toLowerCase().includes(theme) ){
                            if(!btn.checked){
                                btn.click();
                                return;
                            }
                            else{
                                console.log("You have selected this theme already.");
                                document.querySelector("body > div.DialogBox.trPopupDialog.ChangeThemePopup > div > div > div.xButton").click();
                            }
                    }
                 })
            }
            else if (themeAnchor.length > 0) {
                themeAnchor[0].click(); // brings up the theme panel
                setTimeout(() => {
                    
                    setDefaultThemeHandler(theme);
                }, 100);
                
            } else {
                setTimeout(() => {
                    
                    setDefaultThemeHandler(theme);
                }, 100);
            }
        }
    }
    
    function setLanguageHandler(targetLanguage) {
        
        const href = languages[targetLanguage];
        if(window.location.href !== href){
            window.location.href = href;
        }


        
      }
// ============================================
// 🧠 State, default settings and palette suggestion dictionaries. This stores important information.
// ============================================
var state = {
    activePaletteCommand: "",
    enabledPaletteCommands: {



    },
    currentPage: "",
    racing: false,
    racingFontSize: null,



}

function populateStateEmptyArrays  (){
    for (const [key, value] of Object.entries(paletteSuggestions)){

        if(key){

            state.enabledPaletteCommands[key] = [];
        }
    }
    console.log(state);
}

const valueTypes = ["font size"]; //values that will open the value panel

    const defaultSettings = {

        font: {
            value: "Lato, sans-serif",

            handler: () => {

                setFontHandler(defaultSettings.font.value)
                updateLocalStorage("font", null, true);
            }
        },
        background: {
            url: "url(https://play.typeracer.com/redesign/images/themes/base/banner.svg)",
            linearGradient: "linear-gradient(180deg, rgba(143, 171, 198, 0.6) 60%, #eee 90%)",
            handler: () => {
                document.querySelector("#universe-background").style.display = "block";
                document.querySelector("#universe-background").style.backgroundImage =
                    'linear-gradient(180deg, rgba(143, 171, 198, 0.6) 60%, #eee 90%), url(https://play.typeracer.com/redesign/images/themes/base/banner.svg)';
                    updateLocalStorage("background", null, true);
            },

        },
        theme:{
            handler: () => {
                //setDefaultThemeHandler("responsive");
                //localStorage("background") typeracer sets this by default, not necessary
                window.location.reload();
            }
        }
    }
    //A suggestion can either be
    //1. Toggleable boolean type -- On or Off
    //2. Insertable value type -- 12px, 13px, 14px.. etc
    //3. Non-insertable and non-toggleable type, for example going to a certain page, practice race etc.

    //Template of a suggestion
    //category : {
         //value: {
             //type: "",
             //handler: () => "",
             //id: "",
             //
         //}

//   }
var paletteSuggestions = {
    theme: {
        dark: {
            type: "toggle",
            id: "theme-dark",
            handler: () => setDefaultThemeHandler("dark")
        },


        responsive: {
            type: "toggle",
            id: "theme-responsive",
            handler: () => setDefaultThemeHandler("responsive")
        },
        classic: {
            type: "toggle",
            id: "theme-classic",
            handler: () => setDefaultThemeHandler("classic")
        },
    },

    font: {
        roboto: {
            type: "toggle",
            id: "font-roboto",
            handler: () => setFontHandler("Roboto"),

        },
        "sans serif": {
            type: "toggle",
            id: "font-sans-serif",
            handler: () => setFontHandler("Sans serif")
        },
        helvetica: {
            type: "toggle",
            id: "font-helvetica",
            handler: () => setFontHandler("Helvetica")
        },

    },

    background: {
        none: {
            type: "toggle",
            id: "background-none",
            handler: () => {
                setBackgroundHandler("none");
                updateLocalStorage("background", "none");
            }
        }
    },

    "font size": {
        size: {
            type: "value",
            id: "font-size",

            handler: (number) => {

                if (!number.includes("px")) {
                    number += "px";
                }
                document.querySelectorAll('*').forEach(element => {
                    element.style.fontSize = number;
                });
                updateLocalStorage("font size", number);
            }
        }
    },
    "enter race":{
        practice:{
            type:"action",
            id: "practice-race",
            handler: () => "",
        }
    },
    "font size in race":{
        size:{
            type: "value",
            id: "font-size-in-race",
            handler:((number)=>{
                if (!number.includes("px")) {
                    number += "px";
                    updateLocalStorage("font size in race", number);
                }
                state.racingFontSize = number;

            })
        }
    },

};


//Use this to create a custom palette object internally on the fly.
 //A suggestion can either be
    //1. Toggleable boolean type -- On or Off
    //2. Insertable value type -- 12px, 13px, 14px.. etc
    //3. Non-insertable and non-toggleable type, for example going to a certain page, practice race etc.

    //Template of a suggestion
    //category : {
         //value: {
             //type: "",
             //handler: () => "",
             //id: "",
             //
         //}

//   }
function addPaletteSuggestion(palette, category, key, value) {

    if (palette.hasOwnProperty(category)) {
      palette[category][key] = value;
    } else {
      palette[category] = { [key]: value };
    }
    console.log(paletteSuggestions);
  }
  

  const languages = 
    {
        "English": "https://play.typeracer.com/?universe=play",
        "Japanese": "https://play.typeracer.com/?universe=lang_ja",
        "Arabic": "https://play.typeracer.com/?universe=lang_ar",
        "Korean": "https://play.typeracer.com/?universe=lang_ko",
        "Chinese": "https://play.typeracer.com/?universe=lang_zh-tw",
        "Malay": "https://play.typeracer.com/?universe=lang_ms",
        "Polish": "https://play.typeracer.com/?universe=lang_pl",
        "Croatian": "https://play.typeracer.com/?universe=lang_hr",
        "Portuguese": "https://play.typeracer.com/?universe=lang_pt",
        "Romanian": "https://play.typeracer.com/?universe=lang_ro",
        "French": "https://play.typeracer.com/?universe=lang_fr",
        "Russian": "https://play.typeracer.com/?universe=lang_ru",
        "German": "https://play.typeracer.com/?universe=lang_de",
        "Spanish": "https://play.typeracer.com/?universe=lang_es",
        "Hindi": "https://play.typeracer.com/?universe=lang_hi",
        "Thai": "https://play.typeracer.com/?universe=lang_th",
        "Hungarian": "https://play.typeracer.com/?universe=lang_hu",
        "Turkish": "https://play.typeracer.com/?universe=lang_tr",
        "Indonesian": "https://play.typeracer.com/?universe=lang_id",
        "Ukrainian": "https://play.typeracer.com/?universe=lang_uk",
        "Italian": "https://play.typeracer.com/?universe=lang_it",
        "Vietnamese": "https://play.typeracer.com/?universe=lang_vi",
        "Afrikaans": "https://play.typeracer.com/?universe=lang_af",
        "Latvian": "https://play.typeracer.com/?universe=lang_lv",
        "Albanian": "https://play.typeracer.com/?universe=lang_sq",
        "Lithuanian": "https://play.typeracer.com/?universe=lang_lt",
        "Belarusian": "https://play.typeracer.com/?universe=lang_be",
        "Macedonian": "https://play.typeracer.com/?universe=lang_mk",
        "Bulgarian": "https://play.typeracer.com/?universe=lang_bg",
        "Maltese": "https://play.typeracer.com/?universe=lang_mt",
        "Catalan": "https://play.typeracer.com/?universe=lang_ca",
        "Norwegian": "https://play.typeracer.com/?universe=lang_no",
        "Czech": "https://play.typeracer.com/?universe=lang_cs",
        "Persian": "https://play.typeracer.com/?universe=lang_fa",
        "Danish": "https://play.typeracer.com/?universe=lang_da",
        "Serbian (Cyrillic)": "https://play.typeracer.com/?universe=lang_sr",
        "Estonian": "https://play.typeracer.com/?universe=lang_et",
        "Serbian (Latin)": "https://play.typeracer.com/?universe=lang_sr-latn",
        "Filipino": "https://play.typeracer.com/?universe=lang_tl",
        "Slovak": "https://play.typeracer.com/?universe=lang_sk",
        "Finnish": "https://play.typeracer.com/?universe=lang_fi",
        "Slovenian": "https://play.typeracer.com/?universe=lang_sl",
        "Galacian": "https://play.typeracer.com/?universe=lang_gl",
        "Swahili": "https://play.typeracer.com/?universe=lang_sw",
        "Greek": "https://play.typeracer.com/?universe=lang_el",
        "Swedish": "https://play.typeracer.com/?universe=lang_sv",
        "Hebrew": "https://play.typeracer.com/?universe=lang_he",
        "Welsh": "https://play.typeracer.com/?universe=lang_cy",
        "Irish": "https://play.typeracer.com/?universe=lang_ga",
        "Yiddish": "https://play.typeracer.com/?universe=lang_yi"
      }
  
  console.log(paletteSuggestions);




for(const [key, value] of Object.entries(languages)){
   
    addPaletteSuggestion(paletteSuggestions, "language", key.toLowerCase(), {
        type: "toggle",
        id: "language-"+key.split(" ").join("-").toLowerCase(),
        handler: () => setLanguageHandler(key),
      
      
    })
}
populateStateEmptyArrays();

// ============================================
// 🧠 Local storage handling
// ============================================

const storageSettingsObject = localStorage.getItem("paletteSettings");
if(!storageSettingsObject){
    localStorage.setItem("paletteSettings", JSON.stringify({}));
}
    function setStateFromLocalStorage() {

        const localStorageObject = localStorage.getItem("paletteSettings");

        const localStorageObjectParsed = JSON.parse(localStorageObject);

        //debugger;

        for (const [key, value] of Object.entries(paletteSuggestions)) {


            const value = localStorageObjectParsed[key]; //id for toggle types;
            if(!value){continue;}
            const paletteKey = paletteSuggestions[key];
            const category = Object.keys(paletteKey)[0];
            const paletteValue = paletteSuggestions[key][category];
            const type = paletteValue.type;

            if(type == "value"){
                let handler = getObjectFromId(paletteValue.id).handler;
                handler(value);
                continue;
            }


            //id for toggle types


            state.enabledPaletteCommands[key].push(value);
            const handler = getObjectFromId(value).handler;

            handler();

        }
    }

    function updateLocalStorage(key, newValue, remove=false) {

        // Remove existing item
        //localStorage.removeItem(key);

        // Add new item
        const currentStorageObject = localStorage.getItem("paletteSettings");
        const currentStorageParsed = JSON.parse(currentStorageObject);

        if(remove){
            delete currentStorageParsed[key];
        }
        else{
            currentStorageParsed[key] = newValue;
        }
        localStorage.setItem("paletteSettings", JSON.stringify(currentStorageParsed));

    }




  /* ============================================
 * 🔍 Misc
 * ============================================ */
     function blurBackground(){
        const background = document.querySelector(".flex-wrapper ") || document.querySelector(".main");
        background.style.filter = "blur(1px)";
    }
    function removeBlur(){
        const background = document.querySelector(".flex-wrapper ") || document.querySelector(".main");
        background.style.filter = "";
    };


   /* ============================================
 * 🔍 Module: Palette input handling
 * ============================================ */
   const icon = "https://img.icons8.com/?size=10&id=54685&format=png&color=000000";

   function setIcons(key){
    const category = key.category;
    
    
    if(category == "font" || category == "font size in race" || category == "font size"){
        key.icon = "fas fa-fw fa-font"
        
    }
    else if(category == "theme"){
         key.icon = "fas fa-fw fa-palette"
         
    }
    else if(category == "background"){
        key.icon = "fas fa-fw fa-image";
         
    }
    else if(category == "language"){
        key.icon = "fas fa-fw fa-language"
    }
    else if (category == "enter race"){
        key.icon = "fas fa-fw fa-gamepad";
    }
    else{
        key.icon = "";
        key.imgUrl = ""
    }
   }
   function getSearchedSettings(search){

    const matches = [];

   for (const [category, value] of Object.entries(paletteSuggestions)){
    console.log(`Category: ${category} and value: ${value}`);
        for (const [innerKey, innerValue] of Object.entries(value)){
            console.log(`InnerKey: ${innerKey}, innerValue: ${innerValue}`);
            if(innerKey.startsWith(search)||category.startsWith(search)){
                innerValue.category = category; //adds a category to it for use later
                setIcons(innerValue);
                const returnObject = {
                    [innerKey]: innerValue
                }
                matches.push(returnObject);

            }
     }
    }
    console.log(matches);
    return matches;
}


    function handlePaletteInput(e) {
        console.log(state);
        let search = e.target.value;
        search.toLowerCase();
        if (DEBUG) {
            console.log(`handlePaletteInput: search is ${search}`);
        }

        let suggestions = getSearchedSettings(search);
        console.log("handlePaletteInput: This is passed to Display: suggestions = " + JSON.stringify(suggestions, null, 2));

        displaySuggestions(suggestions);

    }
   //

// ============================================
// 🧠 Base event handlers and observers
// ============================================
    document.querySelector(".paletteInput").addEventListener("input", (e) => {
        handlePaletteInput(e)
    });
    document.querySelector("body").addEventListener("click",(e)=>{
           if(!document.querySelector(".inputValuePanel").contains(e.target) && !document.querySelector(".palette").contains(e.target)){
            closeValuePanel()
           }
           if(!document.querySelector(".palette").contains(e.target) && document.querySelector(".palette").style.display !== "none"){
            closePalette();
           }

    } );
    document.querySelector(".inputValuePanel > input").addEventListener("keydown",(e)=>{
        if(e.key == "Enter"){

            const panel = document.querySelector(".inputValuePanel");
            const id = panel.className.split(" ")[1];

            const handler =  getObjectFromId(id).handler;
            closeValuePanel();
            const fontSize = document.querySelector(".inputValuePanel > input").value;

            if(!isNaN(parseInt(fontSize))){
                handler(fontSize);
            }


        }
        console.log(e);

 } );


    // Listen for Ctrl+Shift+P
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            togglePalette();
        }
        // ESC to close
        if (e.key === 'Escape' && palette.style.display === 'flex') {
            closePalette();
        }
    });

    setStateFromLocalStorage();

    // Detecting game status
var observer = new MutationObserver(() => {

    // Modified from github.com/PoemOnTyperacer/tampermonkey/blob/master/pacemaker.user.js lines 321-339 tyyyy :)
    let gameStatusLabels = null ?? document.getElementsByClassName('gameStatusLabel');
    let gameStatus = ((gameStatusLabels || [])[0] || {}).innerHTML || '';
    console.log(gameStatusLabels);
    
    if(gameStatusLabels?.[0]?.textContent=="Go!" || gameStatusLabels?.[0]?.textContent == 'The race is on! Type the text below:'){
  
        const t = document.querySelector("#dUI > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div.mainViewport > table > tbody > tr:nth-child(3) > td > div > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").nextSibling.nextSibling;



let parent = t.children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];


        state.racing = true;
        if(state.racingFontSize && parent?.style?.fontSize !== state.racingFontSize ){
          


                parent.style.fontSize = state.racingFontSize;

        }
    }
    else{

        state.racing = false;
    }


    }


);
observer.observe(document, {childList: true, subtree: true});
// ============================================
// 🧠 Palette suggestion UI element creation
// ============================================
function createListItem(category, value, handler, id, iconChar, type, imgUrl){

    const enabledCommands = state.enabledPaletteCommands[category];
    const container = document.createElement("li");
    container.className = "suggestionContainer";
    container.id = id;
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "categoryDiv";
    categoryDiv.innerText = category;
    const valueDiv = document.createElement("div");
    valueDiv.className = "valueDiv";
    if(type!=="value"){
        valueDiv.innerText = value;
    }

    const arrow = document.createElement("i");
    arrow.className = "fas fa-fw fa-chevron-right chevronIcon";
    arrow.style.width = "15px";
    arrow.style.height = "12px";
    arrow.style.marginTop = "2px";

    const icon = document.createElement("i");
    icon.className = iconChar; // Gear icon
    icon.style.width = "23px";
    icon.style.height = "12px";
    //document.body.appendChild(_icon);
    
    


    container.appendChild(icon);
    container.appendChild(categoryDiv);
    container.appendChild(arrow);

    console.log(`I just appended ${icon.TEXT_NODE}, ${categoryDiv.tagName}, and ${arrow.ELEMENT_NODE} to the palette`);


    if (enabledCommands.includes(id)) { //if there is already an enabled command when we are typing, display a checkbox.
        addCheck(container);
    }


    container.appendChild(valueDiv);
    return container;

}
function addCheck(element) {

    const checkBox = document.createElement("i");
    checkBox.className = "paletteCheck fas fa-fw fa-check";
    checkBox.style.width = '15px';
    checkBox.style.height = "12px"
   // checkBox.style.marginRight = "7rem";
   if(element.querySelector(".paletteCheck")){
    element.querySelector(".paletteCheck").style.visibility = "visible";
    return;
   }
    
    element.appendChild(checkBox);
}

    function createSuggestion(category, value, handler, id, iconChar, type, imgUrl) {
        const enabledCommands = state.enabledPaletteCommands[category];

        const container = createListItem(category, value, handler, id, iconChar, type, imgUrl);

        function deleteCheck(ID = id) {
            console.log(`DeleteCheck ID = ${ID}`);
            let i = 0;
            enabledCommands.forEach((el) => {
                if (el == ID) {
                    enabledCommands.splice(i, 1);
                }
                i++;
            })
           
            document.querySelector("#" + ID + " > .paletteCheck").style.visibility = "hidden";
        }
        console.log(`createSuggestion: parameters are : category: ${category}, value:${value}, id:${category},icon: ${iconChar}`);





        container.addEventListener("mouseover", () => {})
        container.addEventListener("click", () => {

            if(type == "value"){
                //should override functionality and display a box instead.

                openValuePanel(id);
                return 0;

            }
            else if(type == "action"){

            }
            else{
                const inputBox = document.querySelector(".paletteInput");
                inputBox.focus();


           const commandNotEnabled = !enabledCommands.includes(id);
            if (commandNotEnabled) {

                const numSameCategoryCommandsEnabled  = enabledCommands.filter(item => item !== null).length;
                if (numSameCategoryCommandsEnabled > 0) {

                    let i = 0;
                    enabledCommands.forEach((el) => {
                        console.log(`enabledCommands.forEach : ${el}`);
                        deleteCheck(el);
                    })
                }
                enabledCommands.push(id);
                addCheck(container);
                //checkBox.style.visibility = "visible";
                handler();
                updateLocalStorage(category, id);
            }
            else { // If the command is enabled -- disable it on click.

                console.log(state);
                deleteCheck();

                defaultSettings[category].handler(); //resets to default value
                console.log("You are removing this category from local storage: " + category);
                console.log("Calling the handler " + defaultSettings[category].handler + ". This handler is in " + defaultSettings[category], ". default settings : " + defaultSettings);
                updateLocalStorage(category, null, true);
                //reset the default value that the command changed;
            }
            }


        });
        //this runs regardless of type

        paletteList.appendChild(container);
        console.log("Created element: " + container.innerHTML);
        console.log("paletteList.children: " + paletteList.children.innerHTML);
        console.log(state);
    }
    function displaySuggestions(suggestions) {

        clearSuggestions();
        const length = suggestions.length;
        let category;
        let value;
        let id;
        let type;
        let handler;
        let icon;
        let imgUrl;

        for (let i = 0; i < length; i++) {

            value = Object.keys(suggestions[i])[0];
            const suggestion = suggestions[i][value];
            console.log(category);
            category = suggestion.category;
            id = suggestion.id;
            handler = suggestion.handler;
            type = suggestion.type;
            imgUrl = suggestion.imgUrl;
            
             icon = suggestion.icon;
            if (DEBUG) {
                console.log(`displaySuggestions: Sending element ${i} : ${category} and ${value} to createSuggestions`);
            }


            console.log("DisplaySuggestions: id:, " + id + " value: " + value + ", category: " + category + " icon:  " + icon);

            createSuggestion(category, value, handler, id, icon, type, imgUrl);
        }

    }

    function clearSuggestions() {
        const suggestions = document.querySelector(".inputSettingsList");


        while (suggestions.children.length > 0) {
            let suggestion = suggestions.children[0];
            if (suggestion) {
                suggestion.remove();
            }
        }

    }

// ============================================
// 🧠 Palette activation keys
// ============================================
const inputBox = document.querySelector(".paletteInput");
    function togglePalette() {
        if (palette.style.display === 'none') {
            openPalette();

        } else {
            closePalette();
        }
    }

    function openPalette() {
        palette.style.display = 'flex';
        document.querySelector(".paletteInput").focus();
        blurBackground();

    }

    function closePalette() {
        document.querySelector(".paletteInput").value = "";
        document.querySelector(".paletteInput").blur();
        palette.style.display = 'none';
        removeBlur();


    }
        function openValuePanel(id) {
            const panel = document.querySelector(".inputValuePanel");
            panel.classList.add(id);
            panel.style.display = "flex";

           closePalette();
            blurBackground();
             document.querySelector("body > div.inputValuePanel > input").focus();

    }

    function closeValuePanel() {
        const panel = document.querySelector(".inputValuePanel");
        if(!panel){return;}
        const currentClassName = document.querySelector(".inputValuePanel").className;
            if(currentClassName.split(" ").length > 1){
                panel.className = "inputValuePanel";           }
                panel.style.display = "none";
         removeBlur();


    }



})();
