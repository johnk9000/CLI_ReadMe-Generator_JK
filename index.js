const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const year = 2020;

const licenseChoices = [
    {
        license: "license-1",
        name: "Apache 2.0",
        badgeUrl: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
        clause: `Copyright ` + year + ` [name of copyright owner]

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
     
            http://www.apache.org/licenses/LICENSE-2.0
     
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.`,
    },
    {
        license: "license-2",
        name: "Eclipse",
        badgeUrl: `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
        clause: `THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.`
    }
];

var questions = [
    {
        type: "input",
        name: "appTitle",
        message: `
    Welcome to README-GEN v1.2.4 by JK, 
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
        type: "checkbox",
        name: "license",
        message:`
        Choose License Agreement`,
        choices: [
            licenseChoices[0].name,
            licenseChoices[1].name
        ]
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
        name: "email",
        message: `
        What is your e-mail?
        `
    },
];

function prompt()  {

    return inquirer.prompt(questions);
}

function readMeBody(data) {
        console.log('generating body...')
    // Table of Contents: 
    return "\n ## Description \n" + data.description + "\n ## Installation Instructions \n" + data.installGuide + "\n ## Usage Information \n" + data.usageInfo + "\n ## Contribution Guidelines \n" + data.contributions + "\n ## Test Instructions \n" + data.testGuide;
}

function tocGen(data) {
        console.log('generating header...')
    let licBadge;
    if(data.license == licenseChoices[0].name){
        licBadge = licenseChoices[0].badgeUrl;
    } else {
        licBadge = licenseChoices[1].badgeUrl;
    }
return `# ${data.appTitle} 
${licBadge}
### Table of Contents
  * [Description](#description)
  * [Installation Instructions](#installation-instructions)
  * [Usage Information](#usage-information)
  * [Contribution Guidelines](#contribution-guidelines)
  * [Test Instructions](#test-instructions)
  * [License Information](#license-information)
  * [Questions](#Questions)
`
}

function footerGen(data) {
        console.log('generating footer...')
    let licClause;
    if(data.license == licenseChoices[0].name){
        licClause = licenseChoices[0].clause;
    } else {
        licClause = licenseChoices[1].clause;
    }
    let gitHubUrl = `http://github.com/${ data.gitHubUser }`

    return `

## License Information
${ licClause }
## Questions
### Contact
* ${ gitHubUrl }
* ${ data.email }`
}

async function init() {
    try {
        const data = await prompt();
        console.log("Generating README")
        const tableOfCont = tocGen(data);
        const content = readMeBody(data);
        const footer = footerGen(data);
        let fileName = "protoREADME.md"
        // (Over)writing file name ** remember to change to variable **
        await writeFileAsync(fileName, tableOfCont);
        // Appending Body of README to file
        await appendFileAsync(fileName, content);
        // Appending Footer of REAME to file
        await appendFileAsync(fileName, footer);
    } catch(err) {
        console.log(err);
    }
    console.log('created README.md')
}

init();