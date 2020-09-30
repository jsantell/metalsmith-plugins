const path = require('path');
const multimatch = require('multimatch');

module.exports = {
  match(files, pattern) {
    files = Array.isArray(files) ? files : [files];
    pattern = Array.isArray(pattern) ? pattern : [pattern];
    return multimatch(files, pattern);
  },

  renameExtension(files, fileName, newExtension) {
    const parsed = path.parse(fileName);
    const file = files[fileName];
    delete files[fileName];
    files[`${path.join(parsed.dir, parsed.name)}.${newExtension}`] = file;
  }
}
