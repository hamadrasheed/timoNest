const shell = require('shelljs');

shell.cp('-R', 'dist/*', 'build');
shell.cp('-R', 'package.json', 'build/');
shell.cp('-R', 'package-lock.json', 'build/');
shell.cp('-R', '.sequelizerc_build', 'build/.sequelizerc');
