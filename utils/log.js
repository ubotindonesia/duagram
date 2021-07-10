const fs = require('fs');

let fileLog = {
    folderMake(path) {
        fs.stat(path, function (err) {
            if (err) {
                fs.mkdir('.data', (err) => {
                    if (err) throw err;
                });
            }
        });
    },
    saveSession(file, data) {
        fs.writeFile(file, data, (err) => {
            if (err) throw err;
            terminal.log('The session file has been saved.');
        })
    }

}

let terminal = {}
require('better-logging')(terminal, {
    logLevels: {
        debug: 3, error: 3, info: 1,
        line: 1, log: 0, warn: 1,
    },
    format: ctx =>`${ctx.time24}${ctx.type} ${ctx.msg}`
    /* format: ctx => {
        let regType = /(error|log|info|warn|debug)/i;
        let match = regType.exec(ctx.type);
        let t = ctx.type
            .replace(regType, match[1].padEnd(5, ' '));
        return `${ctx.time24}${t} ${ctx.msg}`
    } */
});

function lessLog(object) {
    var toPrint = {};
    for (var key in object) {
        // console.log("key is", key);
        // console.log("key starts with _?", key.startsWith("_"));
        if (object.hasOwnProperty(key)) {
            if (!key.startsWith("_")) {
                toPrint[key] = object[key];
            }
        }
    }
    console.log(toPrint);
}

module.exports = {
    terminal,
    fileLog,
    lessLog
};