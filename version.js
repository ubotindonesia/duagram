let package = require('./package.json')

module.exports = {
    name: package.name,
    number: package.version,
    desc: package.description,
    repo: package.repository,
    url: 'https://t.me/duagram',
    support: '@ubotindonesia',

    release: {
        first: 'July 2021',
        last: 'August 2021',
    },

    system: `${process.platform} ${process.arch} nodejs ${process.version}`
}