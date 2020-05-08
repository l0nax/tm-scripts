// ==UserScript==
// @name        JIRA branch name copier
// @namespace   https://l0nax.io
// @version     0.3.1
// @match       https://www.fabmation.info/jira/*
// @author      l0nax
// @copyright   2020, Francesco Emanuel Bennici <benniciemanuel78@gmail.com>
// @license     MIT
// @description Convert the Jira Issue ID + Title into an usable branch name and put it into the clipboard.
//
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js
//
// @updateURL   https://openuserjs.org/meta/l0nax/JIRA_branch_name_copier.meta.js
// @downloadURL https://openuserjs.org/install/l0nax/JIRA_branch_name_copier.user.js
//
// @grant       GM_addStyle
// @grant       GM_setClipboard
// ==/UserScript==

// ==OpenUserJS==
// @author l0nax
// ==/OpenUserJS==

GM_addStyle(`
.copy-branch-btn-wrapper {
    display: flex;
    position: relative;
}

.create-branch-btn {
    box-sizing: border-box;
    transition: background-color .1s ease-out;
    border-radius: 3.01px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-variant: normal;
    font-weight: 400;
    background-image: none;
    background-color: rgba(9,30,66,.08);
    border: 1px solid transparent;
    color: #344563;
    text-decoration: none;
    display: inline-block;
    height: 2.14285714em;
    line-height: 1.42857143em;
    margin: 0;
    padding: 4px 10px;
    vertical-align: baseline;
    white-space: nowrap;
}

.create-branch-btn:hover {
    color: rgb(23, 43, 77) !important;
    background: rgb(223, 225, 230) !important;
}

.create-branch-btn:active, .create-branch-btn:focus {
    color: rgb(0, 82, 204) !important;
    background: rgba(179, 212, 255, 0.6);
}

#jbng-toast {
  visibility: hidden;
  margin-left: -125px;
  background-color: #169c16;
  color: #000;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

#jbng-toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
`);

(function() {
    'use strict';
    const lastBreadcrumb = _.last(document.querySelectorAll('a[id*="key-val"]'));

    const kebabCase = (str) => {
        return string.replace(/([a-z])([A-Z])/g, "$1-$2")
                     .replace(/\s+/g, '-')
                     .toLowerCase();
    }

    function createBranchName(){
        const jiraTitle = document.querySelectorAll('h1')[2].innerText
        const jiraId = lastBreadcrumb.innerText

        GM_setClipboard(`${jiraId}_${_.kebabCase(jiraTitle)}`, "text");
    }

    $(lastBreadcrumb).after(`
                <input type="button" class="create-branch-btn" value="Copy branch name 📋" id="create-branch-name">
    `);

    $(`<div id="jbng-toast">Copied</div>`).appendTo("body");

    $('#create-branch-name').on('click', () => {
            // copy branch name to clipboard
        createBranchName();

        // show notification toast and hide it after 3s
        var toast = document.getElementById("jbng-toast");
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 1500);
    })
})();
