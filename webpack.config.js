'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js', //название файла в dist
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map", //для того, чтоб код был читабельным

  module: {}
};
