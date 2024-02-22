// ==UserScript==
// @name         GitLab Mermaid patch color-scheme
// @namespace    https://l0nax.org
// @version      2024-02-22
// @description  Force the iframe of mermaid to render in dark mode
//
// @author       l0nax
// @copyright    2024, Francesco Emanuel Bennici <emanuel@l0nax.org>
// @license      MIT
//
// @grant        none
// @match        https://gitlab.fabmation.info/*/sandbox/mermaid*
// ==/UserScript==

(function() {
  'use strict';

  window.addEventListener('load', function() {
    const colorScheme = document.getElementsByName("color-scheme");
    if (colorScheme) {
      colorScheme[0].content = "dark";
    }
  }, false);
})();
