/*
 * log-exceptions.js: A test fixture for logging exceptions in wilkins.
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENCE
 *
 */
 
var path = require('path'),
    wilkins = require('../../../lib/wilkins');

var logger = new (wilkins.Logger)({
  transports: [
    new (wilkins.transports.File)({
      filename: path.join(__dirname, '..', 'logs', 'exception.log'),
      handleExceptions: true
    })
  ]
});

logger.handleExceptions();

setTimeout(function () {
  throw new Error('OH NOES! It failed!');
}, 1000);
