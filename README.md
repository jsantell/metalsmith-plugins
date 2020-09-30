# @jsantell/metalsmith-plugins

A collection of personal metalsmith plugins.

TODO Document API of plugins. An example of a `metalsmith.json` configuration:

```json
{
  "source": "./content",
  "destination": "./public",
  "plugins": {
    "@jsantell/metalsmith-plugins/remove.js": {
      "match": ["**/*.yaml", "**/*.json", "_**/*", "**/_*", ".**/*", "**/.*"]
    },
    "@jsantell/metalsmith-plugins/meta.js": {
      "draft": false,
      "description": "AHHHHH!!!!"
    },
    "@jsantell/metalsmith-plugins/csp.js": {
      "default-src": "'none'",
      "script-src": "'self' https://stats.example.com",
      "frame-src": "'self' https://example.dev https://media.example.com",
      "font-src": "'self'",
      "img-src": "'self' https://stats.example.com",
      "style-src": "'self' 'unsafe-inline'",
      "media-src": "'self' https://media.example.com",
      "form-action": "'self' https://tinyletter.com"
    },
    "@jsantell/metalsmith-plugins/import-data.js": {
      "key": "data",
      "match": "**/*.hbs"
    },
    "@jsantell/metalsmith-plugins/permalink.js": {
      "host": "https://example.com",
      "match": ["**/*.hbs", "**/*.md"]
    },
    "@jsantell/metalsmith-plugins/date.js": {
      "match": ["**/*.hbs", "**/*.md"],
      "dates": {
        "date_formatted": { "key": "date", "format": "MMMM DD, YYYY" }, 
        "date_datetime": { "key": "date", "format": "YYYY-MM-DD" },
        "date_short": { "key": "date", "format": "MMM YYYY" }
      }
    },
    "@jsantell/metalsmith-plugins/templating.js": {
      "match": ["**/*.hbs"]
    },
    "@jsantell/metalsmith-plugins/markdown.js": {},
    "@jsantell/metalsmith-plugins/layout.js": {
      "match": ["**/*.html"],
      "key": "layout",
      "templates": "./layouts",
      "partials": "./layouts/partials"
    }
  }
}
```
