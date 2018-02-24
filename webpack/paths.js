const fs = require('fs');
const path = require('path');

const cwd = fs.realpathSync(process.cwd());
const resolve = relativePath => path.resolve(cwd, relativePath);

module.exports = {
  entryJs: resolve('src/index.js'),
  htmlTemplate: resolve('public/index.html'),
  scssResources: resolve('src/styles/resources.scss'),
  publicFiles: resolve('public'),
  build: resolve('build'),
  serviceWorker: resolve('src/sw.js'),
};
