/*
 * unhandle-exceptions.js: A test fixture for using `.unhandleExceptions()` wilkins.
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENCE
 *
 */
 
var path = require('path'),
    wilkins = require('../../../lib/wilkins'),
    File = require('../../../lib/transports/file').File;

var logger = new (wilkins.Logger)({
  transports: [
    new File({
      filename: path.join(__dirname, '..', 'logs', 'unhandle-exception.log'),
      handleExceptions: true
    })
  ]
});

logger.handleExceptions();
logger.unhandleExceptions();

setTimeout(function () {
  throw new Error('OH NOES! It failed!');
}, 1000);
