const Conf = require('conf');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
function setup(){
let settings = new Conf( {projectName: 'stedsbookings'} );
const cfg = settings.path;
console.log('config file', cfg)
const env = cfg.replace('config.json', '.env');

if (!fs.existsSync(env)){
  const {filterValidFields} = require('./filterValidFields');
  console.log('setting File', cfg);
  const json = JSON.parse(fs.readFileSync(cfg, 'utf8'));
  console.log('json', json);
  const fo = flattenObj(json, 'STEDS');
  const data = filterValidFields(fo);
  console.log('data', fo, data);
  console.log('output', outputEnv(data, env));
}
const input = dotenv.config({ path: env });}

function outputEnv(data, env) {
  const outData = data
    .map(([tag, val]) => {
      // if (typeof val === 'string') val = `"${val}"`;
      return `${tag}=${val}`;
    })
    .join('\n');
  console.log('output', env, '\n', outData);
  return fs.writeFileSync(env, outData);
}

function flattenObj(obj, base) {
  const fo = [];
  Object.entries(obj).forEach(([key, val]) => {
    const baseN = base + '_' + key;
    let arr = [];
    if (typeof val === 'object') arr = flattenObj(val, baseN);
    else arr = [
      [baseN, val]
    ];
    fo.push(...arr);
  });
  return fo;
}
setup();
exports.setup = setup;
