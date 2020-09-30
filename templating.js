const fs = require('fs');
const Handlebars = require('handlebars');
const helpers = require('./helpers.js');

const templateCache = new Map();
module.exports = function templating (config) {
  config = Object.assign({}, {
    match: '**',
  }, config);

  return function (files, smith) {
    const matched = helpers.match(Object.keys(files), config.match);
    for (let fileName of matched) {
      const file = files[fileName];
      file.contents = Handlebars.compile(file.contents.toString())(file);
      helpers.renameExtension(files, fileName, 'html');
    }
  }
}
