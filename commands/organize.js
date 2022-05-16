const fs = require("fs");
const path = require("path");

const categoryTypes = {
    media: ["mp4", "mkv", 'jpg', 'jpeg'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'html', 'odt', 'ods', 'pptx', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'cpp'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organize(dirpath) {
    // console.log("Organize commmand implemented for",dirpath);
    //Steps
    //1. Input -> directory name -> given
    if (dirpath == undefined) {
        dirpath = process.cwd();
    }
    else {
        if (fs.existsSync(dirpath) == false) {
            console.log("Please enter the correct path.");
            return;
        }
        else if (fs.lstatSync(dirpath).isFile()) {
            console.log("Please enter a directory path not a file path.");
            return;
        }
    }
     //2. Create -> organized_files -> directory
     let destPath = path.join(dirpath, "organized_folder");
     if (fs.existsSync(destPath) == false)
          fs.mkdirSync(destPath);

     organizeHelper(dirpath, destPath);


}

function organizeHelper(src, dest) {
    //3. Identify Categories of all files present in that input dirctory 
    let childnames = fs.readdirSync(src);

    for (let i = 0; i < childnames.length; i++) {
        let childPath = path.join(src, childnames[i]);

        let isFile = fs.lstatSync(childPath).isFile();
        if (isFile) {
            const extname = path.extname(childPath).slice(1);
            let category = categoryFn(extname);
            //4. cut/copy files to that organize_folder according to their category.
            sendFiles(childPath, dest, category);
        }
    }
}

function categoryFn(extension) {
    for (let type in categoryTypes) {
        let categoryArr = categoryTypes[type];
        for (let i = 0; i < categoryArr.length; i++) {
            if (extension == categoryArr[i])
                return type;
        }
    }
}

function sendFiles(src, dest, category) {
    let basename = path.basename(src);
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false)
        fs.mkdirSync(categoryPath);

    let newpath = path.join(categoryPath, basename);
    fs.writeFileSync(newpath);
    fs.copyFileSync(src, newpath);
    console.log("Successfully copied file", basename);

}

module.exports = {
    organizekey : organize
}