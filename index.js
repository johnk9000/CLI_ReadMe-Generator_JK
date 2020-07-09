const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

async function getRepos() {
    inquirer
    .prompt({
        message: "Enter your GitHub username",
        name: "username"
    })
    .then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        axios.get(queryUrl)
        .then(function(res) {
                //console.log(res.data[0]);
            const repoTitle = res.data.map(repo => repo.title);
            const repoNames = res.data.map(repo => repo.name);
            const repoLic = res.data.map(repo => repo.license);
                //console.log(repoTitle, repoNames, repoLic);
        })
    })
};

// WHEN I am prompted for information about my application repository
// THEN a quality, professional README.md is generated with the title of your project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// WHEN I enter my project title
// THEN this is displayed as the title of the README


let count = 0;
inquirer
    .prompt([
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
    }
    ]).then(function(data){
        count++;
        console.log(data.appTitle);
        // storing user input for **project Title** and create ReadMe . md
            // const content = "# " + data.appTitle + "\n ## Description \n" + data.description + "\n ## Installation Instructions \n" + data.installGuide + "\n ## Usage Information \n" + data.usageInfo + "\n ## Contribution Guidelines \n" + data.contributions + "\n ## Test Instructions \n" + data.testGuide;
            const content = ["# " + data.appTitle,"\n ## Description \n" + data.description, "\n ## Installation Instructions \n" + data.installGuide, "\n ## Usage Information \n" + data.usageInfo, "\n ## Contribution Guidelines \n" + data.contributions, "\n ## Test Instructions \n" + data.testGuide];

            return appendFileAsync("protoREADME-" + count + ".md", JSON.stringify(content.split(',')));
    }).catch(err => {
        console.log(err)
      });
  
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests

// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added hear the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile

// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README