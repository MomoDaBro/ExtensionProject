"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const findProfName = () => {
    const classInfoULElement = document.querySelector(".css-fgox3d-fieldsCss");
    const spanElements = classInfoULElement.querySelectorAll("span");
    return spanElements[Array.from(spanElements).findIndex((element) => element.innerText === "Instructor") + 1].innerText;
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    //TODO implement a better way to wait for elements to load LINK: https://stackoverflow.com/questions/36759715/chrome-extension-waiting-for-element-to-load-async-js
    yield sleep(2500);
    const classInfoToggleButton = document.querySelector(".css-3dpgnn-hoverStyles-hoverStyles-defaultStyle-hoverStyles-btnCss");
    classInfoToggleButton.click();
    classInfoToggleButton.click();
    const profName = findProfName();
    console.log(profName);
});
main();
//# sourceMappingURL=content.js.map