const fs = require("fs");
const path = require("path");

function tree(givenpath) {
    
    if (givenpath == undefined) {
        treeHelper(process.cwd(), "");
    }
    else {
        if (fs.existsSync(givenpath) == false) {
            console.log("Please enter correct path.");
            return;
        }
        else {
            treeHelper(givenpath, "");
        }



    }
}



function treeHelper(givenpath, indendation) {
    let isFile = fs.lstatSync(givenpath).isFile();
    if (isFile) {
        console.log(indendation, "├───", path.basename(givenpath));
    }
    else {
        console.log(indendation, "└───", path.basename(givenpath));
        let childnames = fs.readdirSync(givenpath);
        for (let i = 0; i < childnames.length; i++) {
            let childPath = path.join(givenpath, childnames[i]);
            treeHelper(childPath, indendation + "\t");
        }
    }

}


module.exports = {
    treekey : tree
}