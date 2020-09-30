const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const helpers = require('./helpers.js');

const templateCache = new Map();
module.exports = function layout (config) {
  config = Object.assign({}, {
    directory: 'layouts',
    partials: 'partials',
    match: '**',
    key: 'layout',
    engine: 'hbs', // no other options right now
  }, config);

  let partialsRegistered = false;

  return function (files, smith) {
    const templateDir = smith.path(config.directory);
    const partialsDir = smith.path(config.partials);

    if (!partialsRegistered) {
      try {
        const partials = fs.readdirSync(partialsDir);
        for (let partial of partials) {
          const str = fs.readFileSync(path.join(partialsDir, partial), 'utf8');
          Handlebars.registerPartial(path.basename(partial, '.hbs'), str);
        }
      } catch (e) {
      }
      partialsRegistered = true;
    }

    const matched = helpers.match(Object.keys(files), config.match);
    for (let fileName of matched) {
      const file = files[fileName];
      const layoutName = file[config.key];

      if (!layoutName) {
        continue;
      }


      let template;
      if (templateCache.has(layoutName)) {
        template = templateCache.get(layoutName); 
      } else {
        const str = fs.readFileSync(path.join(config.directory, `${layoutName}.${config.engine}`), 'utf8');
        template = Handlebars.compile(str);
        templateCache.set(layoutName, template); 
      }

      file.contents = template(file);
      helpers.renameExtension(files, fileName, 'html');
    }
  }
}
