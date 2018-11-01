module.exports = {
    input: 'test.html', // file source path
    output: 'test.txt', // output path
    print: true,

    rules: [
        {tag: 'img', attr: {name: 'alt'}},
        {tag: 'a', attr: {name: 'rel'}},
        {tag: 'video'},
        {tag: 'h2', limit: {type: 'upper', count: 2}},
        {tag: 'meta', attr: {name: 'property', value: 'og:url'}},
        {tag: 'meta', attr: {name: 'name', value: 'robots'}}
    ]
};