module.exports = function meta (config={}) {
  return function (files, smith) {
    for (let fileName of Object.keys(files)) {
      const file = files[fileName];
      file.csp = Object.keys(config).map(key => `${key} ${config[key]}`).join('; ');
    }
  }
}
