const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const findProfName = () => {
    const classInfoULElement = document.querySelector(".css-fgox3d-fieldsCss") as HTMLUListElement

    const spanElements = classInfoULElement.querySelectorAll("span")

    return spanElements[Array.from(spanElements).findIndex((element) => element.innerText === "Instructor") + 1].innerText
}

const main = async () => {
    //TODO implement a better way to wait for elements to load LINK: https://stackoverflow.com/questions/36759715/chrome-extension-waiting-for-element-to-load-async-js
    await sleep(2500)

    const classInfoToggleButton = document.querySelector(".css-3dpgnn-hoverStyles-hoverStyles-defaultStyle-hoverStyles-btnCss") as HTMLButtonElement
    classInfoToggleButton.click()
    classInfoToggleButton.click()

    const profName = findProfName();
    console.log(profName)
}

main();