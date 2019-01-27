const Conf = require('conf');
const envPaths = require('env-paths')
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
function setup(){
  const env = envPaths('stedsbookings').config+'/.env';
  console.log('env file', env)
  
  if (!fs.existsSync(env)){
    let settings = new Conf( {projectName: 'stedsbookings'} );
    const cfg = settings.path;
    console.log('config file', cfg)
    const {filterValidFields} = require('./filterValidFields');
    console.log('setting File', cfg);
    const json = JSON.parse(fs.readFileSync(cfg, 'utf8'));
    console.log('json', json);
    const fo = flattenObj(json, 'STEDS');
    fo.push(['STEDS_db_name_remote', 'http://nicholware.com:5984/bookings']);
    fo.push(['STEDS_db_name_local', 'http://localhost:5984/bookings']);
    fo.push(['STEDS_db_useFullHistory', true]);
    fo.push(['STEDS_db_resetLocalBookings', false]);
    fo.push(['STEDS_useFullHistory', true]);
    fo.push(['STEDS_envfile', env]);
    const data = filterValidFields(fo);
  }
  const input = dotenv.config({ path: env });
  process.env.STEDS_envfile = env;
}


function outputEnv(data, env) {
  const outData = data
    .map(([tag, val]) => {
      // if (typeof val === 'string') val = `"${val}"`;
      return `${tag}=${val}`;
    })
    .join('\n');
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
// setup();
exports.setup = setup;
