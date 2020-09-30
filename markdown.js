const path = require('path');
const markdown = require('markdown-it')({
  html: true,
});
const markdownMath = require('@rokt33r/markdown-it-math');
const markdownAnchor = require('markdown-it-anchor');
const katex = require('katex');
const helpers = require('./helpers.js');

markdown.use(markdownMath, {
  inlineOpen: '$',
  inlineClose: '$',
  blockOpen: '$$',
  blockClose: '$$',
  inlineRenderer: function (str) {
    let output = ''
    try {
      output = katex.renderToString(str.trim())
    } catch (err) {
      output = `<span class="katex-error">${err.message}</span>`
    }
    return output
  },
  blockRenderer: function (str) {
    let output = ''
    try {
      output = katex.renderToString(str.trim(), { displayMode: true })
    } catch (err) {
      output = `<div class="katex-error">${err.message}</div>`
    }
    return output
  }
});

markdown.use(markdownAnchor, {
  permalink: true,
  permalinkSymbol: '',
  permalinkBefore: true,
  permalinkAttrs: slug => ({
    'aria-label': `${slug} anchor`,
  }),
});

module.exports = function transform(config) {
  config = Object.assign({}, {
    match: '**/*.md',
  }, config);

  return function (files, smith) {
    const matched = helpers.match(Object.keys(files), config.match);
    for (let fileName of matched) {
      const file = files[fileName];

      file.contents = markdown.render(file.contents.toString());
      helpers.renameExtension(files, fileName, 'html');
    }
  }
}
