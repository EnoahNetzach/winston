/*
 * file-archive-test.js: Tests for instances of the File transport setting the archive option,
 *
 * (C) 2015 Nimrod Becker
 * MIT LICENSE
 *
 */

var assert = require('assert'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    vows = require('vows'),
    wilkins = require('../../lib/wilkins'),
    helpers = require('../helpers'),
    File = require('../../lib/transports/file').File;

var archiveTransport = new File({
  timestamp: true,
  json: false,
  zippedArchive: true,
  tailable: true,
  filename: 'testarchive.log',
  dirname: path.join(__dirname, '..', 'fixtures', 'logs'),
  maxsize: 4096,
  maxFiles: 3
});

function data(ch) {
  return new Array(1018).join(String.fromCharCode(65 + ch));
}

function logKbytes(kbytes, txt) {
  //
  // With no timestamp and at the info level,
  // wilkins adds exactly 7 characters:
  // [info](4)[ :](2)[\n](1)
  //
  for (var i = 0; i < kbytes; i++) {
    archiveTransport.log('info', data(txt), null, function() {});
  }
}

vows.describe('wilkins/transports/file/zippedArchive').addBatch({
  "An instance of the File Transport with tailable true": {
    "when created archived files are rolled": {
      topic: function() {
        var that = this,
          created = 0;

        archiveTransport.on('logged', function() {
          if (++created === 6) {
            return that.callback();
          }

          logKbytes(4, created);
        });

        logKbytes(4, created);
      },
      "should be only 3 files called testarchive.log, testarchive1.log.gz and testarchive2.log.gz": function() {
        //Give the archive a little time to settle
      //  setTimeout(function() {
          for (var num = 0; num < 6; num++) {
            var file = !num ? 'testarchive.log' : 'testarchive' + num + '.log.gz',
              fullpath = path.join(__dirname, '..', 'fixtures', 'logs', file);

            // There should be no files with that name
            if (num >= 3) {
              assert.throws(function() {
                fs.statSync(fullpath);
              }, Error);
            } else {
              // The other files should exist
              assert.doesNotThrow(function() {
                fs.statSync(fullpath);
              }, Error);
            }
          }
        //},5000);
      },
    }
  },
}).export(module);
