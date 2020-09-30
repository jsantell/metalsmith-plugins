const path = require('path');
const fs = require('fs');
const helpers = require('./helpers.js');

module.exports = function meta (config={}) {
  return function (files, smith) {
    const meta = smith.metadata(); 
    for (let fileName of Object.keys(files)) {
      const file = files[fileName];
      Object.assign(file, config);
      file.global = meta;
    }
  }
}
