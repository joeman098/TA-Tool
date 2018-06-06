const { lstatSync, readdirSync, statSync } = require("fs");
const { join } = require("path");
const inquirer = require("inquirer");
const nfs = require("file-system");

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);
const allUnit = getDirectories(".");
const main = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        choices: allUnit,
        name: "input"
      }
    ])
    .then(input => {
      const pickUnit = getDirectories("./" + input.input);
      const unitActiv = getDirectories(input.input + "/01-Activities");
      for (let index = 0; index < pickUnit.length; index++) {
        for (let i = 0; i < unitActiv.length; i++) {
          try {
            nfs.rmdirSync(unitActiv[i] + "/solved");
          } catch (err) {}
        }

        try {
          nfs.rmdirSync(pickUnit[index] + "/gradingRubrics");
        } catch (err) {}
        try {
          nfs.rmdirSync(pickUnit[index] + "/Solutions");
        } catch (err) {}
      }
    });
};
main();
