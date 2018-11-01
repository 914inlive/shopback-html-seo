const fs = require('fs');
const {htmlTransformer} = require('./htmlTransformer');
const config = require('../config.js');

module.exports = (options = config) => {
    //check the input exist
    try {
        fs.statSync(options.input);
    } catch (err) {
        return console.error(err.message);
    }

    // check the rules format
    let rules = (options.hasOwnProperty('rules'))? options.rules: [];
    if (!Array.isArray(rules))
        return console.error('rules format error, it must be an array.');

    // process from input file
    let print = (options.hasOwnProperty('print'))? options.print: false;
    const rs = fs.createReadStream(options.input)
                .pipe(new htmlTransformer(rules, print));

    if (options.output)
        rs.pipe(fs.createWriteStream(options.output));
};
