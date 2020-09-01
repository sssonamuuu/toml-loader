const fs = require('fs');
const os = require('os');

const toml = require('toml');

function getConfigTypings (config, indent = 1, paths = '') {
  if (['number', 'boolean', 'string', 'undefined'].includes(typeof config)) {
    return typeof config;
  }
  if (Array.isArray(config)) {
    return config.length ? `Array<${[...new Set(config.map((item, index) => getConfigTypings(item, indent, `${paths}[${index}]`)))].join(' | ')}>` : 'Array<string>';
  }
  return `{${Object.entries(config).reduce((p, [key, value]) => `${p}${os.EOL}${'  '.repeat(indent)}${key.includes('-') ? `'${key}'` : key}: ${getConfigTypings(value, indent + 1, `${paths}${paths && '.'}${key}`)};`, '')}${os.EOL}${'  '.repeat(indent - 1)}}`;
}

module.exports = function (source) {
  this.cacheable && this.cacheable();
  const config = toml.parse(source);
  const callback = this.async();
  fs.writeFile(`${this.resourcePath}.d.ts`, `interface TomlExport ${getConfigTypings(config)}
export const tomlExport: TomlExport;
export default tomlExport;`, err => {
    callback(err, `export default ${JSON.stringify(config)}`);
  });
};
