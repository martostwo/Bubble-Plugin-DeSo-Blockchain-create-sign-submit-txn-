function(properties, context) {

const { convert } = require('html-to-text');
let html = properties.HTML;

const text = convert(html, {
    wordwrap:0,
  selectors: [ 
    { selector: 'a', options: { ignoreHref: true, uppercase: false } },
    { selector: 'article', options: { ignoreHref: true, uppercase: false } },
    { selector: 'aside', options: { ignoreHref: true, uppercase: false } },
    { selector: 'blockquote', options: { ignoreHref: true, uppercase: false } },
    { selector: 'br', options: { ignoreHref: true, uppercase: false } },
    { selector: 'div', options: { ignoreHref: true, uppercase: false } },
    { selector: 'footer', options: { ignoreHref: true, uppercase: false } },
    { selector: 'form', options: { ignoreHref: true, uppercase: false } },
    { selector: 'h1', options: { ignoreHref: true, uppercase: false } },
    { selector: 'h2', options: { ignoreHref: true, uppercase: false } },
    { selector: 'h3', options: { ignoreHref: true, uppercase: false } },
    { selector: 'h4', options: { ignoreHref: true, uppercase: false } },
    { selector: 'h5', options: { ignoreHref: true, uppercase: false } },
    { selector: 'h6', options: { ignoreHref: true, uppercase: false } },
    { selector: 'header', options: { ignoreHref: true, uppercase: false } },
  ]
});

return {text: text};


}