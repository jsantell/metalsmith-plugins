const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const helpers = require('./helpers.js');

module.exports = function meta (config) {
  config = Object.assign({}, {
    match: '**',
    key: 'data',
  }, config);

  config.key = Array.isArray(config.key) ? config.key : [config.key];

  return function (files, smith) {
    const matched = helpers.match(Object.keys(files), config.match);
    for (let fileName of matched) {
      const file = files[fileName];
      for (let key of config.key) {
        if (!file[key]) {
	  continue;	
	}
        try {
          const f = path.join(smith.source(), path.dirname(fileName), file[key]);
	  const str = fs.readFileSync(`${path.normalize(f)}`, 'utf8');
          const data = yaml.safeLoad(str);
          file[key] = data;
        } catch (e) {
          console.log(e);
	}
      }
    }
  }
}
