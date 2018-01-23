var postcss = require('postcss');

// https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md
module.exports = postcss.plugin('moduleBlockFix', function moduleBlockFix(options) {
	return function (css) { }
});