var fs = require('fs');
var fsExtra = require('fs-extra');

function appendFileContent(filename, content, stream) {
  if (!/\.(js)$/.test(filename)) {
    console.log(filename, 'is ignored!')
    return false;
  }

  if (/students-management-element/.test(filename)) {
    console.log(filename, 'is ignored!')
    return false;
  }

  stream.write('//js file: ' + filename + '\n');
  stream.write(content);
  stream.write('\n');
  console.log(filename, 'is appended!')
}

function onError(error) {
  console.error('Error:', error);
}

function contactFiles(dirname, appendFileContent, onError) {
  var targetStream = fs.createWriteStream("./static/students-management/assets/javascripts/students-management-element.js", {flags:'w'});
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames = filenames.filter(name => name.match(/.*\.(js|css)$/));
    filenames = filenames.sort((name1, name2) => name2.localeCompare(name1));
    var index = filenames.findIndex(name => name.startsWith('main'))

    filenames.forEach(function(filename) {
      var content = fs.readFileSync(dirname + filename, 'utf-8');
      if (filename.endsWith('.css')) {
        fs.copyFileSync(dirname + filename, './static/students-management/assets/stylesheets/students-management-element.css');
      }
      appendFileContent(filename, content, targetStream);
    });
    targetStream.end();
  });
}

(function() {
  var dirname = './dist/students-management-element/';
  console.log(dirname);
  fsExtra.ensureDirSync('./static/students-management');
  fsExtra.emptyDirSync('./static/students-management');
  fsExtra.ensureDirSync('./static/students-management/assets/javascripts');
  fsExtra.ensureDirSync('./static/students-management/assets/stylesheets');
  fsExtra.copySync('dist/students-management-element/assets', './static/students-management/assets/')

  contactFiles(dirname, appendFileContent, onError);
})();

