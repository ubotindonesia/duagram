
let package = require('./package.json')

module.exports = {
    name: package.name,
    number: package.version,
    desc: package.description,
    repo: package.repository,
    url: 'https://t.me/duagram',
    support: '@botindonesia',

    release: {
        first: 'July 2021',
        last: 'July 2021',
    },
    
    dev: {
        coder: package.author,
        email: 'banghasan@gmail.com',
        telegram: '@hasanudinhs',
        web: 'https://www.banghasan.com'
    },

    contributor : {
        //
    },

    system: `${process.platform} ${process.arch} nodejs ${process.version}`
}