var bluebird = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var ncp = bluebird.promisify(require('ncp').ncp);

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

console.log(chalk.green('Generating your new, poppin\' fresh application!'));
copyFiles().then(function () {
    console.log(chalk.blue('All done!'));
    console.log(chalk.red('Do not forget to'), chalk.yellow('npm install'), 'AND', chalk.green('gulp build'));
});
