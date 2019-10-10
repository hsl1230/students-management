const { exec } = require('child_process');
var version = require('./dist/students-management-lib-fe/package').version;
var packageName = 'students-management-lib-fe@' + version
exec(`npm view ${packageName} version`, (err, stdout, stderr) => {
  if (err) {
    process.exit(1);
  }

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    process.exit(1);
  }

  if (stdout) {
    console.log(`${packageName} already exists!`);
    console.log(`stdout: ${stdout}`);
    process.exit(1);
  } else {
    console.log(`${packageName} does not exists.`);
  }
});
