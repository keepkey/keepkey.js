const json = require('fs').readFileSync(__dirname + '/../proto.json', { encoding: 'utf8'})

module.exports = JSON.parse(json)
// .default gets added by the addDefaultTransform function
