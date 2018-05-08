var bluebird = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');
var ncp = bluebird.promisify(require('ncp').ncp);
var rename = bluebird.promisify(fs.rename);

ncp.limit = 16;

var newProjectDir = (function () {

    if (process.argv[2]) {
        return path.resolve(process.cwd(), process.argv[2]);
    }

    return path.join(process.cwd(), 'generated');

})();

var generatorFilesPath = path.join(__dirname, '../generated');


var copyFiles = function () {
    return ncp(generatorFilesPath, newProjectDir);
};

var renameGitignore = function () {
    var oldPath = path.join(newProjectDir, 'gitignore.txt');
    var newPath = path.join(newProjectDir, '.gitignore');
    return rename(oldPath, newPath);
};

console.log(chalk.green('Generating your new, poppin\' fresh application...'));

copyFiles()
.then(renameGitignore)
.then(fs.writeFile(path.join(__dirname, '../package.json'), 'TEST', function (err) {
  if (err) throw err;
  console.log('Saved!');
}))
.then(function () {
  console.log(chalk.blue('All done!'));
  console.log(chalk.red('Do not forget to'), chalk.yellow('npm install!'));
})
.catch(function (err) {
  console.error(err);
});
