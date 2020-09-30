const path = require('path');
const fs = require('fs');
const helpers = require('./helpers.js');

module.exports = function permalink (config) {
  config = Object.assign({}, {
    match: '**',
    host: '',
  }, config);

  return function (files, smith) {
    const matched = helpers.match(Object.keys(files), config.match);
    for (let fileName of matched) {
      const file = files[fileName];
      const { dir, name, ext } = path.parse(fileName);
      let p = `${dir}/${name}.html`;
      if (name === 'index') {
        p = `${dir}/`; 
      }
      file.relativelink = `${p.charAt(0) === '/' ? '' : '/'}${p}`;
      file.permalink = `${config.host}${file.relativelink}`;
    }
  }
}
