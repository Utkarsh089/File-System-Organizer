function help() {
    console.log(`
Commands List:
    organize: node main.js organize "dirictory path"
    tree: node main.js tree "dirictory path"
    help: node main.js help
    `);
}

module.exports = {
    helpkey : help
}