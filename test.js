const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

var questions = [
    {
        type: "input",
        name: "appTitle",
        message: `
    Welcome to README-GEN v1.0.0 by JK, 
    May I have the title of your project?
    `,
    },
    // WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
    {
        type: "input",
        name: "description",
        message: `
    Enter Description: 
    `  
    },
    {
        type: "input",
        name: "installGuide",
        message: `
    Enter Install Instructions: 
    `  
    },
    {
        type: "input",
        name: "usageInfo",
        message: `
    Enter Usage Information: 
    `  
    },
    {
        type: "input",
        name: "contributions",
        message: `
    Enter Contribution Guidelines: 
    `  
    },
    {
        type: "input",
        name: "testGuide",
        message: `
    Enter Test Instructions: 
    `  
    },
    {
        type: "input",
        name: "gitHubUser",
        message: `
        What is your GitHub Username?
        `
    },
    {
        type: "input",
        name: "linkedInUser",
        message: `
        What is your LinkedIn Username?
        `
    },
];

function prompt()  {

    return inquirer.prompt(questions);
}

function readMeBody(data) {
    // Table of Contents: 
    return "\n ## Description \n" + data.description + "\n ## Installation Instructions \n" + data.installGuide + "\n ## Usage Information \n" + data.usageInfo + "\n ## Contribution Guidelines \n" + data.contributions + "\n ## Test Instructions \n" + data.testGuide;
}

function tocGen(data) {
    
return `# ${data.appTitle}
### Table of Contents
  * [Description](#description)
  * [Installation Instructions](#installation-instructions)
  * [Usage Information](#usage-information)
  * [Contribution Guidelines](#contribution-guidelines)
  * [Test Instructions](#test-instructions)
  * [Questions](#Questions)
`
}

async function init() {
    try {
        const data = await prompt();

        const content = readMeBody(data);
        const tableOfCont = tocGen(data);

        await writeFileAsync("protoREADME.md", tableOfCont);
        await appendFileAsync("protoREADME.md", content);


    } catch(err) {
        console.log(err);
    }
}

init();


// async function readmeGen(data) {
//     try {
//         await appendFileAsync("protoREADME.md", "## " + data.appTitle);
//         for(let i = 1; i < data.length; i++) {
//         await appendFileAsync("protoREADME.md", "# " + data[i]);
//         }
//     } catch(err) {
//         console.log(err);
//     }
// }