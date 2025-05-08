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

(function () {
  "use strict";

  class Config {
    static icons = {
      font: "fas fa-fw fa-font",
      theme: "fas fa-fw fa-palette",
      background: "fas fa-fw fa-image",
      language: "fas fa-fw fa-language",
      search: "fas fa-search",
      check: "fas fa-fw fa-check",
      arrow: "fas fa-fw fa-chevron-right chevronIcon",
    };
    static fonts = [
      "Arial",
      "Verdana",
      "Helvetica",
      "Tahoma",
      "Trebuchet MS",
      "Times New Roman",
      "Georgia",
      "Garamond",
      "Courier New",
      "Brush Script MT",
      "Lucida Console",
      "Lucida Sans Unicode",
      "Palatino Linotype",
      "Impact",
      "Comic Sans MS",
      "Roboto",
    ];

    static categoryHandlers = {
      font: () => console.log("you changed font!"),
      language: () => console.log("you changed language!")
    };

    static languages = {
      English: "https://play.typeracer.com/?universe=play",
      Japanese: "https://play.typeracer.com/?universe=lang_ja",
      Arabic: "https://play.typeracer.com/?universe=lang_ar",
      Korean: "https://play.typeracer.com/?universe=lang_ko",
      Chinese: "https://play.typeracer.com/?universe=lang_zh-tw",
      Malay: "https://play.typeracer.com/?universe=lang_ms",
      Polish: "https://play.typeracer.com/?universe=lang_pl",
      Croatian: "https://play.typeracer.com/?universe=lang_hr",
      Portuguese: "https://play.typeracer.com/?universe=lang_pt",
      Romanian: "https://play.typeracer.com/?universe=lang_ro",
      French: "https://play.typeracer.com/?universe=lang_fr",
      Russian: "https://play.typeracer.com/?universe=lang_ru",
      German: "https://play.typeracer.com/?universe=lang_de",
      Spanish: "https://play.typeracer.com/?universe=lang_es",
      Hindi: "https://play.typeracer.com/?universe=lang_hi",
      Thai: "https://play.typeracer.com/?universe=lang_th",
      Hungarian: "https://play.typeracer.com/?universe=lang_hu",
      Turkish: "https://play.typeracer.com/?universe=lang_tr",
      Indonesian: "https://play.typeracer.com/?universe=lang_id",
      Ukrainian: "https://play.typeracer.com/?universe=lang_uk",
      Italian: "https://play.typeracer.com/?universe=lang_it",
      Vietnamese: "https://play.typeracer.com/?universe=lang_vi",
      Afrikaans: "https://play.typeracer.com/?universe=lang_af",
      Latvian: "https://play.typeracer.com/?universe=lang_lv",
      Albanian: "https://play.typeracer.com/?universe=lang_sq",
      Lithuanian: "https://play.typeracer.com/?universe=lang_lt",
      Belarusian: "https://play.typeracer.com/?universe=lang_be",
      Macedonian: "https://play.typeracer.com/?universe=lang_mk",
      Bulgarian: "https://play.typeracer.com/?universe=lang_bg",
      Maltese: "https://play.typeracer.com/?universe=lang_mt",
      Catalan: "https://play.typeracer.com/?universe=lang_ca",
      Norwegian: "https://play.typeracer.com/?universe=lang_no",
      Czech: "https://play.typeracer.com/?universe=lang_cs",
      Persian: "https://play.typeracer.com/?universe=lang_fa",
      Danish: "https://play.typeracer.com/?universe=lang_da",
      "Serbian (Cyrillic)": "https://play.typeracer.com/?universe=lang_sr",
      Estonian: "https://play.typeracer.com/?universe=lang_et",
      "Serbian (Latin)": "https://play.typeracer.com/?universe=lang_sr-latn",
      Filipino: "https://play.typeracer.com/?universe=lang_tl",
      Slovak: "https://play.typeracer.com/?universe=lang_sk",
      Finnish: "https://play.typeracer.com/?universe=lang_fi",
      Slovenian: "https://play.typeracer.com/?universe=lang_sl",
      Galacian: "https://play.typeracer.com/?universe=lang_gl",
      Swahili: "https://play.typeracer.com/?universe=lang_sw",
      Greek: "https://play.typeracer.com/?universe=lang_el",
      Swedish: "https://play.typeracer.com/?universe=lang_sv",
      Hebrew: "https://play.typeracer.com/?universe=lang_he",
      Welsh: "https://play.typeracer.com/?universe=lang_cy",
      Irish: "https://play.typeracer.com/?universe=lang_ga",
      Yiddish: "https://play.typeracer.com/?universe=lang_yi",
    };
  }

  class UIBuilder {
    static createPalette() {
      const palette = document.createElement("div");
      palette.className = "palette";
      return palette;
    }

    static createPaletteInput() {
      const inputContainer = document.createElement("div");
      inputContainer.className = "inputContainer";

      const searchIcon = document.createElement("i");
      //searchIcon.innerHTML = "🔎";
      searchIcon.className = Config.icons["search"];

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Search...";
      input.className = "paletteInput";

      inputContainer.appendChild(searchIcon);
      inputContainer.appendChild(input);
      return inputContainer;
    }

    static createPaletteList() {
      const inputSettingsList = document.createElement("ul");
      inputSettingsList.className = "inputSettingsList";
      return inputSettingsList;
    }

    static createInputValuePanel() {
      const inputValuePanel = document.createElement("div");
      inputValuePanel.className = "inputValuePanel";

      const input = document.createElement("input");
      inputValuePanel.appendChild(input);
      return inputValuePanel;
    }

    static appendPaletteStyles() {
      const style = document.createElement("style");
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
    `;
      document.head.appendChild(style);
    }
  }
  class State {
    static enabledCommands = []; //holds the commands which are enabled in the palette
    static removeCommandById(id) {
      let index = 0;
      this.enabledCommands.forEach((command) => {
        if (command.id == id) {
          this.enabledCommands.splice(index, 1);
        }
        index++;
      });
      return 0;
    }
  }

  class Commands {
    commands = {};

    constructor() {}
    updateCommandState(command, boolean){
      let category = command.category;
      let name = command.name;
      this.commands[category][name].enabled = boolean;
    }
    createCommand(category, name, type, handler, resetHandler, icon) {
      const categoryId = category.split(" ").join("-");
      if (!this.commands[category]) {
        this.commands[category] = {};
      }
      if (!resetHandler) {
        resetHandler = () => "Empty handler bro";
      }
      if (!icon) {
        //check for default icon for its category
        if (Config.icons[category]) {
          icon = Config.icons[category];
        }
      }
      this.commands[category][name] = {
        type: type,
        id: `${categoryId}-${name.split(" ").join("-")}`,
        handler: handler,
        resetHandler: resetHandler,
        category: category,
        name: name,
        icon: icon,
        enabled: false,
      };

      if (!handler) {
        this.commands[category][name].handler =
          Config.categoryHandlers[category];
      }
      if (!resetHandler) {
      }
    }

    executeCommand(id, ...args) {
      const command = this.getCommandById(id);
      if (command && typeof command.handler === "function") {
        debugger;
        command.enabled = true;
        State.enabledCommands.push(this.getCommandById(id));
        this.updateCommandState(command, true);

        return command.handler(...args);
      }
      throw new Error("ExecuteCommand: Command does not exist or has no handler.");

    }

    resetCommand(id) {
      const command = this.getCommandById(id);

      if (command && typeof command.resetHandler === "function") {
        command.enabled = false;
        //State.removeCommandById(id);
        console.log("Resetting command id: " + id);
        State.removeCommandById(id);
        this.updateCommandState(command, false);
      }
    }
    // utility

    getCommandById(id) {
      for (const categoryCommands of Object.values(this.commands)) {
        for (const command of Object.values(categoryCommands)) {
          console.log(command);
          if (command.id === id) {
            return command;
          }
        }
      }
      return null;
    }
    getCommands() {
      return this.commands;
    }

    searchCommand(query) {
      const results = [];

      for (const categoryCommands of Object.values(this.commands)) {
        for (const [name, command] of Object.entries(categoryCommands)) {
          if (
            command.id.startsWith(query) ||
            (name && name.startsWith(query))
          ) {
            results.push({ [name]: command });
          }
        }
      }
      return results;
    }

    //Initialize commands with default fonts, languages etc.
    initializeFonts() {
      let fonts = Config.fonts;
      fonts.forEach((font) => {
        font = font.toLowerCase();
        this.createCommand(
          "font",
          font,
          "toggle",
          Config.categoryHandlers["font"],
          () => "reset handler undefined atm"
        );
      });
    }
    initializeLanguages(){
      let languages = Config.languages;
      for (const [key, value] of Object.entries(languages)){
        let language = key.toLowerCase();
        this.createCommand(
          "language",
          language,
          "toggle",
          Config.categoryHandlers["language"],
          () => "reset handler undefined"

        )
      }
    }
  }
  class CommandBuilder {
    static createCommandElements(commandsArray) {
      this.clearCommandElements();
      commandsArray.forEach((obj) => {
        let command = Object.values(obj)[0];
        this.createSingleCommandElement(command);
      });
    }
    static handleCommandClick(command, checkBox) {
      debugger;
      let enabledCommands = State.enabledCommands;
      let enabledCommandsInSameCategory = enabledCommands.filter(
        (obj) => obj.category == command.category
      );

      if (command.type == "value") {
      } else {
        if (command.enabled) {
          commands.resetCommand(command.id);
          checkBox.style.visibility = "hidden";
          return;
        } else if (
          !command.enabled &&
          enabledCommandsInSameCategory.length > 0
        ) {
          debugger;

          enabledCommandsInSameCategory.forEach((obj) => {
            let enabledCommand = obj;
            debugger;
            debugger;
            commands.resetCommand(enabledCommand.id);
            //removing the arrow
            let enabledCommandElement = document.querySelector(
              "#" + enabledCommand.id
            );
            let enabledCommandElementCheck =
              enabledCommandElement.getElementsByClassName(
                Config.icons.check
              )[0];
            enabledCommandElementCheck.style.visibility = "hidden";

            console.log(enabledCommands);

            commands.executeCommand(command.id);
            checkBox.style.visibility = "visible";
          });
        } else {
          commands.executeCommand(command.id);
          checkBox.style.visibility = "visible";
        }
      }
    }
    static clearCommandElements() {
      const commandList = document.querySelector("body > div.palette > ul");
      if (commandList) {
        console.log("Clearing elements using innerHTML");
        commandList.innerHTML = "";
      } else {
        console.log("Command list element not found.");
      }
    }
    static createSingleCommandElement(command) {
      //Creation of HTML components
      const container = document.createElement("div");
      container.className = "commandContainer";
      const categoryElement = document.createElement("div");
      categoryElement.className = "category";
      const iconElement = document.createElement("i");
      iconElement.className = command.icon;
      const nameElement = document.createElement("div");
      nameElement.className = "commandName";
      const arrow = document.createElement("i");
      arrow.className = Config.icons.arrow;
      const checkBox = document.createElement("i");
      checkBox.className = Config.icons["check"];
      ///////
      checkBox.id = command.id;
      container.id = command.id;
      nameElement.textContent = command.name;
      categoryElement.textContent = command.category;

      checkBox.style.visibility = "hidden";
      if (command.enabled) {
        checkBox.style.visibility = "visible";
      }
      container.appendChild(iconElement);
      container.appendChild(categoryElement);
      container.appendChild(arrow);
      container.appendChild(checkBox);
      container.appendChild(nameElement);

      container.addEventListener("click", () => {
        this.handleCommandClick(command, checkBox);
      });

      paletteList.appendChild(container);
    }
  }
  function setupArrowKeyNavigation(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.warn(`Container not found: ${containerSelector}`);
      return;
    }
    
    let elements = [];
    let selectedIndex = 0;
    let previousSelectedIndex = null;
    let keydownListener = null;
    
    function highlightElement(index) {
      if (previousSelectedIndex !== null && previousSelectedIndex !== index && elements[previousSelectedIndex]) {
        elements[previousSelectedIndex].classList.remove('hover-highlight');
      }
      if(elements[index]) {
          elements[index].classList.add('hover-highlight');
          previousSelectedIndex = index;
          elements[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  
    function addKeydownListener() {
      if(keydownListener){
          document.removeEventListener('keydown', keydownListener)
      }
      
      keydownListener = (event) => {
        if (event.key === 'ArrowDown') {
          selectedIndex = (selectedIndex + 1) % elements.length;
          highlightElement(selectedIndex);
        } else if (event.key === 'ArrowUp') {
          selectedIndex = (selectedIndex - 1 + elements.length) % elements.length;
          highlightElement(selectedIndex);
        } else if (event.key === 'Enter') {
          debugger;
            console.log(elements[selectedIndex]);
            const id = elements[selectedIndex].id;
            const checkBox = elements[selectedIndex].querySelector("#"+id);
            const command = commands.getCommandById(id);
            CommandBuilder.handleCommandClick(command, checkBox);
            
        }
      };
  
      document.addEventListener('keydown', keydownListener);
    }
    
      function initializeNavigation() {
          elements = Array.from(container.querySelectorAll(':scope > *'));
  
          if (elements.length === 0) {
            if(keydownListener) {
              document.removeEventListener('keydown', keydownListener);
              keydownListener = null;
            }
            return; // Do nothing if there are no children
          }
  
          // Find the initial selected element (if any)
          
          
              let selectedIndex = 0;
          
  
          highlightElement(selectedIndex);
          addKeydownListener()
      }
  
      
      const observer = new MutationObserver(mutations => {
          initializeNavigation();
      });
      
      observer.observe(container, { childList: true, subtree: true });
  
      initializeNavigation(); // Initial setup
  }
  
  
  // ============================================
  // 🧠 Styles
  // ============================================
  const fa = document.createElement("link");
  fa.rel = "stylesheet";
  fa.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(fa);
  const styles = document.createElement("style");
  styles.textContent = `
 
`;

  // ============================================
  // 🧠 UI creation
  // ============================================
  document.head.appendChild(styles);
  UIBuilder.appendPaletteStyles();
  const palette = UIBuilder.createPalette();
  const input = UIBuilder.createPaletteInput();
  const paletteList = UIBuilder.createPaletteList();
  const valuePanel = UIBuilder.createInputValuePanel();
  palette.appendChild(input);
  palette.appendChild(paletteList);
  document.body.appendChild(palette);
  document.body.appendChild(valuePanel);

  // ============================================
  // 🧠 Initialize command object
  // ============================================

  var commands = new Commands();
  commands.initializeFonts();
  commands.initializeLanguages();
  commands.createCommand("theme", "dark", "toggle", () => "");
  commands.createCommand("theme", "responsive", "toggle", () => "");
  commands.createCommand("theme", "classic", "toggle", () => "");
  commands.createCommand("background", "none", "toggle", () => "");
  //Testing
  setTimeout(() => {
    openPalette();
  }, 1000);
  // ============================================
  // 🧠 Event listeners
  // ============================================

  document.addEventListener("keydown", function (event) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === "L"
    ) {
      togglePalette();
      event.preventDefault(); // Prevent browser's default Ctrl+Shift+P behavior
    }
  });
  setupArrowKeyNavigation("ul.inputSettingsList");
 
  // ============================================
  // 🧠 Main program flow.
  // ============================================
  //1) Getting user input and filtering the commands object for the relevant commands.
  input.addEventListener("input", function (event) {
    let search = event.target.value;
    let commandsArray = commands.searchCommand(search);
    console.log(commandsArray);
    //2) Creating the HTML command elements piece by piece
    CommandBuilder.createCommandElements(commandsArray);

   
  });

  // ============================================
  // 🧠 Palette activation keys
  // ============================================
  const inputBox = document.querySelector(".paletteInput");
  function togglePalette() {
    if (palette.style.display === "none") {
      openPalette();
    } else {
      closePalette();
    }
  }

  function openPalette() {
    palette.style.display = "flex";
    document.querySelector(".paletteInput").focus();
  }

  function closePalette() {
    document.querySelector(".paletteInput").value = "";
    document.querySelector(".paletteInput").blur();
    palette.style.display = "none";
  }
  function openValuePanel(id) {
    const panel = document.querySelector(".inputValuePanel");
    panel.classList.add(id);
    panel.style.display = "flex";

    closePalette();
    document.querySelector("body > div.inputValuePanel > input").focus();
  }

  function closeValuePanel() {
    const panel = document.querySelector(".inputValuePanel");
    if (!panel) {
      return;
    }
    const currentClassName =
      document.querySelector(".inputValuePanel").className;
    if (currentClassName.split(" ").length > 1) {
      panel.className = "inputValuePanel";
    }
    panel.style.display = "none";
  }
})();
