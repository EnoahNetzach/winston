var wilkins = require('../lib/wilkins');

var myCustomLevels = {
    levels: {
        foo: 0,
        bar: 1,
        baz: 2,
        foobar: 3
    },
    colors: {
        foo: 'blue',
        bar: 'green',
        baz: 'yellow',
        foobar: 'red'
    }
};

var customLevelLogger = new (wilkins.Logger)({ levels: myCustomLevels.levels });
customLevelLogger.foobar('some foobar level-ed message');
customLevelLogger.foobar('some foobar level-ed message');
customLevelLogger.foobar('some foobar level-ed message');
