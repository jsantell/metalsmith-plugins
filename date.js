const path = require('path');
const fs = require('fs');
const formatDate = require('date-fns').format;
const helpers = require('./helpers.js');

const defaultFormat = 'MMMM DD, YYYY';

module.exports = function meta (config) {
  config = Object.assign({}, {
    match: '**',
    dates: {
      date: {
        key: 'date',
        format: defaultFormat,
      }
    },
  }, config);

  return function (files, smith) {
    const matched = helpers.match(Object.keys(files), config.match);
    for (let fileName of matched) {
      const file = files[fileName];

      for (let prop of Object.keys(config.dates)) {
        const def = config.dates[prop];
        let input = file[def.key || prop];
        if (input) {
	  if (input instanceof Date) {
	    input = `${input.getUTCFullYear()}-${input.getUTCMonth() + 1}-${input.getUTCDate()}`;	  
	  }
          file[prop] = formatDate(input, def.format || defaultFormat);
        }
      }
    }
  }
}
