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

;(function () {
  'use strict'
class LocalStorage {

  static localStorageName = "palette.settings";


  static getSavedSettings(){

   let savedItem = localStorage.getItem(this.localStorageName);

    if(!savedItem){
      localStorage.setItem(this.localStorageName, JSON.stringify({}));
    }

    savedItem = localStorage.getItem(this.localStorageName); // Correctly update the object
    savedItem = JSON.parse(savedItem);
    return savedItem;
  }
  static saveCommand(command, value=null) {

    let savedItem = this.getSavedSettings();


    if(command.type !== "value"){
      savedItem[command.category] = command.id;
    }
    else{
      savedItem[command.category] = {id: command.id, value: value};
    }

     let newItem = savedItem;
   ;
    localStorage.setItem(this.localStorageName, JSON.stringify(newItem)); // Stringify before saving
  }
  static removeCommand(command){

    let savedItem = this.getSavedSettings();


    delete savedItem[command.category];


     let newItem = savedItem;

    localStorage.setItem(this.localStorageName, JSON.stringify(newItem)); // Stringify before saving
  }
  static loadSettings(){
     let savedItem = this.getSavedSettings();

     for( const [key, value] of Object.entries(savedItem)){
      console.log(key + " " +  value);
      if(typeof value !== "string"){

        const command = commands.getCommandById(value.id);
        commands.executeCommand(command.id, value.value, true)
      }
      else{

        const command = commands.getCommandById(value);
        commands.executeCommand(command.id, command.name, true)
      }
      }

      return true;
  }

}

function changeFont(value){

           const excludedContainer = document.querySelector(".palette");
  if (!excludedContainer) {
    console.warn(`Container with selector "${".palette"}" not found.  Font family may not be changed as expected.`);
    return;
  }
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    (node) => {
      if (node === excludedContainer || excludedContainer.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
    false
  );
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    currentNode.style.fontFamily = value;

  }
}
  class Config {
    static paletteToggleKey = "l";
    static alternateIcons = false;
    static defaultFontSize = "18px";
    static icons = {
      font: this.alternateIcons ? "  A  ": 'fas fa-fw fa-font',
      theme: this.alternateIcons ? "  🎨  ":'fas fa-fw fa-palette',
      background: this.alternateIcons ? "  B  ": 'fas fa-fw fa-image',
      language: this.alternateIcons ? "  🏴󠁧󠁢󠁷󠁬󠁳󠁿  ":'fas fa-fw fa-language',
      search: this.alternateIcons ? "  🔍  ": 'fas fa-search',
      check: this.alternateIcons ? "✓  ": 'fas fa-fw fa-check',
      arrow: this.alternateIcons ? "  ➤":'fas fa-fw fa-chevron-right chevronIcon'
    }
    static fonts = [
      'Arial',
      'Verdana',
      'Helvetica',
      'Tahoma',
      'Trebuchet MS',
      'Times New Roman',
      'Georgia',
      'Garamond',
      'Courier New',
      'Brush Script MT',
      'Lucida Console',
      'Lucida Sans Unicode',
      'Palatino Linotype',
      'Impact',
      'Comic Sans MS',
      'Roboto'
    ]

    static categoryHandlers = {
      font: {
        handler: (value)=> {
      changeFont(value);
  State.currentFont = value;
    console.log(State.currentFont);
        }
        ,
        default: ()=>changeFont("")
      },
      language: {
        handler: (value)=> window.location = this.languages[value.charAt(0).toUpperCase() + value.slice(1)],
        default: ()=> window.location = this.languages["English"]
      },
      "font size":{
        handler: (value) => document.body.style.fontSize = value,
        default: () => document.body.style.fontSize = this.defaultFontSize
      }

    }

    static languages = {
      English: 'https://play.typeracer.com/?universe=play',
      Japanese: 'https://play.typeracer.com/?universe=lang_ja',
      Arabic: 'https://play.typeracer.com/?universe=lang_ar',
      Korean: 'https://play.typeracer.com/?universe=lang_ko',
      Chinese: 'https://play.typeracer.com/?universe=lang_zh-tw',
      Malay: 'https://play.typeracer.com/?universe=lang_ms',
      Polish: 'https://play.typeracer.com/?universe=lang_pl',
      Croatian: 'https://play.typeracer.com/?universe=lang_hr',
      Portuguese: 'https://play.typeracer.com/?universe=lang_pt',
      Romanian: 'https://play.typeracer.com/?universe=lang_ro',
      French: 'https://play.typeracer.com/?universe=lang_fr',
      Russian: 'https://play.typeracer.com/?universe=lang_ru',
      German: 'https://play.typeracer.com/?universe=lang_de',
      Spanish: 'https://play.typeracer.com/?universe=lang_es',
      Hindi: 'https://play.typeracer.com/?universe=lang_hi',
      Thai: 'https://play.typeracer.com/?universe=lang_th',
      Hungarian: 'https://play.typeracer.com/?universe=lang_hu',
      Turkish: 'https://play.typeracer.com/?universe=lang_tr',
      Indonesian: 'https://play.typeracer.com/?universe=lang_id',
      Ukrainian: 'https://play.typeracer.com/?universe=lang_uk',
      Italian: 'https://play.typeracer.com/?universe=lang_it',
      Vietnamese: 'https://play.typeracer.com/?universe=lang_vi',
      Afrikaans: 'https://play.typeracer.com/?universe=lang_af',
      Latvian: 'https://play.typeracer.com/?universe=lang_lv',
      Albanian: 'https://play.typeracer.com/?universe=lang_sq',
      Lithuanian: 'https://play.typeracer.com/?universe=lang_lt',
      Belarusian: 'https://play.typeracer.com/?universe=lang_be',
      Macedonian: 'https://play.typeracer.com/?universe=lang_mk',
      Bulgarian: 'https://play.typeracer.com/?universe=lang_bg',
      Maltese: 'https://play.typeracer.com/?universe=lang_mt',
      Catalan: 'https://play.typeracer.com/?universe=lang_ca',
      Norwegian: 'https://play.typeracer.com/?universe=lang_no',
      Czech: 'https://play.typeracer.com/?universe=lang_cs',
      Persian: 'https://play.typeracer.com/?universe=lang_fa',
      Danish: 'https://play.typeracer.com/?universe=lang_da',
      'Serbian (Cyrillic)': 'https://play.typeracer.com/?universe=lang_sr',
      Estonian: 'https://play.typeracer.com/?universe=lang_et',
      'Serbian (Latin)': 'https://play.typeracer.com/?universe=lang_sr-latn',
      Filipino: 'https://play.typeracer.com/?universe=lang_tl',
      Slovak: 'https://play.typeracer.com/?universe=lang_sk',
      Finnish: 'https://play.typeracer.com/?universe=lang_fi',
      Slovenian: 'https://play.typeracer.com/?universe=lang_sl',
      Galacian: 'https://play.typeracer.com/?universe=lang_gl',
      Swahili: 'https://play.typeracer.com/?universe=lang_sw',
      Greek: 'https://play.typeracer.com/?universe=lang_el',
      Swedish: 'https://play.typeracer.com/?universe=lang_sv',
      Hebrew: 'https://play.typeracer.com/?universe=lang_he',
      Welsh: 'https://play.typeracer.com/?universe=lang_cy',
      Irish: 'https://play.typeracer.com/?universe=lang_ga',
      Yiddish: 'https://play.typeracer.com/?universe=lang_yi'
    }
  }

  class UIBuilder {
    static createPalette () {
      const palette = document.createElement('div')
      palette.className = 'palette'
      return palette
    }

    static createPaletteInput () {
      const inputContainer = document.createElement('div')
      inputContainer.className = 'inputContainer'

      const searchIcon = document.createElement('i')
      //searchIcon.innerHTML = "🔎";
      searchIcon.className = Config.icons['search']

      const input = document.createElement('input')
      input.type = 'text'
      input.placeholder = 'Search...'
      input.className = 'paletteInput'

      inputContainer.appendChild(searchIcon)
      inputContainer.appendChild(input)
      return inputContainer
    }

    static createPaletteList () {
      const inputSettingsList = document.createElement('ul')
      inputSettingsList.className = 'inputSettingsList'
      return inputSettingsList
    }

    static createInputValuePanel () {
      const inputValuePanel = document.createElement('div')
      inputValuePanel.className = 'inputValuePanel'

      const input = document.createElement('input')
      inputValuePanel.appendChild(input)
      return inputValuePanel
    }

    static appendPaletteStyles () {
      const style = document.createElement('style')
      style.textContent = `
      .hover-highlight {
              background:#d1d0c5;
              transition: background-color 0.2s ease;
          }
      .palette {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: #333438;
        padding: 10px;
        z-index: 10001;
        display: none;
        min-width: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        flex-direction: column;
        border-radius: .5rem;
        width: 37rem;
        color: #d1d0c5;
        max-height: 60vh;
        overflow-y: scroll;
        scrollbar-color: #646669  transparent;
        scrollbar-width: thin;

      }

      .inputContainer {
        display: flex;
        align-items: center;
        padding: 8px;
        margin-right: 15px;
      }

      .paletteSearchIcon {
        color: rgb(100, 102, 105);
        margin-right: 8px;

      }

      .paletteInput {
        width: 100%;
        font-size: 16px;
        box-sizing: border-box;
        background: transparent;
        border: none;
        outline: none;
        color: #d1d0c5;
      }

      .inputSettingsList {
        height: auto;
        min-height: 0;
        padding-left: 0;
        display: flex;
        flex-direction: column;
        margin-top: 0;
        color: #646669;
        list-style-type: none;
      }
        .commandContainer{
        display: flex;

        }
        .commandContainer:hover{
          background:#d1d0c5
        }

      .inputValuePanel {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: #333438;
        padding: 10px;
        z-index: 10002;
        display: none;
        min-width: 400px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        flex-direction: column;
        border-radius: .5rem;
        width: 30rem;
        color: #d1d0c5;
      }

      .inputValuePanel input {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        box-sizing: border-box;
        background: transparent;
        border: none;
        outline: none;
        color: #d1d0c5;
      }
        .alternateIcon {
        margin-left: 5px; margin-right: 5px; }
    `
      document.head.appendChild(style)
    }
  }
  class State {
    static enabledCommands = [] //holds the commands which are enabled in the palette
    static currentFont;
    static removeCommandById (id) {
      let index = 0
      this.enabledCommands.forEach(command => {
        if (command.id == id) {
          this.enabledCommands.splice(index, 1)
        }
        index++
      })
      return 0
    }
  }

  class Commands {
    commands = {}

    constructor () {}
    updateCommandState (command, boolean) {
      let category = command.category
      let name = command.name
      this.commands[category][name].enabled = boolean
    }
    createCommand (category, name, type, handler, resetHandler, icon, enableLocalStorage=true) {
      const categoryId = category.split(' ').join('-')
      if (!this.commands[category]) {
        this.commands[category] = {}
      }
      if (!resetHandler) {
        resetHandler = () => 'Empty handler bro'
      }

      if (!icon) {
        //check for default icon for its category
        if (Config.icons[category]) {
          icon = Config.icons[category]
        }
      }
      this.commands[category][name] = {
        type: type,
        id: `${categoryId}-${name.split(' ').join('-')}`,
        handler: handler,
        resetHandler: resetHandler,
        category: category,
        name: name,
        icon: icon,
        enabled: false,
        enableLocalStorage: enableLocalStorage,
      }

      if (!handler) {
        this.commands[category][name].handler =
          Config.categoryHandlers[category]["handler"]
      }
      if (!resetHandler) {
        this.commands[category][name].resetHandler =
        Config.categoryHandlers[category]["default"];
      }
    }

    executeCommand (id, value, firedFromLocalStorage=false) {
      const command = this.getCommandById(id)
      if (command && typeof command.handler === 'function') {

        if(command.type !== "value"){
          command.enabled = true
        State.enabledCommands.push(this.getCommandById(id))
        this.updateCommandState(command, true)
        }
        console.log("Executing command. id: "+id);

        if(!firedFromLocalStorage && command.enableLocalStorage){
          LocalStorage.saveCommand(command, value);
        }
        return command.handler(value)
      }
      throw new Error(
        'ExecuteCommand: Command does not exist or has no handler.'
      )
    }

    resetCommand (id) {
      const command = this.getCommandById(id)

      if (command && typeof command.resetHandler === 'function') {
        if(command.type !== "value"){
          command.enabled = false
        //State.removeCommandById(id);
        //console.log('Resetting command id: ' + id)
        State.removeCommandById(id)
        this.updateCommandState(command, false);
        }
        console.log('Resetting command id: ' + id);
        LocalStorage.removeCommand(command);
        return command.resetHandler()


      }
    }
    // utility

    getCommandById (id) {
      for (const categoryCommands of Object.values(this.commands)) {
        for (const command of Object.values(categoryCommands)) {
          //console.log(command)
          if (command.id === id) {
            return command
          }
        }
      }
      return null
    }
    getCommands () {
      return this.commands
    }

    searchCommand (query) {
      const results = []
      if(query==""){return;}
      for (const categoryCommands of Object.values(this.commands)) {
        for (const [name, command] of Object.entries(categoryCommands)) {

          if (

            command.category.startsWith(query) ||
            (name && name.startsWith(query))
          ) {
            results.push({ [name]: command })
          }
        }
      }
      return results
    }
    previewCommand(id){
      if(this.getCommandById(id).category == "font"){

      }
    }
    //Initialize commands with default fonts, languages etc.
    initializeFonts () {
      let fonts = Config.fonts
      fonts.forEach(font => {
        font = font.toLowerCase()
        this.createCommand(
          'font',
          font,
          'toggle',
          Config.categoryHandlers['font']["handler"],
          Config.categoryHandlers['font']["default"],

        )
      })
    }
    initializeLanguages () {
      let languages = Config.languages
      for (const [key, value] of Object.entries(languages)) {
        let language = key.toLowerCase()
        this.createCommand(
          'language',
          language,
          'toggle',
          Config.categoryHandlers['language']["handler"],
          Config.categoryHandlers['language']["default"],
          "",
          false

        )
      }
    }
  }
  class CommandBuilder {
    static updateCheckboxVisibility(id, isVisible){

      const commandContainer = document.querySelector(`#${id}`);
         const checkbox = commandContainer.children[commandContainer.children.length - 2];
    if (checkbox) {
      checkbox.style.visibility = isVisible ? 'visible' : 'hidden';
    }
    console.log("updateCheckboxVisibility. Removing id: "+id);

    }
    static commandTemplate (command) {

      // Template literal for a command
      const template = !Config.alternateIcons ? `
        <div class="commandContainer" id="${command.id}">
          <i class="${command.icon || ''}"></i>
          <div class="category">${command.category}</div>
          <i class="${Config.icons.arrow}"></i>
          <i class="${Config.icons.check}" id="${
        command.id
      }" style="visibility: ${command.enabled ? 'visible' : 'hidden'}"></i>
          <div class="commandName">${command.name}</div>
        </div>
      ` :

      `
        <div class="commandContainer" id="${command.id}">
          <div class="alternateIcon"}">${command.icon || ''}</div>
          <div class="category">${command.category}</div>
          <div class= "alternateIcon">${Config.icons.arrow}</div>
          <div class="alternateIcon" id="${
        command.id
      }" style="visibility: ${command.enabled ? 'visible' : 'hidden'}">${Config.icons.check }</div>
          <div class="commandName">${command.name}</div>
        </div>
      `

      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = template;
      return tempContainer.children[0];
    }
    static createCommandElements (commandsArray) {
      this.clearCommandElements()
      commandsArray.forEach(obj => {
        let command = Object.values(obj)[0]
        this.createSingleCommandElement(command)
      })
    }
    static handleCommandClick (command) {


      let enabledCommands = State.enabledCommands
      let enabledCommandsInSameCategory = enabledCommands.filter(
        obj => obj.category == command.category
      )

      if (command.type == 'value') {
        openValuePanel(command.id);
        return;
      } else {
        if (command.enabled) {
          commands.resetCommand(command.id);
          this.updateCheckboxVisibility(command.id, false);
          return
        } else if (
          !command.enabled &&
          enabledCommandsInSameCategory.length > 0
        ) {


          enabledCommandsInSameCategory.forEach(obj => {
            let enabledCommand = obj
            this.updateCheckboxVisibility(enabledCommand.id, false);
            commands.resetCommand(enabledCommand.id);

            console.log(enabledCommands)

            commands.executeCommand(command.id, command.name)
             this.updateCheckboxVisibility(command.id, true);
          })
        } else {
          commands.executeCommand(command.id, command.name)
           this.updateCheckboxVisibility(command.id, true);
        }
      }
    }
    static clearCommandElements () {
      const commandList = document.querySelector('body > div.palette > ul')
      if (commandList) {
        console.log('Clearing elements using innerHTML')
        commandList.innerHTML = ''
      } else {
        console.log('Command list element not found.')
      }
    }
    static createSingleCommandElement (command) {
      const commandElement = CommandBuilder.commandTemplate(command)
      commandElement.addEventListener('click', () => {
        this.handleCommandClick(command)
      })

      paletteList.appendChild(commandElement);
    }
  }

  function setupArrowKeyNavigation (containerSelector) {
    const container = document.querySelector(containerSelector)
    if (!container) {
      console.warn(`Container not found: ${containerSelector}`)
      return
    }

    let elements = []
    let selectedIndex = 0
    let previousSelectedIndex = null
    let keydownListener = null

    function highlightElement (index) {
      if (
        previousSelectedIndex !== null &&
        previousSelectedIndex !== index &&
        elements[previousSelectedIndex]
      ) {
        elements[previousSelectedIndex].classList.remove('hover-highlight')
      }
      if (elements[index]) {
        elements[index].classList.add('hover-highlight')
        previousSelectedIndex = index
        elements[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }

    function addKeydownListener () {
      if (keydownListener) {
        document.removeEventListener('keydown', keydownListener)
      }

      keydownListener = event => {

        if(valuePanel.contains(event.target)){
          return;
        }
        if (event.key === 'ArrowDown') {
          selectedIndex = (selectedIndex + 1) % elements.length
          highlightElement(selectedIndex)
        } else if (event.key === 'ArrowUp') {
          selectedIndex =
            (selectedIndex - 1 + elements.length) % elements.length
          highlightElement(selectedIndex)

        } else if (event.key === 'Enter' && event.target.className !== "inputValuePanel" ) {

          let enterIndex = selectedIndex;
          if(selectedIndex >= container.querySelectorAll(":scope > *").length){
            if(container.querySelectorAll(":scope > *").length >=1){
              enterIndex = container.querySelectorAll(":scope > *").length-1;
            }else{
              enterIndex = 0;
            }

          }



          console.log(elements[selectedIndex])
          console.log("elements" + elements);
          console.log("container" + container);
          console.log("selectedIndex: " + selectedIndex);
          const id = elements[enterIndex].id


          const command = commands.getCommandById(id)
          CommandBuilder.handleCommandClick(command)
        }
      }

      document.addEventListener('keydown', keydownListener)
    }

    function initializeNavigation () {
      elements = Array.from(container.querySelectorAll(':scope > *'))

      if (elements.length === 0) {
        if (keydownListener) {
          document.removeEventListener('keydown', keydownListener)
          keydownListener = null
        }
        return // Do nothing if there are no children
      }

      // Find the initial selected element (if any)

      let selectedIndex = 0

      highlightElement(selectedIndex)
      addKeydownListener()
    }


    const observer = new MutationObserver(mutations => {
      initializeNavigation()
    })

    observer.observe(palette, { childList: true, subtree: true })

    initializeNavigation() // Initial setup
  }

  class EventHandlers{
  static  inRaceObserver(){
         const observer = new MutationObserver((mutationsList, observer) => {
    const targetElement = document.querySelector(".mainViewport");
    if (targetElement) {
      observer.disconnect();
      const mainViewport = document.querySelector('.mainViewport');
      if (mainViewport) {
        const mainViewportObserver = new MutationObserver((viewportMutationsList) => {
          viewportMutationsList.forEach(mutation => {
            console.log('.mainViewport mutation:', mutation);
            const raceTextBox = document.querySelector("#smoothCaret").previousSibling;
            if(raceTextBox && raceTextBox.style.fontFamily !== State.currentFont){
              raceTextBox.style.fontFamily == State.currentFont;
            }

          });
        });
        mainViewportObserver.observe(mainViewport, { attributes: true, childList: true, subtree: true, characterData: true });


      } else {
        console.error('.mainViewport element not found.');
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  function applyIcons () {
    const fa = document.createElement('link')
    fa.rel = 'stylesheet'
    fa.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    document.head.appendChild(fa)
  }

  // ============================================
  // 🧠 Styles
  // ============================================

  try {
    applyIcons()
  } catch (e) {
    console.log(e)
  }
  const styles = document.createElement('style')
  styles.textContent = `

`

  // ============================================
  // 🧠 UI creation
  // ============================================
  document.head.appendChild(styles)
  UIBuilder.appendPaletteStyles()
  const palette = UIBuilder.createPalette()
  const input = UIBuilder.createPaletteInput()
  const paletteList = UIBuilder.createPaletteList()
  const valuePanel = UIBuilder.createInputValuePanel()
  palette.appendChild(input)
  palette.appendChild(paletteList)
  document.body.appendChild(palette)
  document.body.appendChild(valuePanel)

  var paletteFontStyles = document.createElement("style");
  paletteFontStyles.textContent = `
      body: {background: red};
  `
  document.head.appendChild(paletteFontStyles);
  function setPaletteFontStyles(){
    let fonts = Config.fonts;

    var cssSheet = paletteFontStyles.sheet;
    fonts.forEach((font)=>{


      font = font.toLowerCase();
      let fontId = "font-" + font.split(" ").join("-");
      cssSheet.insertRule(`#${fontId} >.commandName { font-family: ${font}; }`, cssSheet.cssRules.length);

    })
  }

setPaletteFontStyles();
EventHandlers.inRaceObserver();
  // ============================================
  // 🧠 Initialize command object
  // ============================================

  var commands = new Commands()
  commands.initializeFonts()
  commands.initializeLanguages()
  commands.createCommand('theme', 'dark', 'toggle', () => '')
  commands.createCommand('theme', 'responsive', 'toggle', () => '')
  commands.createCommand('theme', 'classic', 'toggle', () => '')
  commands.createCommand('background', 'none', 'toggle', () => '')
  commands.createCommand('background', 'none', 'toggle', () => '')
  commands.createCommand('font size', 'size', 'value', () => '');

const loadedSettings = LocalStorage.loadSettings();


  //Testing

  // ============================================
  // 🧠 Event listeners
  // ============================================

  document.addEventListener('keydown', function (event) {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      (event.key === Config.paletteToggleKey.toLowerCase() || event.key === Config.paletteToggleKey.toUpperCase())
    ) {
      togglePalette()
      //event.preventDefault() // Prevent browser's default Ctrl+Shift+P behavior
    }
  })
  const panel = document.querySelector('.inputValuePanel > input');
  panel.addEventListener("keydown", (event) => {
    if(event.key == "Enter" && event.target.value){
      const id = panel.parentElement.classList[1];
      const value = event.target.value;

      commands.executeCommand(id, value);
      closeValuePanel();
    }
  })

   document.addEventListener("click", (event) => {



    if(!palette.contains(event.target)){

      closePalette();
    }
     setTimeout(()=>{
      if(!valuePanel.contains(event.target)){

      closeValuePanel();
    }
     },150)
  })
  setupArrowKeyNavigation('ul.inputSettingsList')

  // ============================================
  // 🧠 Main program flow.
  // ============================================
  //1) Getting user input and filtering the commands object for the relevant commands.
  input.addEventListener('input', function (event) {
    let search = event.target.value;
    console.log(search);


    let commandsArray = commands.searchCommand(search)
    console.log(commandsArray)
    //2) Creating the HTML command elements piece by piece
    CommandBuilder.createCommandElements(commandsArray)
  })

  // ============================================
  // 🧠 Palette activation keys
  // ============================================
  const inputBox = document.querySelector('.paletteInput')
  function togglePalette () {
    if (palette.style.display === 'none') {
      openPalette()
    } else {
      closePalette()
    }
  }

  function openPalette () {
    palette.style.display = 'flex'
    document.querySelector('.paletteInput').focus()
  }

  function closePalette () {
    document.querySelector('.paletteInput').value = ''
    document.querySelector('.paletteInput').blur()
    palette.style.display = 'none'
  }
  function openValuePanel (id) {
    const panel = document.querySelector('.inputValuePanel')
    panel.classList.add(id)

    panel.style.display = 'flex'

    closePalette()
    document.querySelector('body > div.inputValuePanel > input').focus()
  }

  function closeValuePanel () {
    const panel = document.querySelector('.inputValuePanel')
    if (!panel) {
      return
    }
    const currentClassName =
      document.querySelector('.inputValuePanel').className
    if (currentClassName.split(' ').length > 1) {
      panel.className = 'inputValuePanel'
    }
    panel.style.display = 'none'
  }
})()