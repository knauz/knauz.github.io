// ==UserScript==
// @name         BGE readability enhancer
// @namespace    http://stef.fi/
// @version      0.1
// @description  increase readability for published swiss BGE
// @author       Alexander Ried, Stephanie Blaettler
// @match        http://relevancy.bger.ch/php/clir/http/index.php?*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

var style = `
body {
    background: hsla(210, 60%, 16%, 1);
    color: hsla(230, 100%, 100%, 1);
    width: 40em;
    margin: 0px auto;
    font-family: Helvetica;
    font-size: large;
    line-height: 1.5;
}
a { color: hsla(230, 100%, 100%, 1); }
details[open] { background: darkgrey }
.big { font-size: large; }
.bold { font-weight: bold; }
`;

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

(function() {
    'use strict';

    $("link").remove();
    $("a.noprint").remove();
    $("#ns4_info").remove();
    $(".pagebreak").remove();

    var paras = $(".paraatf");
    paras.each((i, para) => {
        para.innerHTML = para.innerHTML.replace(/\(([^(]+?)(\(.+?\))*?\)/g, replacement);
    });

    GM_addStyle(style);
})();
