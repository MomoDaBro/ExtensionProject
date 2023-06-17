import {parse} from 'csv-parse/sync';
import {GITHUB_TOKEN} from "./env";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const findCourseInfo = () => {
    const classInfoULElement = document.querySelector(".css-fgox3d-fieldsCss") as HTMLUListElement
    const spanElements = classInfoULElement.querySelectorAll("span")
    return [
        spanElements[Array.from(spanElements).findIndex((element) => element.innerText === "Instructor") + 1].innerText,
        spanElements[Array.from(spanElements).findIndex((element) => element.innerText === "Subject") + 1].innerText,
        spanElements[Array.from(spanElements).findIndex((element) => element.innerText === "Course") + 1].innerText
    ]
}

const formatProfName = (profName: string) => {
    let stringArray = profName.split(" ", 2)
    return stringArray[1] + ", " + stringArray[0]
}

const main = async () => {
    //TODO implement a better way to wait for elements to load LINK: https://stackoverflow.com/questions/36759715/chrome-extension-waiting-for-element-to-load-async-js
    await sleep(2500)

    const classInfoToggleButton = document.querySelector(".css-3dpgnn-hoverStyles-hoverStyles-defaultStyle-hoverStyles-btnCss") as HTMLButtonElement
    classInfoToggleButton.click()
    classInfoToggleButton.click()

    let [profName, courseName, courseNum] = findCourseInfo()
    profName = formatProfName(profName)
    console.log(profName)
    console.log(courseName)
    console.log(courseNum)

    //TODO retrieve the fall 2022 CSV from utd grades repo

    const gradeDataURL = "https://api.github.com/repos/acmutd/utd-grades/contents/raw_data/Fall 2022.csv"
    const headers = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28"
    }

    const UTDGradesData = (await (await fetch(gradeDataURL, {headers})).json()).content
    type classInfo = {
        Subject: string,
        'Catalog Nbr': string,
        'Instructor 1': string,
        'Instructor 2': string,
        'Instructor 3': string,
        'Instructor 4': string,
        'Instructor 5': string,
        'Instructor 6': string,
        'A+': string,
        'A': string,
        'A-': string,
        'B+': string,
        'B': string,
        'B-': string,
        'C+': string,
        'C': string,
        'C-': string,
        'D+': string,
        'D': string,
        'D-': string,
        'F': string,
        'W': string,
    }

    const parsedData: classInfo[] = parse(Buffer.from(UTDGradesData, 'base64'), {
        columns: true
    })

    console.log(parsedData)

    let courseMatchArr: classInfo[] = []

    for (let i = 0; i < parsedData.length; i++) {
        if (parsedData[i]["Instructor 1"] === profName) {
            if (parsedData[i].Subject === courseName && parsedData[i]["Catalog Nbr"] == courseNum) {
                courseMatchArr.push(parsedData[i])
            }
        } else if (parsedData[i]["Instructor 2"] === profName) {
            if (parsedData[i].Subject === courseName && parsedData[i]["Catalog Nbr"] == courseNum) {
                courseMatchArr.push(parsedData[i])
            }
        } else if (parsedData[i]["Instructor 3"] === profName) {
            if (parsedData[i].Subject === courseName && parsedData[i]["Catalog Nbr"] == courseNum) {
                courseMatchArr.push(parsedData[i])
            }
        } else if (parsedData[i]["Instructor 4"] === profName) {
            if (parsedData[i].Subject === courseName && parsedData[i]["Catalog Nbr"] == courseNum) {
                courseMatchArr.push(parsedData[i])
            }
        } else if (parsedData[i]["Instructor 5"] === profName) {
            if (parsedData[i].Subject === courseName && parsedData[i]["Catalog Nbr"] == courseNum) {
                courseMatchArr.push(parsedData[i])
            }
        } else if (parsedData[i]["Instructor 6"] === profName) {
            if (parsedData[i].Subject === courseName && parsedData[i]["Catalog Nbr"] == courseNum) {
                courseMatchArr.push(parsedData[i])
            }
        }
    }

    console.log(courseMatchArr)

}
main();