import { parse } from 'csv-parse/sync';
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

    //TODO retrieve the fall 2022 CSV from utd grades repo

    const gradeDataURL = "https://api.github.com/repos/acmutd/utd-grades/contents/raw_data/Fall 2022.csv"
    const headers = {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer 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",
        "X-GitHub-Api-Version": "2022-11-28"
    }

    const UTDGradesData = (await (await fetch(gradeDataURL, {headers})).json()).content

    //NOTE parse this csv to find the correct data for professor
    console.log(parse(Buffer.from(UTDGradesData, 'base64')))

}
main();