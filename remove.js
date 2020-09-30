const helpers = require('./helpers.js');

module.exports = function remove (config) {
  config = Object.assign({}, {
    match: '',
  }, config);

  return function (files, smith) {
    const matched = helpers.match(Object.keys(files), config.match);
    for (let fileName of matched) {
      delete files[fileName]
    }
  }
}
