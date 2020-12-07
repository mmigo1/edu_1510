// ==UserScript==
// @name         Yandex bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];
let word = words[getRandom(0,words.length)];
let yandexInput = document.getElementsByName("text")[0];
let button = document.getElementsByClassName("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0];
if (button!=undefined){
    let i = 0;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word [i];
        i++;
        if(i== word.length){
            clearInterval(timerId);
            button.click();
        }
    },550);
}else{
    let x = document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0];
    let pageNum = x.textContent
    let pageButton = document.getElementsByClassName("pager__item_kind_next")[0];
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
            setTimeout(()=>{link.click();},1000);
            linkIsFound = true;
            break;
        }
    }if(!linkIsFound && pageNum<10){
        setTimeout(()=>{pageButton.click();},1000)
    }else if (!linkIsFound){
        location.href = "https://yandex.ru/";
    }
}
