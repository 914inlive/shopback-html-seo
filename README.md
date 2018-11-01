## Install
```
npm install shopback-html-seo
```

## Demo
```
npm install
npm test
```

## Usage

```javascript
const shopbackHtmlSEO = require('shopback-html-seo')
shopbackHtmlSEO(options)
```

## Stream
```javascript
const {htmlTransformer} = require('./htmlTransformer');
const rs = fs.createReadStream(options.input)
            .pipe(new htmlTransformer(rules, print));
```

## Configure

Config file is in ./config.js, It defines HTML file source, output file name, and search rules.

```javascript
{
    input: 'test.html', // file source path
    output: 'test.txt', // result output path
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
```
