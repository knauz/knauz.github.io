// ==UserScript==
// @name         BGE readability enhancer
// @namespace    http://stef.fi/
// @version      0.3.2
// @description  increase readability of some swiss law related websites
// @author       Alexander Ried, Stephanie Blaettler
// @match        http://relevancy.bger.ch/php/clir/http/index.php?*
// @match        https://entscheide.weblaw.ch/cache.php?*
// @match        https://www.dike.ch/verwaltungsrecht/*
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_setValue
// @require      http://code.jquery.com/jquery-3.3.1.slim.min.js
// @resource     fonts https://fonts.googleapis.com/css?family=EB+Garamond|Lato|Noto+Serif|Raleway|Roboto|Source+Sans+Pro
// ==/UserScript==

var style = `
@import url('${GM_getResourceURL("fonts")}');
body {
    background: hsla(210, 60%, 16%, 1);
    color: hsla(230, 100%, 100%, 1);
    max-width: 40em;
    margin: 0px auto;
    line-height: 1.5;
}
a { color: hsla(230, 100%, 100%, 1); }
details[open] { background: darkgrey }
.big { font-size: larger; }
.bold { font-weight: bold; }
.paraatf { margin-bottom: 1em; }
`;

var settingsCss = `
  #knauz_settings {
    display: inline-block;
    position: fixed;
    opacity: 0.5;
    top: 1rem;
    left: 1rem;
    border: solid hsl(330, 100%, 50%) 0.3rem;
    border-radius: 1rem;
    background: hsl(330, 100%, 50%);
    max-width: 15em;
    color: black;
    overflow: hidden;
    line-height: initial;
    font-size: initial;
  }
  #knauz_settings:hover { opacity: 1; }
  #knauz_settings[open] { background: hsl(330, 100%, 90%); opacity: 1; }
  #knauz_settings summary::-webkit-details-marker { display: none }
  #knauz_settings summary { outline: none; background: hsl(330, 100%, 50%); margin: -0.15rem; border-radius: 1rem 1rem 0 0; }

  #knauz_settings > summary:before { display: inline-block; content: "⚙️"; font-size: x-large; margin: 0.3rem; }
  #knauz_settings[open] > summary:after { display: inline-block; content: "Einstellungen"; }

  #knauz_settings section { padding-left: 0.5em; }

  #knauz_settings h2 { font-size: initial; margin: 1em 0 0 0; }

  #knauz_settings ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  #knauz_settings ul > li {
    display: inline-block;
    margin: 0.5rem;
  }

  #knauz_settings .icon {
    font-size: x-large;
    font-family: MONOSPACE;
  }

  #knauz_settings .btn {
    cursor: pointer;
    user-select: none;
    padding: 0.5rem;
    border: solid black 1px;
    border-radius: 1rem;
  }

`;

var settings = `
<details id="knauz_settings">
  <summary />
  <section>
    <h2>Farbe</h2>
    <ul id="knauz_scheme">
      <li class="btn" style="color: rgb(176, 176, 176); background: rgb(18, 18, 18);">Aa</li>
      <li class="btn" style="color: rgb(205, 205, 205); background: rgb(90, 90, 90);">Aa</li>
      <li class="btn" style="color: rgb(79, 50, 28); background: rgb(248, 241, 227);">Aa</li>
      <li class="btn" style="color: rgb(0, 0, 0); background: rgb(255, 255, 255);">Aa</li>
    </ul>
  </section>
  <section>
    <h2>Schriftart</h2>
    <ul id="knauz_font">
      <li class="btn" style="font-family: 'EB Garamond', serif;">Garamond</li>
      <li class="btn" style="font-family: 'Helvetica', sans-serif;">Helvetica</li>
      <li class="btn" style="font-family: 'Lato', sans-serif;">Lato</li>
      <li class="btn" style="font-family: 'Noto Serif', serif;">Noto Serif</li>
      <li class="btn" style="font-family: 'Raleway', sans-serif;">Raleway</li>
      <li class="btn" style="font-family: 'Roboto', sans-serif;">Roboto</li>
      <li class="btn" style="font-family: 'Source Sans Pro', sans-serif;">Source Sans Pro</li>
    </ul>
  </section>
  <section>
    <h2>Größe</h2>
    <ul id="knauz_size">
      <li class="icon btn" data-multiplier="0.8">&ndash;</li>
      <li class="icon btn" data-multiplier="1.2">+</li>
    </ul>
  </section>
</details>
`;

(function() {
    'use strict';

    function getSummary(text, length=0) {
        if (length == 0) return "";

        text = text.replace(/<.+?>/g, "");
        return text.substring(0, Math.min(length, text.indexOf(" "))) + "...";
    }

    function replacement(match, text) {
        if (text.search("[A-ZÄÖÜ]{4,}") !== -1 || text.indexOf("BGE") !== -1 || text.replace(/[^0-9]/g,"").length > 6) {
            return "(<details style='display:inline;'><summary>" + getSummary(text) + "</summary>" + text + "</details>)";
        }
        return match;
    }

    function set_scheme() {
        $("body").css("color", this.style.color);
        $("body").css("background", this.style.background);
        this.style.borderColor = "blue";
        $(this).siblings("li").each((i, li) => { li.style.borderColor = "unset"; });
        GM_setValue("knauz_scheme", $(this).parent().children("li").index(this));
    }

    function set_font() {
        $("body").css("font-family", this.style.fontFamily);
        this.style.borderColor = "blue";
        $(this).siblings("li").each((i, li) => { li.style.borderColor = "unset"; });
        GM_setValue("knauz_font", $(this).parent().children("li").index(this));
    }

    function set_size() {
        var fontSize = parseInt($("body").css("font-size")) || 16;
        let multiplier = $(this).data("multiplier");
        let newFontSize = Math.floor(fontSize * multiplier);
        // catch cases where difference is too small
        if (newFontSize == fontSize) { newFontSize += (multiplier < 1 ? -1 : 1); }
        $("body").css("font-size", newFontSize + "px");
        GM_setValue("knauz_size", newFontSize);
    }

    // bger.ch
    $("link").remove();
    $("a.noprint").remove();
    $("#ns4_info").remove();
    $(".pagebreak").remove();
    $(".paraatf").each((i, para) => {
        para.innerHTML = para.innerHTML.replace(/\(([^(]+?)(\(.+?\))*?\)/g, replacement);
    });

    // custom simple css
    GM_addStyle(style);

    // settings
    GM_addStyle(settingsCss);
    $(settings).appendTo("body");
    $("#knauz_scheme > li").click(set_scheme);
    $("#knauz_font > li").click(set_font);
    $("#knauz_size > li").click(set_size);

    // restore saved settings
    var schemes = $("#knauz_scheme > li");
    var scheme = Math.max(0, Math.min(schemes.length - 1, GM_getValue("knauz_scheme", 0)));
    schemes.eq(scheme).trigger("click");

    var fonts = $("#knauz_font > li");
    var font = Math.max(0, Math.min(fonts.length - 1, GM_getValue("knauz_font", 0)));
    fonts.eq(font).trigger("click");

    var size = GM_getValue("knauz_size", 16);
    $("body").css("font-size", size + "px");

})();
