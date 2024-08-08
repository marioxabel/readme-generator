import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

const licenses = [
    { name: 'Academic Free License v3.0', keyword: 'AFL-3.0' },
    { name: 'Apache license 2.0', keyword: 'Apache-2.0' },
    { name: 'Artistic license 2.0', keyword: 'Artistic-2.0' },
    { name: 'Boost Software License 1.0', keyword: 'BSL-1.0' },
    { name: 'BSD 2-clause "Simplified" license', keyword: 'BSD-2-Clause' },
    { name: 'BSD 3-clause "New" or "Revised" license', keyword: 'BSD-3-Clause' },
    { name: 'BSD 3-clause Clear license', keyword: 'BSD-3-Clause-Clear' },
    { name: 'BSD 4-clause "Original" or "Old" license', keyword: 'BSD-4-Clause' },
    { name: 'BSD Zero-Clause license', keyword: '0BSD' },
    { name: 'Creative Commons license family', keyword: 'CC' },
    { name: 'Creative Commons Zero v1.0 Universal', keyword: 'CC0-1.0' },
    { name: 'Creative Commons Attribution 4.0', keyword: 'CC-BY-4.0' },
    { name: 'Creative Commons Attribution ShareAlike 4.0', keyword: 'CC-BY-SA-4.0' },
    { name: 'Do What The F*ck You Want To Public License', keyword: 'WTFPL' },
    { name: 'Educational Community License v2.0', keyword: 'ECL-2.0' },
    { name: 'Eclipse Public License 1.0', keyword: 'EPL-1.0' },
    { name: 'Eclipse Public License 2.0', keyword: 'EPL-2.0' },
    { name: 'European Union Public License 1.1', keyword: 'EUPL-1.1' },
    { name: 'GNU Affero General Public License v3.0', keyword: 'AGPL-3.0' },
    { name: 'GNU General Public License family', keyword: 'GPL' },
    { name: 'GNU General Public License v2.0', keyword: 'GPL-2.0' },
    { name: 'GNU General Public License v3.0', keyword: 'GPL-3.0' },
    { name: 'GNU Lesser General Public License family', keyword: 'LGPL' },
    { name: 'GNU Lesser General Public License v2.1', keyword: 'LGPL-2.1' },
    { name: 'GNU Lesser General Public License v3.0', keyword: 'LGPL-3.0' },
    { name: 'ISC', keyword: 'ISC' },
    { name: 'LaTeX Project Public License v1.3c', keyword: 'LPPL-1.3c' },
    { name: 'Microsoft Public License', keyword: 'MS-PL' },
    { name: 'MIT', keyword: 'MIT' },
    { name: 'Mozilla Public License 2.0', keyword: 'MPL-2.0' },
    { name: 'Open Software License 3.0', keyword: 'OSL-3.0' },
    { name: 'PostgreSQL License', keyword: 'PostgreSQL' },
    { name: 'SIL Open Font License 1.1', keyword: 'OFL-1.1' },
    { name: 'University of Illinois/NCSA Open Source License', keyword: 'NCSA' },
    { name: 'The Unlicense', keyword: 'Unlicense' },
    { name: 'zLib License', keyword: 'Zlib' }
]
// create array with only the names
const licenceNameArray = licenses.map(license => license.name)

console.log(chalk.bold.bgGreen('Welcome to ReadMe Generator'))

inquirer
    .prompt([
        {
            type: 'input',
            message: `Enter your project ${chalk.blue('title')} to start: \n`,
            name: 'title'
        },
        {
            type: 'input',
            message: `Enter your project ${chalk.blue('description')}: \n`,
            name: 'description'
        },
        {
            type: 'input',
            message: `Enter your project ${chalk.blue('installation instructions')}: \n`,
            name: 'installation'
        },
        {
            type: 'input',
            message: `Enter your project ${chalk.blue('usage instructions')}: \n`,
            name: 'usage'
        },
        {
            type: 'list',
            message: `Select your project ${chalk.blue('license')}: \n`,
            name: 'license',
            choices: licenceNameArray,
        },
        {
            type: 'input',
            message: `Enter your project ${chalk.blue('contribute instructions')}: \n`,
            name: 'contribute'
        },
        {
            type: 'input',
            message: `Enter your ${chalk.blue('github username')}: \n`,
            name: 'github'
        },
        {
            type: 'input',
            message: `Enter your ${chalk.blue('email')}: \n`,
            name: 'email'
        },


    ])
    .then(({ title, description, installation, usage, license, contribute, github, email }) => {
        //Get license info from the array
        const licenseInfo = licenses.filter(licenseSelected => licenseSelected.name === license)
        // format license abbreviaton for using in badge
        const licenseAbb = licenseInfo[0].keyword.replaceAll(/-/g, '%20')

        const readme = 
`
![Static Badge](https://img.shields.io/badge/licence-${licenseAbb}-blue?style=flat)

# ${title}

## Description
${description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [How to Contribute](#how-to-contribute)
- [Questions](#questions)
- [License](#license)

## Installation
${installation}

## Usage
${usage}

## How to Contribute
If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Questions
Go the extra mile and write tests for your application. Then provide examples on how to run them here.

## License
Distributed under the ${licenseInfo[0].name}. [Click to see the full ${licenseInfo[0].keyword} license](https://choosealicense.com/licenses/${licenseInfo[0].keyword.toLowerCase()}/).
---
`

        fs.writeFile('./result/README.md', readme, err => {
            if (err) {
              console.error(err);
            } else {
              console.log(chalk.bgGreen('Readme generated successfully on /result folder'))
            }})
    })


// Description, 
// Table of Contents, 
// Installation, 
// Usage, 
// License, (choose a licence from list)
// Contributing, 
// Tests, 
// Questions (enter github, enter email address, adn instructions)

