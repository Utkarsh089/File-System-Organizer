#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");



let inputArr = process.argv.slice(2);

// node main.js organize "dirictory path"
// node main.js tree "dirictory path"
// node main.js help

let command = inputArr[0];
switch (command) {
    case "organize": 
        organizeObj.organizekey(inputArr[1]);
        break;
    case "tree": 
        treeObj.treekey(inputArr[1]);
        break;
    case "help": 
        helpObj.helpkey();
        break;
    default:
        console.log("Please enter correct the command.");

}




