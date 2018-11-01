const Transform = require('stream').Transform;
const cheerio = require('cheerio');

class HtmlTransformer extends Transform {
    constructor(rules, print) {
        super();
        this.content = '';
        this.buffer = '';
        this.msg = '';
        this.rules = rules;
        this.print = print;
    }

    _transform(chunk, e, done) {
        this.buffer += chunk;
        done();
    };

    _flush(done) {
        this.content = cheerio.load(this.buffer);
        this.start();

        if (this.print)
            console.log(this.msg);

        done(null, this.msg);
    };

    start() {
        this.rules.forEach((rule) => {
            if (!rule.tag) return;

            if (!rule.attr && !rule.limit) {
                this.searchExist(rule);
            } else if (rule.attr && rule.attr.name && !rule.attr.value) {
                this.searchAttr(rule);
            } else if (rule.attr && rule.attr.name && rule.attr.value) {
                this.searchAttrValue(rule);
            } else if (rule.limit && rule.limit.type && rule.limit.count) {
                this.searchLimit(rule);
            }
        });
    };

    searchAttrValue(rule) {
        const tag = rule.tag, attr = rule.attr.name, value = rule.attr.value;
        if (this.content(`${tag}[${attr}="${value}"]`).length == 0) {
            this.msg += `This HTML without <${tag} ${attr}="${value}" ...> tag\n`;
        }
    };

    searchExist(rule) {
        const tag = rule.tag;
        if (this.content(tag).length == 0) {
            this.msg += `This HTML without <${tag}> tag\n`;
        }
    };

    searchAttr(rule) {
        const tag = rule.tag, attr = rule.attr.name;
        let count = 0;
        this.content(tag).each((i, e) => {
            if (!e.attribs[attr])
                count++;
        });

        this.msg += `There are ${count} <${tag}> tag without ${attr} attribute\n`;
    };

    searchLimit(rule) {
        const tag = rule.tag, isUpper = rule.limit.type == 'upper' ? true : false, count = rule.limit.count;
        if (isUpper && this.content(tag).length > count) {
            this.msg += `This HTML more than ${count} <${tag}> tag\n`;
        } else if (!isUpper && this.content(tag).length < count) {
            this.msg += `This HTML less than ${count} <${tag}> tag\n`;
        }
    }
};

module.exports = {
    htmlTransformer: HtmlTransformer
};
